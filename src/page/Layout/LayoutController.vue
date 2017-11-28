
<style scoped>
   @import "../../style/layout.css";
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex" style="height: 100%">
            <Col :span="spanLeft" class="layout-menu-left">
                <v-sidenav :spanLeft="spanLeft" :activeName="activeName"></v-sidenav>
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
                            <DropdownItem name="CnChnageEn">中英切换</DropdownItem>
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
<script type="text/babel">
    import Vue from 'vue';
    import {
        mapGetters,
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    import {Tool,LocalStorage} from '../../utilities/index';
    import vSidenav from './Sidenav.vue'
    export default {
        data () {
            return {
                activeName:this.$route.path,
                spanLeft: 4,
                spanRight: 20
            }
        },
        watch:{
            $route(){
                this.activeName=this.$route.path
            }
        },
        computed: {
            ...mapState({
                userName:(state) => {
                    return state.userName;
                }
            })
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
            quit(name){
                switch (name){
                    case "quit":
                        LocalStorage.clear();Tool.replace({path:'/login'});
                        break;
                    case "CnChnageEn":
                        if(this.$store.state.locale==="cn"){
                            this.$store.dispatch('changeLanguage','en');
                        }else {
                            this.$store.dispatch('changeLanguage','cn');
                        }
                        //this.$i18n.locale=this.$store.state.locale;
                        Vue.config.lang = this.$store.state.locale;
                        break;
                    default:break;
                }
            }
        },
        components:{
            vSidenav
        },
        created() {
        }
    }
</script>
