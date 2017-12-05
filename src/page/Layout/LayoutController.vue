<style lang="less">
    @import "../../style/layout.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?sidebarNavWidthShrink+'px':sidebarNavWidth+'px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    :theme="menuTheme"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-con">
              <!--      <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
                    <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />-->
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?sidebarNavWidthShrink+'px':sidebarNavWidth+'px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <changeLanguage :lang="lang"></changeLanguage>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="userInfoChange">{{ $t("layout.userInfoChange") }}</DropdownItem>
                                    <DropdownItem name="changePassword">{{ $t("layout.changePassword") }}</DropdownItem>
                                    <DropdownItem name="loginout" divided>{{ $t("layout.logOut") }}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?sidebarNavWidthShrink+'px':sidebarNavWidth+'px'}">
            <div class="single-page" :style="{  minWidth: shrink?(1400-sidebarNavWidthShrink)+'px':(1400-sidebarNavWidth)+'px'}">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <changePasswordVue :passwordModal="passwordModal"></changePasswordVue>
    </div>
</template>
<script>
    import vue from 'vue';
    import {
        mapGetters,
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    import {Tool,LocalStorage} from '../../utilities/index';
    import shrinkableMenu from './components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './components/tagspage/tags-page-opened.vue';
    import breadcrumbNav from './components/breadcrumbNav/breadcrumb-nav.vue';
    import changeLanguage from './components/changeLanguage/change_language.vue';
    import changePasswordVue from './components/changePassword/changePassword.vue';
    export default {
        components: {
            shrinkableMenu,//左侧导航组件
            tagsPageOpened,//标签页组件
            breadcrumbNav,//面包屑组件
            changeLanguage,//中英切换组件
            changePasswordVue//修改密码组件
       /*     fullScreen,
            lockScreen,
            messageTip,
            themeSwitch*/
        },
        data () {
            return {
                shrink: false, //左侧导航是否收缩
                sidebarNavWidth:230,//不收缩前左侧导航宽度
                sidebarNavWidthShrink:60,//收缩后左侧导航宽度
                activeName:this.$route.path,//当前路由
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            ...mapState({
                userName:(state) => {
                    return state.userName;
                },
                pageTagsList: (state)=>{
                    return state.app.pageOpenedList;  // 打开的页面的页面对象
                },
                menuList:(state) => {
                    return state.permission.list;// 菜单数据
                },
                currentPath: (state)=> {
                    return state.app.currentPath;  // 当前面包屑数组
                },
                lang:(state)=>{
                    return state.locale;// 当前所用的语言
                },
                passwordModal:(state)=>{
                    return state.app.passwordModal;// 修改密码弹窗的状态
                }
            })
        },
        methods: {
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                switch (name){
                    case "userInfoChange":
                        Tool.push({path:'/userInfoChange'});
                        break;
                    case "changePassword":
                        this.$store.dispatch('app/setPasswordModal',true);
                        break;
                    case "loginout":
                        // 退出登录
                        LocalStorage.remove("SimUserInfo_");
                        Tool.replace({path:'/login'});
                        break;
                }
            },
            /**
             * 设置当前页的面包屑
             * @param path
             * @returns {Array}
             */
            setCurrentPath (path) {
                //拆分路由
                let paths$=path.split("/").splice(1);
                let length=paths$.length-1;
                let currentPath=[];
                //获取拆分路由对应的名称
                function getPaths(list,currentIndex) {
                    list.forEach((item,index)=>{
                        if(item.name===paths$[currentIndex]){
                            currentPath.push({
                                path:item.path,
                                name:item.name
                            });
                            if(currentIndex!==length && item.child){
                                getPaths(item.child,currentIndex+1);
                            }
                        }
                    });
                }
                getPaths(this.menuList,0);
                //右上方下拉的选项中的修改账户
                if(path==="/userInfoChange"){
                    currentPath.push({
                        path:"/userInfoChange",
                        name:"userInfoChange"
                    });
                }
                return currentPath;
            }
        },
        watch: {
            /**
             * 监听路由的变化
             */
            $route(){
                this.activeName=this.$route.path;

                this.$store.dispatch('app/setCurrentPath',this.setCurrentPath(this.activeName));
            }
        },
        created () {
            this.$store.dispatch('app/setCurrentPath',this.setCurrentPath(this.activeName));
        }
    };
</script>
