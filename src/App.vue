<template>
  <div id="app">
      <transition :name="transitionName" :duration="{ enter: 500, leave: 500 }">
        <router-view class="view" v-bind:style="{height: fullHeight + 'px' }"></router-view>
      </transition>
  </div>
</template>

<script type="text/babel">
    import Vue from 'vue';
  export default {
    name:'App',
    data() {
      return {
        transitionName: 'fade',
        fullHeight: document.documentElement.clientHeight
      }
    },
    methods: {
        handleResize (event) {
            this.fullHeight = document.documentElement.clientHeight
        }
    },
    mounted() {
    },
    created(){
        if(this.$store.state.locale!=="cn"){
            this.$store.dispatch('changeLanguage','cn');
        }
        Vue.config.lang = this.$store.state.locale;
        //this.$i18n.locale=this.$store.state.locale;
        //window.addEventListener('resize', this.handleResize);
    }
  }
</script>