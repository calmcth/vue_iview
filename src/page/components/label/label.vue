<style scoped>
    .label{
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        padding: 0 12px;
        position: relative;
    }
    .headClasses{
        line-height: 1;
        padding: 8px 5px;
        font-size: 18px;
        border-bottom: 1px solid #D7D7D7;
    }
    .bodyClasses{
        padding: 12px 5px;
    }
</style>
<template>
    <div class="label">
        <div class="headClasses">{{title}}</div>
        <div class="bodyClasses"><slot></slot></div>
    </div>
</template>
<script type="text/babel">
    import Vue from 'vue';
    export default  {
        name:'xfd-label',
        props:['title']
    }
</script>