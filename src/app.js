import Vue from 'vue';

import iView from 'iview';
import App from './App.vue';
import store from './vuex/store/store';
import router from './router/index';
import * as filters from './filters/index';
import xfdUI from './page/components/index';
require('./i18n/index');
Vue.use(xfdUI);
Vue.use(iView);
/**
 * 全局注入过滤器
 */
Object.keys(filters).forEach(key => {
  //console.log(key);
    Vue.filter(key, filters[key]);
});
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
