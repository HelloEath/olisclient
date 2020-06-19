// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'babel-polyfill'
import App from './App.vue';
import router from './router/index.js';
import Vuelidate from 'vuelidate';
import store from './store';
/* iconfont */

import './assets/iconfont/iconfont.js';
 /* eslint-disable no-new */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/skin/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import Iview  from 'iview';
import 'iview/dist/styles/iview.css';
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
import './assets/css/sprite.scss'
// 引入自定义loading组件
import Loading from './components/loading';
Vue.use(Loading);
Vue.use(preview);
Vue.use(Vuelidate);
// Vue.config.productionTip = false;
Vue.use(Iview);
Vue.use(ElementUI);
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
Vue.bus = new Vue();
Vue.localeText={
  noRowsToShow: '没有数据'
};


/* 刷新查询 */
function refreshStatus(){
  store.dispatch("loginStatus");
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
