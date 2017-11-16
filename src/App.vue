<template>
  <div id="app">
      <transition :name="transitionName" :duration="{ enter: 500, leave: 500 }">
        <router-view class="view" v-bind:style="{height: fullHeight + 'px' }"></router-view>
      </transition>
  </div>
</template>

<script type="text/babel">
  export default {
    name:'App',
    data() {
      return {
        transitionName: 'fade',
        fullHeight: document.documentElement.clientHeight
      }
    },
    watch: {
      '$route' (to, from) {
        let transition = 'null';
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        this.transitionName = transition;
      }
    },
    methods: {
        handleResize (event) {
            this.fullHeight = document.documentElement.clientHeight
        }
    },
    ready: function () {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize);
    },
    mounted() {
    }
  }
</script>