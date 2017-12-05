// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// name 用来做中英切换的
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储
/**
 * 控制台首页
 * @type {Array}
 */
const home=[
    {
        path:"/homeManage",
        name:'homeManage',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/home/HomeManageController.vue')), 'homeManage')
    }
];
/**
 * 管理
 * @type {[null,null,null,null,null]}
 */
const Manage=[
    {
        path:"/smsManage/contacts",
        name:'contacts',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/smsManager/ContactsController.vue')), 'contacts')
    },
    {
        path:"/smsManage/templateManage",
        name:'templateManage',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/smsManager/TemplateManageController.vue')), 'templateManage')
    },
    {
        path:"/smsManage/dataQuery",
        name:'dataQuery',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/smsManager/DataQueryController.vue')), 'dataQuery')
    },
    {
        path:"/smsManage/billManage",
        name:'billManage',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/smsManager/BillManageController.vue')), 'billManage')
    },
    {
        path:"/smsManage/blackList",
        name:'blackList',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/smsManager/BlackListController.vue')), 'blackList')
    },
    {
        path:"/smsManage/smsDraft",
        name:'smsDraft',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/smsManager/SmsDraftController.vue')), 'smsDraft')
    }
];

/**
 * 设置
 * @type {[null,null,null,null,null]}
 */
const settingRouter=[
    {
        path:"/setting/accountSetting",
        name:'accountSetting',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/setting/AccountSettingController.vue')), 'accountSetting')
    },
    {
        path:"/setting/agentAccountManage",
        name:'agentAccountManage',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/setting/AgentAccountManageController.vue')), 'agentAccountManage')
    },
    {
        path:"/setting/interiorAccountManage",
        name:'interiorAccountManage',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/setting/InteriorAccountManageController.vue')), 'interiorAccountManage')
    }

];

const asyncRouter = [
    ...home,
    ...Manage,
    ...settingRouter
];

export default asyncRouter
