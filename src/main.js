import Vue from 'vue';
import QS from 'qs';
import ElementUI from 'element-ui';
import animate from 'animate.css';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';


Vue.prototype.qs = QS;

Vue.use(ElementUI);
Vue.use(animate);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
