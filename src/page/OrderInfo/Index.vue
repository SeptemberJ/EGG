<template>
	<div class="OrderInfo">
		<mu-container>
			<mu-form :model="formContact" class="mu-demo-form" :label-position="labelPosition" label-width="100">
				<!--买家信息-->
				<div class="ColumnBar">
					<span><i class="material-icons">account_box</i></span>
					<span><b>买家信息</b></span>
				</div>
				<mu-form-item prop="name" label="姓名">
			      <mu-text-field v-model="formContact.name"></mu-text-field>
			    </mu-form-item>
			    <mu-form-item prop="tel" label="手机号">
			      <mu-text-field v-model="formContact.tel"></mu-text-field>
			    </mu-form-item>
			    <mu-form-item prop="address" label="送货地址">
			      <mu-text-field v-model="formContact.address"></mu-text-field>
			    </mu-form-item>
			</mu-form>
			<!--订单详情-->
			<mu-form :model="formDetail" class="mu-demo-form" label-position="left" label-width="80">
			    <div class="ColumnBar">
					<span><i class="material-icons">assignment</i></span>
					<span><b>订单详情</b></span>
				</div>
				<mu-flex class="flex-wrapper" align-items="center">
					<mu-flex class="flex-demo" justify-content="start" fill>
						<mu-form-item prop="address" label="币别">
							<mu-text-field v-model="formDetail.currencyKind"></mu-text-field>
						</mu-form-item>
					</mu-flex>
					<mu-flex class="flex-demo" justify-content="start" fill>
						<mu-form-item prop="address" label="汇率">
							<mu-text-field v-model="formDetail.exchangeRate"></mu-text-field>
						</mu-form-item>
					</mu-flex>
				</mu-flex>
				<mu-form-item prop="organization" label="组织机构">
					<mu-text-field v-model="formDetail.organization"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="applicationDepartment" label="申请部门">
					<mu-text-field v-model="formDetail.applicationDepartment"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="responsibilityDepartment" label="责任部门">
					<mu-text-field v-model="formDetail.responsibilityDepartment"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="personLiable" label="责任人">
					<mu-text-field v-model="formDetail.personLiable"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="maker" label="制单人">
					<mu-text-field v-model="formDetail.maker"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="intercourse" label="往来">
					<mu-text-field v-model="formDetail.intercourse"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="goods" label="内容">
					<mu-text-field v-model="formDetail.goods"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="metering" label="计量">
					<mu-text-field v-model="formDetail.metering"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="unitPrice" label="单价" label-width="50">
					<mu-text-field v-model="formDetail.unitPrice" ></mu-text-field>
				</mu-form-item>
				<mu-flex class="flex-wrapper" align-items="center">
					<mu-flex class="flex-demo" justify-content="start" fill>
						<mu-form-item prop="amount" label="数量" label-width="50">
							<mu-text-field v-model="formDetail.amount"></mu-text-field>
						</mu-form-item>
					</mu-flex>
					<mu-flex class="flex-demo" justify-content="start" fill>
						<mu-form-item prop="taxAmount" label="含税金额">
							<mu-text-field v-model="formDetail.taxAmount"></mu-text-field>
						</mu-form-item>
					</mu-flex>
				</mu-flex>
				<!--tips-->
				<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>备注</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>批发价</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>启日期</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>2018-09-09</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>止日期</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>2018-09-09</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>计划预算进度</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>2018-09-09</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>计划</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>2018-09-09</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>预算</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>333</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>计划预算额</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>333</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>人民币不含税额</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>333</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>辅助</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>框</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>辅量</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>333</mu-flex>
			  	</mu-flex>
			</mu-form>
			<mu-flex class="flex-wrapper marginTB_20" justify-content="center" align-items="center">
			    <mu-button color="success">提交</mu-button>
		  	</mu-flex>
			
		</mu-container>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
//import $ from 'jquery'

  export default{
    data: function () {
      return {
      	labelPosition:'top',
      	formContact: {
      		name:'',
	        tel: '',
	        address:'',
	    },
		formDetail:{
			currencyKind:'人民币',
			exchangeRate:1,
			organization:'',
			applicationDepartment:'',
			responsibilityDepartment:'',
			personLiable:'',
			maker:'',
			intercourse:'',
			goods:'',
			metering:'',
			amount:'800',
			unitPrice:'4',
			taxAmount:'3200'





		}
      }
    },
    mounted(){
     
    },
    created() {
   	//this.GetProductions()
    },
    watch: {
    	
      
    },
    computed: {
    	
    
    },
    components: {
      
    },
    
    methods: {
    	
      
    }
  }

</script>
<style lang="scss" scoped>
.OrderInfo{
	background:#fff;
	.ColumnBar{
		height:30px;
		margin:10px auto;
		display:block;
		line-height:30px;
		overflow:hidden;
		span{
			float:left;
			height:100%;
			display:inline-block;
		}
		i{
			font-size:30px;
		}
	}
	.mu-form-item{
		margin-bottom:10px !important;
		padding-bottom:0 !important;
	}
	.tips{
		height:32px;
		color:rgba(0,0,0,.54);
	}
}

</style>
