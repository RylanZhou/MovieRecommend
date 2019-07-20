<template>
  <div class="app-container" :class="rightPanelActive ? 'right-panel-active' : ''">
    <div class="login-container">
      <div class="form-container sign-up-container">
        <div class="form" v-loading="signUpLoading">
          <h1>用户注册</h1>
          <!-- <div class="social-container">
            <a href="#" class="social">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="#" class="social">
              <i class="fa fa-google-plus"></i>
            </a>
            <a href="#" class="social">
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
          <span>or use your email for registration</span> -->
          <input v-model="signUpForm.username" type="text" placeholder="用户名" />
          <input v-model="signUpForm.password" type="password" placeholder="密码" />
          <input v-model="signUpForm.confirm" type="password" placeholder="确认密码" />
          <button @click="signUp">注 册</button>
          <transition name="el-fade-in-linear">
            <div class="check" v-show="registered">
              <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24">
                <!-- eslint-disable-next-line max-len -->
                <path id="check-path" :class="registered ? 'show' : ''" fill="#1abc9c" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
              </svg>
              注册成功！正在登录。
            </div>
          </transition>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="form" v-loading="signInLoading">
          <h1>用户登录</h1>
          <!-- <div class="social-container">
            <a href="#" class="social">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="#" class="social">
              <i class="fa fa-google-plus"></i>
            </a>
            <a href="#" class="social">
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
          <span>or use your account</span> -->
          <input v-model="signInForm.username" placeholder="用户名" />
          <input v-model="signInForm.password" type="password" placeholder="密码" />
          <!-- <a href="#">Forgot your password?</a> -->
          <button @click="signIn">登 录</button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>电影推荐系统</h1>
            <span>—— 项目组成员 ——</span>
            <span>张&nbsp;&nbsp;&nbsp;&nbsp;征</span>
            <span>芦启明</span>
            <span>周雨楠</span>
            <span>刘诗佳</span>
            <span>王怡然</span>
            <button class="ghost" id="sign-in" @click="rightPanelActive = false">
              <i class="fa fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;登 录
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>电影推荐系统</h1>
            <span>—— 技术栈 ——</span>
            <span>Selenium 网页爬虫</span>
            <span>KMCF_QT 数据预处理</span>
            <span>AP 聚类算法</span>
            <span>协同过滤 算法</span>
            <span>神经网络 相似度对比</span>
            <span>Django 服务器集成</span>
            <span>Webpack 前端环境集成</span>
            <button class="ghost" id="sign-up" @click="rightPanelActive = true">
              <i class="fa fa-arrow-right"></i>&nbsp;&nbsp;&nbsp;注 册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api';

export default {
  name: 'Login',
  data() {
    return {
      rightPanelActive: false,
      registered: false,
      signUpForm: {
        username: '',
        password: '',
        confirm: '',
      },
      signInForm: {
        username: '',
        password: '',
      },
      signUpLoading: false,
      signInLoading: false,
    };
  },
  methods: {
    async signUp() {
      this.signUpLoading = true;
      if (this.signUpForm.password !== this.signUpForm.confirm) {
        this.$message.error('密码输入不一致');
        return;
      }
      try {
        const { data } = await API.userSignUp(Object.assign({
          Age: 123,
          Gender: 'M',
          Occupation: 'Fire Fighting',
        }));
        this.registered = true;
        setTimeout(() => {
          this.$router.push({
            name: 'Choose',
            query: {
              userId: data.UserID,
            },
          });
        }, 2000);
      } catch (error) {
        this.$message.error(error.message);
      }
      this.signUpLoading = false;
    },
    async signIn() {
      if (this.signInForm.password !== '000000') {
        this.$message.error('密码输入错误');
        return;
      }
      try {
        this.signInLoading = true;
        let username = `${this.signInForm.username}`;
        for (let i = 0; i < username.length; i += 1) {
          if (username[i] === '0') {
            username = username.substring(i + 1, username.length);
            i -= 1;
          } else {
            break;
          }
        }
        // const { data } = await API.userSignIn({
        //   user_id: parseInt(username, 10),
        //   skip: 0,
        //   limit: 1,
        // });
        this.$router.push({
          name: 'Recommend',
          query: {
            userId: parseInt(username, 10),
            fromRegister: false,
          },
        });
      } catch (error) {
        this.$message.error(error);
      }
      this.signInLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  // background-image: url('../assets/movie.png');
  // background-repeat: no-repeat;
  // background-size: cover;

  h1 {
    font-weight: bold;
  }

  p {
    font-size: 20px;
    font-weight: 100;
    letter-spacing: .5px;
  }

  span {
    font-size: 18px;
    line-height: 30px;
  }

  a {
    margin: 15px 0;
    font-size: 14px;
    text-decoration: none;
    color: #333;
  }

  button {
    margin-top: 40px;
    padding: 12px 45px;
    letter-spacing: 1px;
    border: 1px solid #ff4b2b;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: #ff4b2b;
    transition: transform 80ms ease-in;

    &:active {
      transform: scale(0.95);
    }

    &:focus {
      outline: none;
    }

    &:hover {
      cursor: pointer;
    }

    &.ghost {
      border-color: #fff;
      background-color: transparent;
      transition: all .3s;

      &:hover {
        color: rgb(75, 19, 13);
        background-color: #fff;
      }
    }
  }

  .login-container {
    position: relative;
    max-width: 1000px;
    min-height: 520px;
    margin-left: 170px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    background-color: #fff;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;

    &.sign-in-container {
      z-index: 2;
      left: 0;
      width: 50%;
    }

    &.sign-up-container {
      z-index: 1;
      left: 0;
      width: 50%;
      opacity: 0;
    }

    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 50px;
      height: 100%;
      background-color: #fff;

      h1 {
        margin-bottom: 50px;
      }

      .check {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        height: 100%;
        width: 100%;
        font-size: 20px;
        color: #333;
        background-color: #fff;

        svg {
          margin: 0 auto;
        }
      }

      .social-container {
        margin: 20px 0;

        a {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
          border: 1px solid #ddd;
          border-radius: 50%;
        }
      }

      input {
        padding: 12px 15px;
        margin: 8px 0;
        width: 80%;
        border: none;
        font-size: 16px;
        background-color: #eee;
        outline: none;
      }
    }
  }

  .overlay-container {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;

    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      // background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0 / cover;
      background-image: url('../assets/movie.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      color: #fff;
      transform: translateX(0);
      transition: transform .6s ease-in-out;

      .overlay-panel {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50%;
        padding: 0 40px;
        text-align: center;
        transform: translateX(0);
        transition: transform .6s ease-in-out;

        &.overlay-right {
          right: 0;
          transform: translateX(0);
        }

        &.overlay-left {
          transform: translateX(-20%);
        }
      }
    }
  }

  &.right-panel-active {
    .sign-in-container {
      transform: translateX(100%);
    }

    .overlay-container {
      transform: translateX(-100%);

      .overlay {
        transform: translateX(50%);

        .overlay-left {
          transform: translateX(0);
        }
      }
    }

    .sign-up-container {
      z-index: 5;
      opacity: 1;
      transform: translate(100%);
    }
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
