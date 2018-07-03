<template>
	<div style="margin-top:20px;text-align:center;">
		<h2>订单提交成功！</h2>
		<mu-button color="primary" style="margin-top:20px;" @click="BackIndex">
	      返回首页
	      <mu-icon right value="send"></mu-icon>
	    </mu-button>
	</div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'

  export default{
    data: function () {
      return {
      	
      }
    },
    mounted(){
     
    },
    created() {
    },
    watch: {
      
    },
    computed: {
    
    },
    components: {
      
    },
    
    methods: {
    	BackIndex(){
    		this.$router.push({name:'首页'})
    	},
    	
    }
  }

</script>
<style lang="scss" scoped>


</style>
