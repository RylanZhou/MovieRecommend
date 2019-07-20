<template>
  <div class="all-container">
    <img id="film1" src="./assets/film.svg">
    <img id="film2" src="./assets/film.svg">
    <img id="film3" src="./assets/film.svg">
    <img id="clapper1" src="./assets/clapper.svg">
    <img id="clapper2" src="./assets/clapper.svg">
    <img id="clapper3" src="./assets/clapper.svg">
    <img id="roll1" src="./assets/roll.svg">
    <img id="roll2" src="./assets/roll.svg">
    <img id="roll3" src="./assets/roll.svg">
    <transition name="slide" mode="out-in">
      <router-view v-if="isRouterAlive"/>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};

</script>

<style lang="scss">
* {
  box-sizing: border-box;
  user-select: none;
}

body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  background-color: #f6f5f7;
  overflow: hidden;
}

.slide-enter-active, .slide-leave-active {
  transition: all .4s;
}
.slide-enter {
  transform: translateX(-50%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>

<style lang="scss" scoped>
img {
  position: absolute;
  z-index: -1;
  animation: rotation 20s linear infinite;

  &#film1 {
    top: 40px;
    left: 50px;
    width: 200px;
  }

  &#film2 {
    top: 150px;
    right: 64px;
    width: 150px;
  }

  &#film3 {
    bottom: 60px;
    left: 400px;
    width: 180px;
  }

  &#clapper1 {
    top: 50px;
    left: 500px;
    width: 200px;
  }

  &#clapper2 {
    bottom: 40px;
    right: 50px;
    width: 100px;
  }

  &#clapper3 {
    bottom: 40px;
    left: 100px;
    width: 120px;
  }

  &#roll1 {
    top: 50px;
    right: 200px;
    width: 120px;
  }

  &#roll2 {
    bottom: 150px;
    right: 200px;
    width: 300px;
  }

  &#roll3 {
    bottom: 200px;
    left: 50px;
    width: 80px;
  }
}

@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}
</style>
