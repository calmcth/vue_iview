<template>
    <Submenu  v-if="item.child && item.child.length" :index="navIndex" :name="item.name">
        <!-- 创建父级菜单 -->
        <template slot="title"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</template>
        <!-- 创建子菜单 -->
        <nav-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" :iconSize="iconSize"></nav-item>
    </Submenu>

    <MenuItem v-else :name="item.path" :key="item.path" >
        <Icon type="ios-navigate" :size="iconSize"></Icon>
        <span class="layout-text">{{item.name}}</span>
    </MenuItem>
</template>

<script>
    export default {
        name: 'navItem',
        props: ['item','navIndex','iconSize']
    }
</script>
