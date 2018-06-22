<template>
<div class="com-app">
    <transition>
        <router-view class="child-view"></router-view>
    </transition>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
  export default{
    data: function () {
      return {
        
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
      activeRoute(){
        return this.$store.state.activeRoute
       }
      
    },
    watch: {
      
    },
    components: {
      
      

    },
    methods: {
     

    }
  }
</script>
<style scoped>
.child-view{
	background:#fff;
}
</style>
