import Vue from 'vue';

import iView from 'iview';
import App from './App.vue';
import store from './vuex/store/store';
import router from './routers';
require('./i18n/index');
Vue.use(iView);
/**
 * 全局注入过滤器
 */
/*Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});*/
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
