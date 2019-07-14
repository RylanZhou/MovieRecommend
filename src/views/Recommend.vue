<template>
  <div class="app-container">
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster">
      <div class="page-mask" v-if="showMask"></div>
    </transition>
    <transition leave-active-class="animated fadeOut faster">
      <div v-if="!loadCompleted" class="loading-container">
        <h1>正在生成推荐...</h1>
        <div class="loading"></div>
      </div>
    </transition>
    <transition name="fly-in">
      <h1 v-if="loadCompleted" class="title">已生成电影推荐</h1>
    </transition>
    <transition
      enter-active-class="animated fadeIn delay-2s">
      <img
        v-if="loadCompleted"
        class="avatar"
        src="../assets/man.png"
        @click="handleAvatarClick">
    </transition>
    <transition-group
      class="all-container"
      tag="div"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      @enter="enter">
      <template v-if="showMovies">
        <div
          class="movie-container-mask"
          v-for="(movie, index) in moviesConfigList"
          :key="movie.id"
          :style="movie"
          :data-index="index">
          <div
            class="movie-container"
            @mouseenter="handleMouseOver(true)"
            @mouseleave="handleMouseOver(false)">
            <img width="182px" height="268px" src="../assets/The Terminator.jpg">
            <div class="content">
              <h1 class="title">
                {{ moviesList[index].title }}
              </h1>
              <span
                class="genre"
                v-for="genre in moviesList[index].genre"
                :key="genre">
                {{ getChineseName(genre) }}
              </span>
              <p class="description">
                {{ moviesList[index].description }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="halo"
          v-for="movie in moviesConfigList"
          :key="movie.id + 100"
          :style="movie">
        </div>
      </template>
    </transition-group>

    <!-- History -->
    <transition name="move-up">
      <img v-if="showHistory" id="avatar-move" src="../assets/man.png">
    </transition>
    <transition name="open">
      <div v-if="showHistory" class="history-container">
        <div class="title-container">
          <i class="fa fa-close close-button" @click="handleCloseClick"></i>
          <h1 class="title">历史记录</h1>
        </div>
        <transition-group
          tag="ul"
          class="history-list"
          v-infinite-scroll="getHistory"
          infinite-scroll-disabled="disabled"
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutRight"
          @enter="listEnter">
          <template v-if="showHistoryList">
            <li
              v-for="(history, index) in historyList"
              :key="-history.id"
              :data-index="index">
              {{ history.content }}
            </li>
            <p v-if="historyLoading">加载中...</p>
          </template>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import config from './common';
import API from '../api';

export default {
  data() {
    return {
      loadCompleted: false,
      showMovies: false,
      showMask: false,
      showHistory: false,
      showHistoryList: false,
      historyLoading: false,
      skip: 0,
      genreMap: config.genreMap,
      moviesConfigList: config.moviesConfigList,
      moviesList: [
        {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: '../assets/The Terminator.jpg',
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        },
      ],
      historyList: [
        {
          id: 0,
          content: 'Reprehenderit odit explicabo laborum est deleniti.',
        }, {
          id: 1,
          content: 'Expedita neque et possimus.',
        }, {
          id: 2,
          content: 'Earum excepturi sapiente nihil sunt qui veritatis ipsa iusto.',
        }, {
          id: 3,
          content: 'Sed deserunt ea sunt autem rerum ut impedit.',
        }, {
          id: 4,
          content: 'Corporis dolorum consectetur nam occaecati itaque assumenda.',
        }, {
          id: 5,
          content: 'Rem itaque reiciendis consequatur.',
        }, {
          id: 6,
          content: 'Qui sed earum.',
        },
      ],
    };
  },
  computed: {
    getChineseName() {
      return genre => this.genreMap[genre];
    },
  },
  async created() {
    // await this.getRecommend();
    // await this.getHistory();
  },
  mounted() {
    setTimeout(() => {
      this.loadCompleted = true;
    }, 2000);
  },
  methods: {
    enter(el) {
      const delay = `${el.dataset.index * 100}ms`;
      // eslint-disable-next-line no-param-reassign
      el.style.animationDelay = delay;
    },
    listEnter(el) {
      const delay = `${el.dataset.index * 100}ms`;
      // eslint-disable-next-line no-param-reassign
      el.style.animationDelay = delay;
    },
    handleMouseOver(show) {
      this.showMask = show;
    },
    handleAvatarClick() {
      this.showHistory = true;
      this.showMask = true;
    },
    handleCloseClick() {
      this.showHistory = false;
      this.showMask = false;
    },
    async getRecommend() {
      try {
        const { data } = await API.getRecommend(1);
        console.log(data);
      } catch (error) {
        this.$message.error('获取异常');
      }
    },
    async getHistory() {
      try {
        this.historyLoading = true;
        const params = {
          user_id: 1,
          skip: this.skip,
          limit: 10,
        };
        const { data } = await API.getHistory(params);
        console.log(data);
        this.loadCompleted = true;
        this.skip += 1;
      } catch (error) {
        this.$message.error('网络异常');
      }
      this.historyLoading = false;
    },
  },
  watch: {
    loadCompleted() {
      setTimeout(() => {
        this.showMovies = true;
      }, 3000);
    },
    showHistory() {
      setTimeout(() => {
        this.showHistoryList = this.showHistory;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  height: 100vh;
  text-align: center;

  .page-mask {
    position: absolute;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    top: -40px;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .loading-container {
    margin-top: 300px;

    .loading {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 0 auto;
      box-sizing: border-box;
      border-radius: 50%;
      border-top: 10px solid #ff6b6b;
      animation: loading 2s linear infinite;

      &::before, &::after {
        content: "";
        position: absolute;
        left: 0;
        top: -10px;
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        border-radius: 50%;
      }

      &::before {
        border-top: 10px solid #feca57;
        transform: rotate(120deg);
      }

      &::after {
        border-top: 10px solid #48dbfb;
        transform: rotate(240deg);
      }
    }
  }

  .title {
    margin-top: 40px;
  }

  .avatar {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    width: 200px;
    border-radius: 50%;
    box-shadow: 0 5px 15px -5px #00000070;
    transition: all .2s;

    &:hover {
      cursor: pointer;
      width: 230px;
    }
  }

  .all-container {
    position: relative;
    margin: 0 100px;
    height: calc(100vh - 120px);

    .movie-container-mask {
      position: absolute;
      z-index: 3;
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
      box-shadow: 0 5px 15px -5px #00000070;
      transition-property: width, height, border-radius;
      transition-duration: .3s;


      &:hover {
        z-index: 10;
        border-radius: 8px;
        width: 500px;
        height: 268px;
      }

      .movie-container {
        display: flex;
        width: 500px;
        height: 268px;
        background-color: rgb(54, 54, 54);

        .content {
          text-align: left;
          width: calc(100% - 182px);
          padding: 20px 8px 0 8px;
          color: #fff;

          .title {
            margin: 0;
          }
        }
      }
    }

    .halo {
      position: absolute;
      z-index: 2;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      opacity: 0;
      background-color: rgba(200, 200, 200, 0.8);
      animation: expand 1s infinite;
      animation-delay: 1s;
    }
  }

  #avatar-move {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -320%);
    width: 100px;
    opacity: 1;
    border-radius: 50%;
  }

  .history-container {
    position: absolute;
    z-index: 9;
    top: 20px;
    left: 50%;
    width: 30%;
    height: 700px;
    transform: translateX(-50%);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px -5px #00000070;
    background-color: #fff;

    .title-container {
      position: relative;
      padding-top: 40px;
      height: 220px;
      box-shadow: 0 5px 15px -5px #00000070;

      .title {
        margin-top: 0;
      }

      .close-button {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 30px;
        transition: all .5s;

        &:hover {
          cursor: pointer;
          transform: rotate(180deg);
          color: salmon;
        }
      }
    }

    .history-list {
      width: 100%;
      height: calc(100% - 200px);
      margin: 0;
      padding: 0px 20px 20px 20px;
      overflow: auto;
      list-style: none;

      li {
        padding: 30px 0;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}

@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}

.fly-in-enter-active, .fly-in-leave-active {
  animation: fly-in 2.5s ease;
}

.fly-in-enter-to, .fly-in-leave {
  margin-top: 40px;
  opacity: 1;
}

.fly-in-enter, .fly-in-leave-to {
  margin-top: 350px;
  opacity: 0;
}

@keyframes expand {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(1.7);
    opacity: 0;
  }
}

@keyframes fly-in {
  0% {
    margin-top: 350px;
    transform: translateX(-50%);
    opacity: 0;
  }
  40% {
    margin-top: 350px;
    transform: translate(0);
    opacity: 1;
  }
  60% {
    margin-top: 350px;
    transform: translate(0);
  }
  100% {
    margin-top: 40px;
    transform: translate(0);
    opacity: 1;
  }
}

.move-up-enter-active {
  animation: move-up .5s;
}

.move-up-leave-active {
  animation: move-up .5s reverse;
}

.move-up-enter-to, .move-up-leave {
  opacity: 1;
  transform: translate(-50%, -320%);
}

.move-up-enter, .move-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -70%);
}

@keyframes move-up {
  0% {
    opacity: 0;
    transform: translate(-50%, -70%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -320%);
  }
}

.open-enter-active {
  animation: open .5s ease;
}

.open-leave-active {
  animation: open .5s ease reverse;
}

.open-enter-to, .open-leave {
  height: 700px;
}

.open-enter, .open-leave-to {
  height: 0;
}

@keyframes open {
  from {
    height: 0;
  }
  to {
    height: 700px;
  }
}
</style>
