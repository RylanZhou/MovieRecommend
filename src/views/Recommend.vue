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
      <h1 v-if="loadCompleted" class="title">
        已生成电影推荐
        <i
          v-if="$route.query.fromRegister === false"
          class="fa fa-question-circle question"
          @click="handleQuestionClick"></i>
      </h1>
    </transition>
    <transition
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutDown">
      <div class="graph-container" v-if="showGraph">
        <i class="fa fa-close" @click="handleCloseClick"></i>
        <ve-bar
          :title="{text: '各类别推荐比例对比', textStyle: {fontSize: 24}}"
          :data="recommendData"
          height="800px"
          :xAxis="{axisLabel: {interval: 0}}"></ve-bar>
        <h1>本次推荐性能指标：<span class="performance">{{ performance }}</span></h1>
      </div>
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
            <img width="182px" height="268px" :src='moviesList[index].image'>
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
              <span class="rate">
                {{ moviesList[index].rate }}
              </span>
              <div class="rating-container">
                我的评分：<input type="text" v-model="myScore">
                <button
                  @click="submitRating(moviesList[index].id)" v-loading="pageLoading">
                  提交评分
                </button>
              </div>
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
        <div class="history-list">
          <transition-group
            tag="ul"
            v-infinite-scroll="getMoreHistory"
            :infinite-scroll-disabled="disabled"
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
            @enter="listEnter">
            <template v-if="showHistoryList">
              <li
                v-for="(history, index) in historyList"
                :key="-history.id"
                :data-index="index">
                <h1 class="title">
                {{ history.title }}
                </h1>
                <span class="genre">
                  <i class="fa fa-hashtag"></i>
                  <span
                    v-for="genre in history.genre"
                    :key="genre">
                    {{ getChineseName(genre) }}
                  </span>
                </span>
                <span class="rate">
                  {{ history.rate }}
                </span>
              </li>
            </template>
          </transition-group>
          <p v-if="historyLoading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import config from './common';
import API from '../api';

