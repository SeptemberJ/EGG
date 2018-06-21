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
import $ from 'jquery'

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
   		this.GetProductions()
   		this.formDetail.amount = this.$store.state.ChoosedProduction.amount
   		this.formDetail.unitPrice = Number(this.$store.state.ChoosedProduction.amount)>Number(this.$store.state.ChoosedProduction.amountb) ? this.$store.state.ChoosedProduction.pricep : this.$store.state.ChoosedProduction.pricel
   		this.formDetail.taxAmount = this.$store.state.TotalPrice
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
    	GetProductions(){
    		var that = this;
			var method = 'JA_select';                                     
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
			let str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:JA_select><tem:FSql>select a.fitemid,a.fname,a.ftaxrate,a.fseccoefficient,a.funitid,b.fname sup,c.fname jiliang from t_icitem a left join t_measureunit b on b.fmeasureunitid=a.fsecunitid left join t_measureunit c on c.fitemid=a.funitid where a.fitemid>0 order by a.fnumber</tem:FSql><tem:FTable>t_user</tem:FTable></tem:JA_select></soapenv:Body></soapenv:Envelope>';

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
		margin-bottom:10px !important;
		padding-bottom:0 !important;
	}
	.tips{
		height:32px;
		color:rgba(0,0,0,.54);
	}
}

</style>
