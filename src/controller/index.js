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
 * 具体业务页
 * @constructor
 */
const TableListController = () => import(/* webpackChunkName: "tableList" */ './home/TableListController.vue');
const UserInfoController = () => import(/* webpackChunkName: "userInfo" */ './home/UserInfoController.vue');
/**
 * 路由配置
 * @constructor
 */
let ControllerRouter= [
    {path:"/tableList", name:'tableList', component:TableListController},
    {path:'/userInfo', name:'userInfo', component:UserInfoController}
];

export default {
    LayoutController,
    LoginController,
    ControllerRouter
}