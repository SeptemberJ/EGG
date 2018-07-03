<template>
	<div class="OrderInfo">
		<mu-appbar style="width: 100%;position:fixed;top:0;left:0;" color="primary">
		  <mu-button icon slot="left" @click="BackIndex">
		    <mu-icon value="arrow_back" left ></mu-icon>
		  </mu-button>
		</mu-appbar>
		<mu-container style="margin-top:80px;">
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
			      <mu-text-field type="number" v-model="formContact.tel"></mu-text-field>
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
							<mu-text-field v-model="formDetail.currencyKind" disabled></mu-text-field>
						</mu-form-item>
					</mu-flex>
					<mu-flex class="flex-demo" justify-content="start" fill>
						<mu-form-item prop="address" label="汇率">
							<mu-text-field v-model="formDetail.exchangeRate" disabled></mu-text-field>
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
					<mu-flex class="flex-demo" justify-content="end" fill>￥{{formDetail.unitPrice}}</mu-flex>
					<!--<mu-text-field v-model="formDetail.unitPrice" ></mu-text-field>-->
				</mu-form-item>
				<mu-flex class="flex-wrapper" align-items="center">
					<mu-flex class="flex-demo" justify-content="start" fill>
						<mu-form-item prop="amount" label="数量" label-width="50">
							<mu-flex class="flex-demo" justify-content="end" fill>{{formDetail.amount}}</mu-flex>
							
						</mu-form-item>
					</mu-flex>
					<mu-flex class="flex-demo" justify-content="start" fill>
						<mu-form-item prop="taxAmount" label="含税金额">
							<mu-flex class="flex-demo" justify-content="end" fill>￥{{formDetail.taxAmount}}</mu-flex>
							<!--<mu-text-field v-model="formDetail.taxAmount"></mu-text-field>-->
						</mu-form-item>
					</mu-flex>
				</mu-flex>
				<!--tips-->
				<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>备注</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" style="width:180px;padding-top:15px;">
				    	<mu-text-field v-model="formTips.note"  style="font-size:12px;" placeholder="请输入备注"></mu-text-field>
				    </mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>启日期</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>{{formTips.dateS}}</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>止日期</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>{{formTips.dateE}}</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>计划预算进度</mu-flex>
				    <mu-select label="" v-model="formTips.PlanProcess" style="width:180px;font-size:12px;" @change="ChangePlan">
						<mu-option v-for="(Plan,Idx) in planInfo" :key="Idx" :label="Plan.PlanProcess" :value="Idx"></mu-option>
					</mu-select>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>计划</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>{{formTips.Plan}}</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>预算</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>{{formTips.Budget}}</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>计划预算额</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>{{formTips.PlanSum}}</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>人民币不含税额</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" fill>￥{{formTips.TotalNoTax}}</mu-flex>
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>辅助</mu-flex>
				    {{formTips.FZ}}
				    <!--
				    <mu-flex class="flex-demo" justify-content="end" style="width:100px;padding-top:15px;">
				    	<mu-text-field v-model="formTips.FZ" style="font-size:12px;" placeholder="请输入辅助"></mu-text-field>
				    </mu-flex>
				    -->
			  	</mu-flex>
			  	<mu-flex class="flex-wrapper tips" justify-content="between" align-items="center">
				    <mu-flex class="flex-demo" justify-content="start" fill>辅量</mu-flex>
				    <mu-flex class="flex-demo" justify-content="end" style="width:100px;padding-top:15px;">
				    	<mu-text-field v-model="formTips.FL" style="font-size:12px;" placeholder="请输入辅量"></mu-text-field>
				    </mu-flex>
			  	</mu-flex>
			</mu-form>
			<mu-flex class="flex-wrapper marginTB_20" justify-content="center" align-items="center">
			    <mu-button v-if="CanWork" color="primary" @click="SubmitOrder">提交</mu-button>
			    <mu-button v-if="!CanWork" disabled>提交中...</mu-button>
		  	</mu-flex>
		</mu-container>
		<mu-dialog title="提示" width="360" :open.sync="openSimple">
		    {{TxtTips}}
		    <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">确定</mu-button>
		 </mu-dialog>

		<mu-alert class="AlertBox" color="error" delete v-if="alert" @delete="closeAlert()">
		    <mu-icon left value="warning"></mu-icon> 订单提交失败！
		 </mu-alert>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'
