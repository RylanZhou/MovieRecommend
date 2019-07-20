<template>
  <div class="app-container">
    <div class="success">
      <h1 class="title">评分成功</h1>
      <transition name="el-fade-in-linear">
        <div class="check" v-show="registered">
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24">
            <!-- eslint-disable-next-line max-len -->
            <path id="check-path" :class="registered ? 'show' : ''" fill="#1abc9c" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
          </svg> <br>
          <button id="return" @click="goBack">重新推荐</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registered: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.registered = true;
    }, 1000);
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'Recommend',
        query: this.$route.query,
        params: this.$route.params,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .success {
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      animation: move .6s forwards;
      animation-delay: 800ms;
    }

    .check {
      text-align: center;
    }

    #return {
      margin-top: 30px;
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
}

@keyframes move {
  from {
    transform: translate(-50%, -50%);
  }
  to {
    transform: translate(-50%, -350%);
  }
}
</style>
