import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '电影推荐系统',
      },
      redirect: '/login',
    }, {
      path: '/login',
      name: 'login',
      meta: {
        title: '电影推荐系统-登录注册',
      },
      component: () => import('./views/Login.vue'),
    }, {
      path: '/choose',
      name: 'Choose',
      meta: {
        title: '电影推荐系统-选择类别',
      },
      component: () => import('./views/Choose.vue'),
    }, {
      path: '/recommend',
      name: 'Recommend',
      meta: {
        title: '电影推荐系统-电影推荐',
      },
      component: () => import('./views/Recommend.vue'),
    }, {
      path: '/success',
      name: 'Success',
      meta: {
        title: '电影推荐系统-电影推荐',
      },
      component: () => import('./views/Success.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 判断是否有标题
    document.title = to.meta.title;
  }
  next();
});

export default router;
