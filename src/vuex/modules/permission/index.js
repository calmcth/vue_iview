import {Api} from '../../../utilities/index';
export default {
    namespaced: true,
    state:{
        // 完整权限列表（菜单列表）
        list: []
    },
    mutations:{
        setMode: (state, data) => {
            state.mode = data
        },
        setList: (state, data) => {
            state.list = data
        }
    },
    actions:{
        // 获取权限列表
        getPermission({commit, rootState}){
            return new Promise((resolve, reject) =>{
                Api.queryNavList().then((res) => {
                    // 存储权限菜单列表
                    res.forEach((item)=>{
                        if(item.icon===undefined || item.icon===''){
                            item.icon="android-document";
                        }
                    });
                    commit('setList', res);
                    resolve(res)
                }).catch(() => {
                    reject()
                })
            })
        }
    }
}