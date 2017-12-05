<template>
    <Breadcrumb>
        <BreadcrumbItem 
            v-for="item in currentPath" 
            :href="item.path" 
            :key="item.name"
        >{{ itemTitle(item) }}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array
    },
    methods: {
        itemTitle (item) {
            if(this.$t('navListName.'+item.name).indexOf(".")===-1){
                return this.$t('navListName.'+item.name);
            }else{
                return this.$t(item.name)
            }
        },
    }
};
</script>

