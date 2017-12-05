
<template>
    <div style="float: right;margin-right: 150px;line-height: 60px;padding: 0;">
        <Tooltip content="中/EN" placement="bottom">
            <Button shape="circle" v-on:click="changeLanguage">{{ langShow }}</Button>
        </Tooltip>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'changeLanguage',
    props: {
        lang: {
            type: String,
            required: true
        }
    },
    computed: {
        langShow () {
            return this.lang === 'cn' ? 'EN' : '中';
        }
    },
    methods: {
        changeLanguage(){
            if(this.$store.state.locale==="cn"){
                this.$store.dispatch('changeLanguage','en');
            }else {
                this.$store.dispatch('changeLanguage','cn');
            }
            Vue.config.lang = this.$store.state.locale;
        }
    }
};
</script>