import {formatTime ,CreatUUID} from '../../util/utils'

  export default{
    data: function () {
      return {
      	CanWork:true,
      	alert: false,
      	TxtTips:'',
      	openSimple: false,
      	labelPosition:'top',
      	formContact: {
      		name:'',
	        tel: '',
	        address:'',
	    },
		formDetail:{
			currencyKind:'人民币',  //币别
			exchangeRate:1,	  	//汇率
			organization:'',  //组织机构
			applicationDepartment:'',//申请部门
			responsibilityDepartment:'',//责任部门
			personLiable:'',//责任人
			maker:'',//制单人
			intercourse:'',//往来
			goods:'',//内容
			metering:'',//计量
			amount:'',//数量
			unitPrice:'',//单价
			taxAmount:'',//含税金额
			//jiliang:''//数量计量
		},
		planInfo:[],
		formTips:{
			note:'',
			dateS:'',
			dateE:'',
			PlanProcess:'',//计划预算进度
			Plan:'',//计划 
			Budget:'',//预算
			PlanSum:'',//计划预算额
			TotalNoTax:'', //人民币不含税
			FZ:'',  //辅助
			FL:''		//辅量

		}
      }
    },
    mounted(){
     
    },
    created() {
   		this.GetProductions()
   		this.formDetail.amount = this.$store.state.TotalAmount
   		this.formDetail.unitPrice = Number(this.$store.state.ChoosedProduction.amount)>Number(this.$store.state.ChoosedProduction.amountb) ? this.$store.state.ChoosedProduction.pricep : this.$store.state.ChoosedProduction.pricel
   		this.formDetail.taxAmount = this.$store.state.TotalPrice
   		this.formTips.FZ = this.$store.state.ChoosedProduction.jiliang
   		//this.formDetail.jiliang = this.$store.state.ChoosedProduction.jiliang
   		this.formTips.dateS = formatTime(new Date())
   		this.formTips.dateE = formatTime(new Date())
   		this.formTips.TotalNoTax = (Number(this.$store.state.TotalPrice)/(1+this.$store.state.ChoosedProduction.ftaxrate/100)).toFixed(2)
   			
    },
    watch: {
    	
      
    },
    computed: {
    	ChoosedProduction(){
            return this.$store.state.ChoosedProduction
        },
    },
    components: {
      
    },
    
    methods: {
    	closeAlert () {
	      this.alert = false;
	    },
    	BackIndex(){
    		this.$router.push({name:'首页'})
    	},
    	openSimpleDialog () {
	      this.openSimple = true;
	    },
	    closeSimpleDialog () {
	      this.openSimple = false;
	    },
    	SubmitOrder(){
    		console.log(this.formContact)
    		console.log(this.formDetail)
    		console.log(this.formTips)
    		//为空校验
    		if(this.formContact.name == '' || this.formContact.tel == '' || this.formContact.address == '' || this.formDetail.organization == '' || this.formDetail.applicationDepartment == '' || this.formDetail.responsibilityDepartment == '' || this.formDetail.personLiable == '' || this.formDetail.maker == '' || this.formDetail.intercourse == '' || this.formDetail.goods == '' || this.formDetail.metering == '' || this.formTips.note == '' || this.formTips.FZ == '' || this.formTips.FL == ''){
    			this.TxtTips = '请填写相关信息!'
    			this.openSimpleDialog()
    			return false
    		}
    		if(!/^1[34578]\d{9}$/.test(this.formContact.tel)){
    			this.TxtTips = '请填写正确的手机号!'
    			this.openSimpleDialog()
    			return false
    		}
    		if(!this.formTips.PlanProcess){
    			this.TxtTips = '请选择计划预算进度!'
    			this.openSimpleDialog()
    			return false
    		}



    		var str1 = '<![CDATA[<?xml version="1.0" encoding="UTF-8"?><NewDataSet> '+
						  '<Cust> '+
						    '<FBase3>' + this.formDetail.currencyKind + '</FBase3>  '+  //币别
						    '<FAmount4>' + this.formDetail.exchangeRate + '</FAmount4>  '+ //汇率
						    '<FBase11>' + this.formDetail.organization + '</FBase11>  '+  //组织机构
						    '<FBase12>' + this.formDetail.applicationDepartment + '</FBase12>  '+ //区域部门
						    '<FBase16>' + this.formDetail.responsibilityDepartment + '</FBase16>  '+ //责任部门
						    '<FBase13>' + this.formDetail.exchangeRate + '</FBase13>  '+ //制度所属部门
						    '<FNOTE1/> '+              //制度造作细则
						  '</Cust>'+
						'</NewDataSet>]]>'
    		var str2 = '<![CDATA[<?xml version="1.0" encoding="UTF-8"?><NewDataSet>'+ 
						  '<Cust> '+
						    '<FTime>' + this.formTips.dateS + '</FTime>  '+   //起日期
						    '<FTime1>' + this.formTips.dateE + '</FTime1>  '+ //止日期
						    '<FBase4>' + this.formDetail.personLiable + '</FBase4>  '+                 //责任人
						    '<FBase15>' + this.formDetail.maker + '</FBase15>  '+                 //制单人
						    '<FBase>' + this.formTips.PlanProcess + '</FBase>  '+                 //计划预算进度
						    '<FNOTE>' + this.formContact.name + this.formContact.tel + this.formContact.address + this.formTips.note + '</FNOTE>  '+                 //备注  姓名 手机 地址 备注
						    '<FBase10>' + this.formDetail.intercourse + '</FBase10>  '+                 //往来
						    '<FBase1>' + this.formDetail.goods + '</FBase1>  '+                 //内容
						    '<FBase2>' + this.formDetail.metering + '</FBase2>  '+                 //计量
						    '<FDecimal>' + this.formDetail.amount + '</FDecimal>  '+                 //数量
						    '<FDecimal1>' + this.formDetail.unitPrice + '</FDecimal1>  '+                 //单价
						    '<FAmount2>' + this.formDetail.taxAmount + '</FAmount2>  '+                 //金额含税
						    '<FAmount3>' + this.formTips.TotalNoTax + '</FAmount3>  '+                 //人民币不含税
						    '<FDecimal2>' + this.formTips.FL + '</FDecimal2>  '+                 //辅量
						    '<FText/>  '+                 //发送消息--
						    '<FText1/>  '+                 //回馈消息--
						    '<FBase14>0</FBase14>  '+                 //评分--
						    '<FBase5/>  '+                 //消息+接收1--
						    '<FCheckBox1>0</FCheckBox1>  '+                 //消息+确认1--
						    '<FBase6/>  '+                 //消息+接收2--
						    '<FCheckBox2>0</FCheckBox2>  '+                 //消息+确认2--
						    '<FBase7/>  '+                 //消息+接收3--
						    '<FCheckBox3>0</FCheckBox3>  '+                 //消息+确认3--
						    '<FBase8/>  '+                 //消息+接收4--
						    '<FCheckBox4>0</FCheckBox4>  '+                 //消息+确认4--
						    '<FBase9/>  '+					//消息+接收5--
						    '<FCheckBox5>0</FCheckBox5>  '+                 //消息+确认5--
						    '<ID>' + CreatUUID() + '</ID>  '+
						    '<fimage1/>  '+
						    '<fimage2/>  '+
						    '<fimage3/>  '+
						    '<fimage4/>  '+
						    '<fimage5/> '+
						  '</Cust>  '+
						'</NewDataSet>]]>'
    		
			this.SubmitFn(str1,str2)
    	},
    	SubmitFn(XMLStr1,XMLStr2){
    		this.CanWork = false
    		var that = this;
			var method = 't_BOS200000000';     
			//var wsdlurl = 'http://180.167.5.198:8084/Service1.asmx';
			var wsdlurl = '/api/Service1.asmx';           
			var tmpNamespace = 'http://tempuri.org/';                 
			var tmpData= '<?xml version="1.0" encoding="utf-8"?>'; 
			tmpData+= '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> ';
			tmpData+= '<soap:Body> ';
			tmpData+= '<t_BOS200000000 xmlns="http://tempuri.org/"> ';                                     
			tmpData+= '<InterID>0</InterID>'; 
			tmpData+= '<BillNO>a</BillNO>';
			tmpData+= '<FBtouXMl>' + XMLStr1 + '</FBtouXMl>';  
			tmpData+= '<FBtiXML>' + XMLStr2 + '</FBtiXML> ';
			tmpData+= '</t_BOS200000000>';                   
			tmpData+= '</soap:Body>';
			tmpData+= '</soap:Envelope>';

    		//console.log( XMLStr1)
    		//console.log( XMLStr2)
    		$.ajax({
		        type: "Post",
		        url: wsdlurl,
		        data:tmpData,
		        dataType : 'xml',
		        beforeSend: function(request) {
			        request.setRequestHeader("Content-Type", "text/xml; charset=gbk");
			        request.setRequestHeader("SOAPAction", "http://tempuri.org/t_BOS200000000");
			    },
		        success: (xml)=> {
		        	this.$router.push({name:'提交成功'})
		        },
		        error: function (x, e) {
		        	this.CanWork = true
		            console.log('error:' + x.responseText);
		        },
		        complete: function (x) {
		        }
		    });
    	},
    	ChangePlan(IDX){
    		this.formTips.PlanProcess = this.planInfo[IDX].PlanProcess
	     	this.formTips.Plan = this.planInfo[IDX].Plan
	     	this.formTips.Budget = this.planInfo[IDX].Budget
	     	this.formTips.PlanSum = this.planInfo[IDX].PlanSum
    	},

    	GetProductions(){
    		var that = this;
			var method = 'JA_select';  
			//var wsdlurl = 'http://180.167.5.198:8084/Service1.asmx';
			var wsdlurl = '/api/Service1.asmx';           
			var tmpNamespace = 'http://tempuri.org/';                 
			var tmpData= '<?xml version="1.0" encoding="utf-8"?>'; 
			tmpData+= '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> ';
			tmpData+= '<soap:Body> ';
			tmpData+= '<JA_select xmlns="http://tempuri.org/"> ';                                     
			tmpData+= '<FSql>select a.fitemid,a.fname,a.f_111,a.f_107,b.fname yusuan from t_Item_3007 a left join t_item b on b.fitemid=a.f_105 where a.fitemid>0</FSql>'; 
			tmpData+= '<FTable></FTable>';                       
			tmpData+= '</JA_select>';                   
			tmpData+= '</soap:Body>';
			tmpData+= '</soap:Envelope>';

    		$.ajax({
		        type: "Post",
		        url: wsdlurl,
		        data:tmpData,
		        dataType : 'xml',
		        beforeSend: function(request) {
			        request.setRequestHeader("Content-Type", "text/xml; charset=gbk");
			        request.setRequestHeader("SOAPAction", "http://tempuri.org/JA_select");
			    },
		        success: (xml)=> {
		        	console.log('成功---')
       				var str = ''
				    var Result=xml.getElementsByTagName("JA_selectResponse")[0].getElementsByTagName("JA_selectResult")[0]
				    var HtmlStr = $(Result).html()
				    var AfterHtmlString = HtmlStr.replace(/&lt;/g,'<').replace(/&gt;/g,'>')
				    var XMLString = '<?xml version="1.0" encoding="utf-8"?>' + AfterHtmlString
				    //console.log(XMLString) 

				    //创建文档对象  
					var parser=new DOMParser();  
					var xmlDoc=parser.parseFromString(XMLString,"text/xml");  

					//提取数据  
					var PlanProcess = xmlDoc.getElementsByTagName('fname');//计划预算进度 
					var Plan = xmlDoc.getElementsByTagName('f_111');//计划 
					var Budget = xmlDoc.getElementsByTagName('yusuan'); //预算
					var PlanSum = xmlDoc.getElementsByTagName('f_107'); //计划预算额

					var arr_tips = []
					var arr_PlanProcess = []
					var arr_Plan = [];
					var arr_Budget = [];
					var arr_PlanSum = [];

					for (var i = 0; i < PlanProcess.length; i++) {  
					    arr_PlanProcess.push(PlanProcess[i].textContent);
					    arr_Plan.push(Plan[i].textContent);
					    arr_Budget.push(Budget[i].textContent);
					    arr_PlanSum.push(PlanSum[i].textContent);
					};
					arr_PlanProcess.map((item,idx)=>{
						var Obj = {
							'PlanProcess':item,//计划预算进度
							'Plan':arr_Plan[idx],//计划 
							'Budget':arr_Budget[idx],//预算
							'PlanSum':arr_PlanSum[idx],//计划预算额
						}
						arr_tips.push(Obj)
					})

					this.planInfo = arr_tips
					console.log(arr_tips)
		        },
		        error: function (x, e) {
		            console.log('error:' + x.responseText);
		        },
		        complete: function (x) {
		        }
		    });
    		
    	},
    	
      
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
		margin-bottom:2px !important;
		padding-bottom:0 !important;
	}
	.mu-form-item__has-label{
		min-height:60px !important;
	}
	.tips{
		height:40px;
		color:rgba(0,0,0,.54);
	}
	.AlertBox{
		position:fixed;
		top:50px;
	}
}

</style>
