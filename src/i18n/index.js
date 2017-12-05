import VueI18n from 'vue-i18n';
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';
import Vue from 'vue';
Vue.use(VueI18n);

Vue.config.lang = 'en';
/**
 * 把自定义国际化和iview国际化合并以后统一设置成新的国际化
 */
Vue.locale('en', Object.assign(require('./lang/en'), en));
Vue.locale('cn', Object.assign(require('./lang/cn'), zh));