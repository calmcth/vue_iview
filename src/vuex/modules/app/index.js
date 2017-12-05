//import {otherRouter, appRouter} from '@/router/router';
//import Util from '@/libs/util';
//import Cookies from 'js-cookie';
import {LocalStorage} from '../../../utilities/index';

const app = {
    namespaced: true,
    state: {
        cachePage: [],
        disableClosePath:"/homeManage",
        isFullScreen: false,
        passwordModal:false, //修改密码的弹窗状态
        openedSubmenuArr: [],  // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [],//标签页数组
        currentPageName: '',//当前页的名称
        currentPath: [],  // 面包屑数组
        menuList: []
    },
    actions:{
        /**
         * 添加标签页
         * @param commit
         * @param state
         * @param params
         */
        add_pageOpenedList({ commit, state },params){
            let isAllow=true;
            /**
             * 判断是否已经存在该标签
             */
            if(state.pageOpenedList && state.pageOpenedList.length>0){
                state.pageOpenedList.forEach((item)=>{
                    if(item.path===params.path){
                        isAllow=false;
                        return
                    }
                });
            }
            if(isAllow){
                commit(`ADD_PAGEOPENEDLIST`,params);
                LocalStorage.update("pageOpenedList",JSON.stringify(state.pageOpenedList));
            }
        },
        /**
         * 清除除第一个以外的所有标签页
         * @param commit
         * @param state
         */
        clearAllTags ({ commit, state }) {
            commit(`SET_CLEARALLTAGS`);
            LocalStorage.update("pageOpenedList",JSON.stringify(state.pageOpenedList));
        },
        /**
         * 删除其中一个标签页
         * @param commit
         * @param state
         */
        removeTag ({ commit, state }, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.path === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
            LocalStorage.update("pageOpenedList",JSON.stringify(state.pageOpenedList));
        },
        /**
         * 删除其他标签页
         * @param commit
         * @param state
         * @param params
         */
        clearOtherTags ({ commit, state }, params) {
            let currentName = params.path;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.path === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                commit(`SET_CLEARALLTAGS`);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1,currentIndex - 1);
            }
            LocalStorage.update("pageOpenedList",JSON.stringify(state.pageOpenedList));
        },
        /**
         * 设置面包屑数组
         * @param commit
         * @param state
         * @param pathArr
         */
        setCurrentPath ({ commit, state }, pathArr){
            commit(`SET_CURRENTPATH`,pathArr);
        },
        /**
         * 设置密码修改弹窗的状态
         * @param commit
         * @param state
         * @param params
         */
        setPasswordModal({ commit, state }, params){
            commit(`SET_PASSWORDMODAL`,params);
        },
        setDisableClosePath({ commit, state }, params){
            commit(`SET_DISABLECLOSEPATH`,params);
        }

    },
    mutations: {
        ['ADD_PAGEOPENEDLIST'](state, data){
            state.pageOpenedList.push(data);
        },
        ['SET_CLEARALLTAGS'](state){
            state.pageOpenedList.splice(1);
        },
        ['SET_UPDATAPAGEOPENEDLIST'](state,data){
            state.pageOpenedList=data;
        },
        ['SET_CURRENTPATH'](state,pathArr){
            state.currentPath = pathArr;
        },
        ['SET_PASSWORDMODAL'](state,data){
            state.passwordModal = data;
        },
        ['SET_DISABLECLOSEPATH'](state,data){
            state.disableClosePath=data;
        }
    }
};

export default app;
