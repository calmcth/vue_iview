<template>
    <Menu v-bind:active-name="activeName" theme="dark" width="auto" @on-select="onSelect">
        <div class="layout-logo-left cdgl">
            菜单管理
        </div>
        <nav-item v-for="(item, n) in navList" :item="item" :navIndex="String(n)" :key="n" :iconSize="iconSize"></nav-item>
    </Menu>
</template>
<script>
    import {
        mapGetters,
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    import {Tool} from '../../utilities/index';
    import navItem from './NavItem.vue';
    export default {
        name:"v-sidenav",
        props:{
            spanLeft:Number,
            activeName:String
        },
        computed: {
            ...mapState({
                navList:(state) => {
                    return state.permission.list;
                }
            }),
            iconSize () {
                return this.spanLeft === 4 ? 14 : 24;
            }
        },
        methods: {
            onSelect(name){
                Tool.push({
                    path:name
                })
            }
        },
        components:{
            navItem
        },
        created() {
            //console.log(this.navList);
        }
    }
</script>
