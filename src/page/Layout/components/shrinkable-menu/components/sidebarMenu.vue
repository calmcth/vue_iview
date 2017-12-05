<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="$route.path" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="onSelect">
        <template v-for="item in menuList">
            <Submenu  v-if="item.child && item.child.length" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon v-if="item.icon" :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.child">
                    <MenuItem :name="child.path" :key="child.path">
                        <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
                        <span class="layout-text" :key="child.path">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>

            <MenuItem v-else :name="item.path" :key="item.name" >
                <Icon v-if="item.icon" :type="item.icon" :size="iconSize"></Icon>
                <Icon v-else type="ios-navigate" :size="iconSize"></Icon>
                <span class="layout-text">{{ itemTitle(item) }}</span>
            </MenuItem>
        </template>
    </Menu>
</template>

<script>
import {Tool} from 'utilities/index';
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        itemTitle(item) {
            if(this.$t('navListName.'+item.name).indexOf(".")===-1){
                return this.$t('navListName.'+item.name);
            }else{
                return this.$t(item.name)
            }
        },
        onSelect(name){
            Tool.push({
                path:name
            })
        }
    },
    created(){

    }
};
</script>
