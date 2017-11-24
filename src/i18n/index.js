import VueI18n from 'vue-i18n';
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';
import Vue from 'vue';
Vue.use(VueI18n);

Vue.config.lang = 'en';
Vue.locale('en', Object.assign(require('./lang/en'), en));
Vue.locale('cn', Object.assign(require('./lang/cn'), zh));