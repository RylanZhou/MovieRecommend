<template>
  <div class="choose-container" v-loading="pageLoading">
    <h1 class="title">请选择感兴趣的电影类别</h1>
    <transition-group
      tag="div"
      class="genre-list"
      enter-active-class="animated bounceIn"
      leave-active-class="animated bounceOut"
      @enter="enter">
      <template v-if="showGenre">
        <div
          v-for="(genre, index) in genreConfigList"
          :key="genre.id"
          :class="selectList[index] ? 'selected' : 'normal'"
          :style="genre"
          @click="selectGenre(index)"
          :data-index="index">
          {{ genreMap[index].label }}
        </div>
      </template>
    </transition-group>
    <transition name="button-up">
      <button id="submit" v-if="selectProps.length" @click="submit">提 交</button>
    </transition>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import config from './common';
import API from '../api';

export default {
  data() {
    return {
      genreMap: config.genreMapJson,
      genreConfigList: config.genreConfigList,
      colors: config.colors,
      selectList: [],
      selectProps: [],
      showGenre: false,
      pageLoading: false,
    };
  },
  created() {
    this.genreConfigList.forEach((configItem) => {
      configItem.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    });
    for (let i = 0; i < this.genreConfigList.length; i += 1) {
      this.selectList.push(false);
    }
  },
  mounted() {
    setTimeout(() => {
      this.showGenre = true;
    }, 2000);
  },
  methods: {
    enter(el) {
      const delay = `${el.dataset.index * 100}ms`;
      el.style.animationDelay = delay;
    },
    selectGenre(index) {
      this.$set(this.selectList, index, !this.selectList[index]);
      const find = this.selectProps.indexOf(this.genreMap[index]);
      if (find !== -1) {
        this.selectProps.splice(find, 1);
      } else {
        this.selectProps.push(this.genreMap[index]);
      }
    },
    async submit() {
      this.pageLoading = true;
      try {
        await API.submitSelection(this.selectProps);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.choose-container {
  padding-top: 40px;
  text-align: center;
  height: 100vh;
  font-size: 40px;

  .title {
    margin-top: 310px;
    animation: move 1s forwards;
    animation-delay: 1s;
  }

  .genre-list {
    position: relative;
    height: calc(60% + 40px);
    margin: 0 100px;
    // animation: show-genre .5s 2s forwards;

    div {
      position: absolute;
      overflow: hidden;
      border-radius: 50%;
      font-weight: bold;
      box-sizing: border-box;
      box-shadow: 0 5px 15px -5px #00000070;
      transition: all .2s;

      &.selected {
        border: 5px dashed #333;
      }

      &::before {
        content: "";
        position: absolute;
        left: -110%;
        top: 90%;
        width: 120%;
        height: 120%;
        background-color: rgba(246, 245, 247, 0.4);
        transform: rotate(45deg);
      }

      &:hover {
        cursor: pointer;
        transform: scale(1.2);

        &::before {
          animation: popover 0.5s 1 forwards;
          top: -10%;
          left: -10%;
        }
      }
    }
  }

  #submit {
    margin-top: 50px;
    padding: 20px 80px;
    border: none;
    outline: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: bold;
    color: #f6f5f7;
    background-color: #20bf6b;
    transition: all .5s;

    &:hover {
      cursor: pointer;
      background-color: #18864b;
      box-shadow: 0 5px 15px -5px #00000070;
    }
  }
}

.button-up-enter, .button-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.button-up-enter-to, .button-up-leave {
  transform: translate(0);
  opacity: 1;
}

@keyframes move {
  0% {
    margin-top: 310px;
    font-size: 2em;
  }
  100% {
    margin-top: 0;
    font-size: 1em;
  }
}

@keyframes popover {
  0% {
    left: -110%;
    top: 90%;
  }
  100% {
    left: 80%;
    top: -100%;
  }
}
</style>
