/*import LayoutController from './Layout/LayoutController.vue';
import LoginController from './login/LoginController.vue';
import TableListController from './home/TableListController.vue';
import UserInfoController from './home/UserInfoController.vue';*/

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