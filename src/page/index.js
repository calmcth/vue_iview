/**
 * 登录页
 * @constructor
 */
const LoginController = () => import(/* webpackChunkName: "login" */ './login/LoginController.vue');
/**
 * 布局页
 * @constructor
 */
const LayoutController = () => import(/* webpackChunkName: "layout" */ './Layout/LayoutController.vue');


export default {
    LayoutController,
    LoginController
}