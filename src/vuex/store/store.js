import Vue from 'vue';
import Vuex from 'vuex';
import vuexModules from '../modules/index';
Vue.use(Vuex);

const state = {
    token: null,
    locale:'cn',
    userName:'admin',
    password:'admin',
    msg:''
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
      }
  },
  modules:vuexModules
})
