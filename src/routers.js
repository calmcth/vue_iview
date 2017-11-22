import Vue from 'vue';
import VueRouter from 'vue-router';
import Modeules from './controller/index';
import {LocalStorage} from './utilities/index';
Vue.use(VueRouter);

const router = new VueRouter({
    //mode: 'history',
    routes: [
        {
            path: '/home',
            name:'home',
            component: Modeules.LayoutController,
            children:[
                {path:"/tableList", name:'tableList', component: Modeules.TableListController},
                {path:'/userInfo', name:'userInfo', component: Modeules.UserInfoController}
            ]
        },
        {
            path: '/login', name:'login', component: Modeules.LoginController,
        }
    ]
});

let auth = false;
/**跳转拦截**/
router.beforeEach((to, from, next) => {
    if(to.path!=='/login' && LocalStorage.get("SimUserInfo_")===null){
        next('/login');
    }else{
        switch (to.path){
            case '/':next({path: '/tableList'}); break;
            default:next();
        }
    }
});
export default router;