<template>
  <div id="app">
      <transition :name="transitionName" :duration="{ enter: 500, leave: 500 }">
        <router-view class="view" v-bind:style="{height: fullHeight + 'px' }"></router-view>
      </transition>
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
  export default {
    name:'App',
    data() {
      return {
        transitionName: 'fade',
        fullHeight:document.documentElement.clientHeight
      }
    },
    computed:{

    },
    methods: {
        handleResize (event) {
            this.fullHeight=document.documentElement.clientHeight;
            this.$store.commit('SET_PAGEHEIGHT',document.documentElement.clientHeight);
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    destroyed(){
        window.removeEventListener('click', this.handleResize);
    },
    created(){
/*        if(this.$store.state.locale!=="cn"){
            this.$store.dispatch('changeLanguage','cn');
        }*/
        /**
         * 根据stroe里面的设置初始化语言
         */
        Vue.config.lang = this.$store.state.locale;
        //this.$i18n.locale=this.$store.state.locale;
        //window.addEventListener('resize', this.handleResize);
    }
  }
</script>