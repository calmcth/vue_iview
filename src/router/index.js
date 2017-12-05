import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import store from '../vuex/store/store'
import Modeules from '../page/index';
import asyncRouter from './asyncRouter';
import whiteList from './directAccess';
import {LocalStorage} from '../utilities/index';
Vue.use(VueRouter);
/**
 * 基础路由
 * @type {[null,null,null]}
 */
let routes=[
    {
        path: '/login', name:'login', component: Modeules.LoginController
    },
    {
        path: '/error',
        name:'/error',
        component: r => require.ensure([], () => r(require('../page/error/error')), 'error'),
        children: [
            {
                path: '/error/401',
                name: '/error/401',
                component: r => require.ensure([], () => r(require('../page/error/401')), 'error')
            },
            {
                path: '/error/403',
                component: r => require.ensure([], () => r(require('../page/error/403')), 'error')
            },
            {
                path: '/error/404',
                component: r => require.ensure([], () => r(require('../page/error/404')), 'error')
            },
            {
                path: '/error/500',
                component: r => require.ensure([], () => r(require('../page/error/500')), 'error')
            }
        ]
    }
];

let layoutRouter={
    path: '/layout',
    name:'layout',
    component: Modeules.LayoutController,
    children:[
        {
            path:"/userInfoChange",
            name:'userInfoChange',
            component:Modeules.UserInfoChangeController
        }
    ]
};
/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter){
    return new Promise((resolve) => {
        const routers$ =layoutRouter;
        // 创建路由
        function createRouter(permission){
            permission.forEach((item) => {
                if(item.child && item.child.length){
                    // 递归
                    createRouter(item.child)
                }
                let path = item.path;
                // 循环异步路由，将符合权限列表的路由加入到routers中
                asyncRouter.find(function(s){
                    if(s.path === path){
                        s.meta.permission = item.permission;
                        routers$.children.push(s);
                        return
                    }
                })
            })
        }
        createRouter(permission);
        resolve([routers$])
    })
}


const router = new VueRouter({
    //mode: 'history',
    routes: routes
});
/**跳转拦截**/
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    if(LocalStorage.get("SimUserInfo_")===null && to.path!=='/login'){
        LocalStorage.remove("SimUserInfo_");
        next('/login');
    }else{
        // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
        if (store.state.permission.list.length === 0) {
            store.dispatch('permission/getPermission').then(resItem => {
                // 匹配并生成需要添加的路由对象
                routerMatch(resItem, asyncRouter).then(res => {
                    routes[0]=res;
                    router.addRoutes(res);
                    if(to.path==="/"){
                        next({path: '/homeManage'});
                    }else {
                        next(to.path);
                    }
                })
            }).catch(() => {
                console.log('登录错误')
            });
        }else{
            // 如果跳转页面存在于路由中则进入，否则跳转到404
            // 因为可以通过改变url值进行访问，所以必须有该判断
            if(to.path==="/"){
                next({path: '/homeManage'});
                return
            }
            if(to.matched.length){
                if(whiteList.indexOf(to.path) < 0){

                }
                next()
            } else{
                router.replace('/error/404')
            }
        }
        next();
    }
    next();
});

router.afterEach(route => {
    /**
     * 初始化标签页导航
     */
    if(LocalStorage.get("pageOpenedList")!==null ){
        store.state.app.pageOpenedList=JSON.parse(LocalStorage.get("pageOpenedList"));
    }else{
        LocalStorage.add("pageOpenedList",JSON.stringify(store.state.app.pageOpenedList))
    }
    /**
     * 每次都请求都添加标签页，如果有就不添加，如果没有就添加
     */
    if(whiteList.indexOf(route.path) < 0 && route.path!=="/" && route.path.indexOf("error")<0){
        store.dispatch('app/add_pageOpenedList',{
            title:route.name,
            path:route.path,
            name:route.name
        });
    }
    iView.LoadingBar.finish();
});
export default router;