// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储
const asyncRouter = [
    {
        path:"/tableList",
        name:'/tableList',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/home/TableListController')), 'tableList')
    },
    {
        path:'/userInfo',
        name:'/userInfo',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/home/UserInfoController')), 'userInfo')
    }
];

export default asyncRouter