export default {
  name: 'Recommend',
  data() {
    return {
      loadCompleted: false,
      showMovies: false,
      showMask: false,
      showHistory: false,
      showHistoryList: false,
      showGraph: false,
      historyLoading: false,
      noMore: false,
      pageLoading: false,
      skip: 0,
      myScore: null,
      genreMap: config.genreMap,
      genreMapJson: config.genreMapJson,
      moviesConfigList: config.moviesConfigList,
      mock_moviesList: [
        {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        }, {
          image: require('@/assets/The Terminator.jpg'),
          title: 'The Terminator',
          genre: ['Action', 'Sci-Fi'],
          description: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs.',
        },
      ],
      mock_historyList: [
        {
          id: 0,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '5',
        },
        {
          id: 1,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '3',
        },
        {
          id: 2,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '5',
        },
        {
          id: 3,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '4',
        },
        {
          id: 4,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '2',
        },
        {
          id: 5,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '3',
        },
        {
          id: 6,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '5',
        },
        {
          id: 7,
          title: 'quis fugiat sunt',
          genre: ['Action', 'Animation', 'Adventure'],
          rate: '5',
        },
      ],
      mock_recommendData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          {
            日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32,
          },
          {
            日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26,
          },
          {
            日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76,
          },
          {
            日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49,
          },
          {
            日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323,
          },
          {
            日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78,
          },
        ],
      },
      moviesList: [],
      performance: 0,
      historyList: [],
      recommendData: {
        columns: ['类别', '历史评价类别比例', '推荐类别比例'],
        rows: [],
      },
    };
  },
  computed: {
    getChineseName() {
      return genre => this.genreMap[genre];
    },
    disabled() {
      return this.historyLoading || this.noMore;
    },
  },
  async created() {
    await this.getRecommend();
    await this.getHistory();
    if (!this.$route.query.fromRegister) {
      await this.getAnalysis();
    }
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.loadCompleted = true;
  //   }, 2000);
  // },
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
      this.showGraph = false;
      this.showMask = false;
    },
    handleQuestionClick() {
      this.showGraph = true;
      this.showMask = true;
    },
    convertToDecimal(number) {
      const decimal = [0, 5];
      return `${number}.${decimal[Math.floor(2 * Math.random())]}`;
    },
    async getRecommend() {
      try {
        let data;
        if (this.$route.query.fromRegister || this.$route.query.fromRegister === 'true') {
          data = await API.submitSelection(this.$route.params.selected);
        } else {
          data = await API.getRecommend(this.$route.query.userId);
        }
        this.moviesList = data.data.result.map(item => ({
          id: item.MovieID[0],
          title: item.Title[1],
          description: item.Detail[0],
          genre: item.Classification,
          // eslint-disable-next-line import/no-dynamic-require
          image: require(`@/assets/posters/${item.Title[0].replace(': ', '-')}.jpg`),
          rate: parseFloat(item.Rating).toFixed(1),
        }));
        this.performance = data.data.predict_norm.toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
    async submitRating(id) {
      try {
        this.pageLoading = true;
        await API.submitRating({
          user_id: this.$route.query.userId,
          movie_id: id,
          rating: this.myScore,
        });
        this.$router.push({
          name: 'Success',
          query: this.$route.query,
          params: this.$route.params,
        });
      } catch (error) {
        console.log(error);
      }
      this.pageLoading = false;
    },
    async getHistory() {
      try {
        const params = {
          user_id: this.$route.query.userId,
          skip: this.skip,
          limit: 10,
        };
        const { data } = await API.getHistory(params);
        data.result.forEach((history, index) => {
          this.historyList.push({
            id: index,
            title: history.Title[1],
            genre: history.Classification,
            rate: history.Rating,
          });
        });
        this.loadCompleted = true;
        this.skip += 1;
      } catch (error) {
        console.log(error);
      }
    },
    async getMoreHistory() {
      try {
        this.historyLoading = true;
        const params = {
          user_id: this.$route.query.userId,
          skip: this.skip,
          limit: 10,
        };
        const { data } = await API.getHistory(params);
        if (data.result.length === 0) {
          this.noMore = true;
          this.historyLoading = false;
          return;
        }
        data.result.forEach((history, index) => {
          this.historyList.push({
            id: index + 10 * this.skip,
            title: history.Title[1],
            genre: history.Classification,
            rate: this.convertToDecimal(history.Rating),
          });
        });
        this.skip += 1;
        this.historyLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getAnalysis() {
      try {
        const { data } = await API.getAnalysis(this.$route.query.userId);
        let historySum = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const item of data.target) {
          historySum += parseInt(item, 10);
        }
        data.target.forEach((item, index) => {
          this.recommendData.rows.push({
            类别: this.genreMapJson[index].label,
            历史评价类别比例: parseInt(item, 10) / historySum,
            推荐类别比例: data.virtual[index] / 10,
          });
        });
        console.log(this.recommendData);
      } catch (error) {
        console.log(error);
      }
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
      }, 400);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  height: 100vh;
  text-align: center;

  .graph-container {
    position: absolute;
    z-index: 11;
    width: calc(100vw - 100px);
    height: 700px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 30px;
    border-radius: 8px;
    overflow: auto;
    background-color: white;

    i {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 30px;
      transition: all .5s;
      color: salmon;

      &:hover {
        cursor: pointer;
        transform: rotate(180deg);
      }
    }

    h1 {
      font-size: 24px;

      .performance {
        font-size: 30px;
        color: salmon;
      }
    }
  }

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
    i {
      margin-left: 20px;
      font-size: 20px;
      color: #2f51eb;

      &:hover {
        cursor: pointer;
      }
    }
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

        .rate {
          opacity: 1;
        }
      }

      .movie-container {
        display: flex;
        width: 500px;
        height: 268px;
        background-color: rgb(54, 54, 54);

        .content {
          position: relative;
          text-align: left;
          width: calc(100% - 182px);
          padding: 20px 8px 0 8px;
          overflow: auto;
          color: #fff;

          .title {
            margin: 0 100px 0 0;
          }

          .rate {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 30px;
            font-style: italic;
            color: rgb(241, 174, 50);
          }

          .rating-container {
            display: flex;
            flex-direction: column;
            justify-content: center;

            input {
              padding: 2px 10px;
              margin: 0 auto;
              width: 50px;
              border-width: 0;
              outline: none;
              border-bottom: 3px solid #ff4b2b;
              font-size: 20px;
              text-align: center;
              color: white;
              background: none;
            }

            button {
              padding: 12px 45px;
              margin-top: 20px;
              letter-spacing: 1px;
              border: 1px solid #ff4b2b;
              border-radius: 20px;
              font-size: 16px;
              font-weight: bold;
              text-transform: uppercase;
              color: #fff;
              background-color: #ff4b2b;

              &:active {
                transform: scale(0.95);
              }

              &:focus {
                outline: none;
              }

              &:hover {
                cursor: pointer;
              }
            }
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
          color: rgb(250, 202, 114);
        }
      }
    }

    .history-list {
      height: calc(100% - 200px);
      overflow: auto;

      ul {
        width: 100%;
        margin: 0;
        padding: 0 20px 0px 20px;
        list-style: none;

        li {
          position: relative;
          padding: 30px 0;
          border-bottom: 1px solid #ccc;
          text-align: left;

          .title {
            margin: 0 50px 10px 0;
            font-size: 20px;
          }

          .genre {
            margin-left: 20px;
          }

          .rate {
            position: absolute;
            top: 30px;
            right: 10px;
            font-size: 40px;
            color: rgb(241, 174, 50);
          }
        }
      }

      p {
        margin-top: 20px;
        margin-bottom: 50px;
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
