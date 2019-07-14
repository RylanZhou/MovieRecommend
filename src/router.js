import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
    }, {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    }, {
      path: '/choose',
      name: 'Choose',
      component: () => import('./views/Choose.vue'),
    }, {
      path: '/recommend',
      name: 'Recommend',
      component: () => import('./views/Recommend.vue'),
    },
  ],
});
