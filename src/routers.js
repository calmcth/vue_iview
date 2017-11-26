import Vue from 'vue';
import VueRouter from 'vue-router';
import Modeules from './controller/index';
import {LocalStorage} from './utilities/index';
Vue.use(VueRouter);

const router = new VueRouter({
    //mode: 'history',
    routes: [
        {
            path: '/layout',
            name:'layout',
            component: Modeules.LayoutController,
            children:Modeules.ControllerRouter
        },
        {
            path: '/login', name:'login', component: Modeules.LoginController,
        }
    ]
});
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