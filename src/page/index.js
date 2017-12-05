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
/**
 * 个人信息修改页
 * @constructor
 */
const UserInfoChangeController = () => import(/* webpackChunkName: "userInfo" */ './home/UserInfoChangeController.vue');

export default {
    LayoutController,
    LoginController,
    UserInfoChangeController
}