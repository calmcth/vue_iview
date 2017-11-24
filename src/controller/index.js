const LayoutController = () => import(/* webpackChunkName: "layout" */ './Layout/LayoutController.vue');
const LoginController = () => import(/* webpackChunkName: "login" */ './login/LoginController.vue');
const TableListController = () => import(/* webpackChunkName: "tableList" */ './home/TableListController.vue');
const UserInfoController = () => import(/* webpackChunkName: "userInfo" */ './home/UserInfoController.vue');


export default {
    LayoutController,
    LoginController,
    TableListController,
    UserInfoController
}