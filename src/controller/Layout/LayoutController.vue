
<style scoped>
   @import "../../style/layout.css";
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex" style="height: 100%">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="tableList" theme="dark" width="auto" @on-select="onSelect">
                    <div class="layout-logo-left cdgl">
                        菜单管理
                    </div>
                    <MenuItem name="tableList">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">列表</span>
                    </MenuItem>
                    <MenuItem name="userInfo">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">个人信息</span>
                    </MenuItem>
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                    <Dropdown class="login_out" @on-click="quit">
                        <a href="javascript:void(0)">
                            {{userName}}
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="quit">退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    import {Tool,LocalStorage} from '../../utilities/index';
    export default {
        data () {
            return {
                spanLeft: 4,
                spanRight: 20
            }
        },
        computed: {
            ...mapState({
                userName:(state) => {
                    return state.userName;
                }
            }),
            iconSize () {
                return this.spanLeft === 4 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
            },
            onSelect(name){
                console.log(name);
                Tool.push({
                    path:"/"+name
                })
            },
            quit(name){
                switch (name){
                    case "quit":LocalStorage.clear();Tool.replace({path:'/login'});break;
                    default:break;
                }
            }
        }
    }
</script>
