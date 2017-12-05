import Vue from 'vue';
import Vuex from 'vuex';
import vuexModules from '../modules/index';
Vue.use(Vuex);

const state = {
    token: null,
    locale:'cn',//当前语言
    userName:'admin',
    password:'admin',
    msg:'',
    pageHeight: document.documentElement.clientHeight>=750?document.documentElement.clientHeight:750 //全局的高度
};
const actions = {
    updateUser ({ commit, state },params) {
        commit(`SET_USERNAMEANDPASSWORD`, params);
    },
    verificationUser({ commit, state },params){
        let msg='';
        if(params){
            if(params.user!==state.userName){
                msg="用户名或者密码错误";
            }
            if(params.password!==state.password){
                msg= "用户名或者密码错误";
            }
        }
        commit(`SET_MSG`, msg);
    },
    changeLanguage({ commit, state },params) {
        commit(`SET_CHANGELANGUAGE`, params);
    }

};
export default new Vuex.Store({
  state,
  actions,
  mutations: {
      [`SET_USERNAMEANDPASSWORD`](state, data) {
          console.log(data);
          state.userName = data.userName;
          state.password = data.userName;
      },
      [`SET_MSG`](state, data) {
          state.msg = data;
      },
      [`SET_CHANGELANGUAGE`](state, data) {
          state.locale = data;
      },
      ['SET_PAGEHEIGHT'](state,data){
         state.pageHeight=data>=750?data:750 ;
      }
  },
  modules:vuexModules
})
