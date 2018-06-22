<template>
	<div>
		<!--轮播-->
		<mu-carousel :interval='3000'>
		  <mu-carousel-item>
		    <img :src="carouselImg1">
		  </mu-carousel-item>
		  <mu-carousel-item>
		    <img :src="carouselImg2">
		  </mu-carousel-item>
		  <mu-carousel-item>
		    <img :src="carouselImg3">
		  </mu-carousel-item>
		   <mu-carousel-item>
		    <img :src="carouselImg4">
		  </mu-carousel-item>
		   <mu-carousel-item>
		    <img :src="carouselImg5">
		  </mu-carousel-item>
		</mu-carousel>
		<!--tab
		<mu-tabs :value.sync="tab_cur"  inverse  color="teal" indicator-color="rgb(0, 150, 136)" text-color="rgba(0, 0, 0, .54)"  full-width>
			<mu-tab>零售价</mu-tab>
			<mu-tab>批发价</mu-tab>
		</mu-tabs>
		style="background:3498db;"
		-->
		
		<mu-card style="width: 100%;">
			<mu-card-title title="产品介绍" :sub-title="ChoosedProduct.fnote == ''? '暂无介绍':ChoosedProduct.fnote"></mu-card-title>
		</mu-card>
			
		<mu-container class="ProductInfo">
			<mu-row gutter>
				<mu-flex class="" justify-content="start" align-items="center" style="width:100%;">
					<mu-col span="4">
						产品
					</mu-col>
					<mu-col span="8">
						<mu-select label="" v-model="ChoosedProduct.name" full-width @change="ChangeProduct">
							<mu-option v-for="(Production,Idx) in productionList" :key="Idx" :label="Production.name" :value="Idx"></mu-option>
						</mu-select>
					</mu-col>
				</mu-flex>
			</mu-row>
			<!--
			<mu-row gutter>
				<mu-flex class="" justify-content="start" align-items="center" style="width:100%;">
					<mu-col span="4">
						零售价
					</mu-col>
					<mu-col span="8">
						<mu-text-field v-model="ChoosedProduct.pricel" disabled placeholder=""></mu-text-field>
					</mu-col>
				</mu-flex>
			</mu-row>
			<mu-row gutter>
				<mu-flex class="" justify-content="start" align-items="center" style="width:100%;">
					<mu-col span="4">
						批发价
					</mu-col>
					<mu-col span="8">
						<mu-text-field v-model="ChoosedProduct.pricep" disabled placeholder=""></mu-text-field>
					</mu-col>
				</mu-flex>
			</mu-row>
			-->
			<mu-row gutter>
				<mu-flex class="" justify-content="start" align-items="center" style="width:100%;">
					<mu-col span="4">
						输入数量
					</mu-col>
					<mu-col span="8">
						<mu-text-field type="number" v-model="Amount"  placeholder="请输入数量"></mu-text-field>
					</mu-col>
				</mu-flex>
			</mu-row>
			<mu-row gutter v-if="Amount>0">
				<mu-flex class="" justify-content="start" align-items="center" style="width:100%;">
					<mu-col span="4">
						单价
					</mu-col>
					<mu-col span="8">
						<mu-text-field  disabled placeholder="" :value="Number(Amount)>Number(ChoosedProduct.amountb) ? ChoosedProduct.pricep: ChoosedProduct.pricel"></mu-text-field>
					</mu-col>
				</mu-flex>
			</mu-row>
			<!--
			<mu-row gutter>
				<mu-flex class="" justify-content="start" align-items="center" style="width:100%;">
					<mu-col span="4" class="colorRed">
						合计
					</mu-col>
					<mu-col span="8" class="TextRight colorRed">
						￥ {{Amount}} x {{Number(Amount)>Number(ChoosedProduct.amountb) ? ChoosedProduct.pricep: ChoosedProduct.pricel}} = {{Total}}
					</mu-col>
				</mu-flex>
			</mu-row>
			-->
		</mu-container>

		
		<!--footer-->
		<div class="footer_price">
			<mu-flex class="flex-wrapper" align-items="center">
				<mu-flex class="flex-demo" justify-content="center" fill>￥{{Total}}</mu-flex>
				<mu-flex class="flex-demo" justify-content="center" fill @click="ToBuy">立即购买</mu-flex>
			</mu-flex>
		</div>
		<mu-dialog title="提示" width="360" :open.sync="openSimple">
		    {{TxtTips}}
		    <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">确定</mu-button>
		 </mu-dialog>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'

  export default{
    data: function () {
      return {
      	TxtTips:'请选择产品并填入需要的数量!',
      	openSimple: false,
      	carouselImg1:'../../../static/img/carouse_1.png',
      	carouselImg2:'../../../static/img/carouse_2.png',
     	carouselImg3:'../../../static/img/carouse_3.png',
     	carouselImg4:'../../../static/img/carouse_4.png',
     	carouselImg5:'../../../static/img/carouse_5.png',
     	tab_cur: 0,
     	productionList:[],
     	Amount:0,
     	Total:0.00,
     	ChoosedProduct:{
     		'name':'',
     		'pricel':0,
     		'pricep':0,
     		'amount':'',
     		'amountb':0,
     		'fnote':''
     	},
      }
    },
    mounted(){
     
    },
    created() {
   		this.GetProductions()
    },
    watch: {
		Amount: {
			handler(newVal, oldVal) {
				this.TotalPrice()
				this.$store.state.TotalAmount= newVal
			},
			deep: true
		},
      
    },
    computed: {
    
    },
    components: {
      
    },
    
    methods: {
    	openSimpleDialog () {
	      this.openSimple = true;
	    },
	    closeSimpleDialog () {
	      this.openSimple = false;
	    },
    	TotalPrice(){
    		this.Total = Number(this.Amount)>Number(this.ChoosedProduct.amountb) ? (this.ChoosedProduct.pricep * this.Amount).toFixed(2): (this.ChoosedProduct.pricel * this.Amount).toFixed(2)
    		this.$store.state.TotalPrice= this.Total
    	},
    	ChangeProduct(IDX){
    		this.ChoosedProduct = {
	     		'name':this.productionList[IDX].name,
	     		'pricel':this.productionList[IDX].pricel,
	     		'pricep':this.productionList[IDX].pricep,
	     		'amount':this.Amount,
	     		'amountb':this.productionList[IDX].amountb,
	     		'fnote':this.productionList[IDX].fnote,
	     		'ftaxrate':this.productionList[IDX].ftaxrate,
     		}
     		this.TotalPrice()
     		this.$store.state.ChoosedProduction = this.ChoosedProduct
    	},
    	ToBuy(){
    		if(this.Total <= 0){
    			this.openSimpleDialog()
    			return false
    		}
    		this.$router.push({name:'订单信息'})
    	},
    	GetProductions(){
    		var that = this;
			var method = 'JA_select';                                     
			var wsdlurl = '/api/Service1.asmx';//'http://180.167.5.198:8084/Service1.asmx';            
			var tmpNamespace = 'http://tempuri.org/';                 
			var tmpData= '<?xml version="1.0" encoding="utf-8"?>'; 
			tmpData+= '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> ';
			tmpData+= '<soap:Body> ';
			tmpData+= '<JA_select xmlns="http://tempuri.org/"> ';                                     
			tmpData+= '<FSql>select a.fnote,a.F_103,a.F_104,a.F_105,a.fnumber,a.fitemid,a.fname,a.ftaxrate,a.fseccoefficient,a.funitid,b.fname sup,c.fname jiliang from t_icitem a left join t_measureunit b on b.fmeasureunitid=a.fsecunitid left join t_measureunit c on c.fitemid=a.funitid where a.fitemid>0 and a.F_103>0 order by a.fnumber</FSql>'; 
			tmpData+= '<FTable>t_user</FTable>';                       
			tmpData+= '</JA_select>';                   
			tmpData+= '</soap:Body>';
			tmpData+= '</soap:Envelope>';
			let str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:JA_select><tem:FSql>select a.fitemid,a.fname,a.ftaxrate,a.fseccoefficient,a.funitid,b.fname sup,c.fname jiliang from t_icitem a left join t_measureunit b on b.fmeasureunitid=a.fsecunitid left join t_measureunit c on c.fitemid=a.funitid where a.fitemid>0 order by a.fnumber</tem:FSql><tem:FTable>t_user</tem:FTable></tem:JA_select></soapenv:Body></soapenv:Envelope>';

    		$.ajax({
		        type: "Post",
		        url: wsdlurl,
		        data:tmpData,
		        dataType : 'xml',//返回的数据类型
     			//contentType :'application/soap+xml;charset=UTF-8',
		        //contentType: "text/xml; charset=utf-8",
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
					var Name = xmlDoc.getElementsByTagName('fname');//商品名称 
					var Id = xmlDoc.getElementsByTagName('fitemid');//商品id 
					var Price_L = xmlDoc.getElementsByTagName('F_103'); //零售单价
					var Price_P = xmlDoc.getElementsByTagName('F_104'); //批发价
					var Amount_B = xmlDoc.getElementsByTagName('F_105'); //价量
					var Fnote = xmlDoc.getElementsByTagName('fnote'); //介绍
					var Ftaxrate = xmlDoc.getElementsByTagName('ftaxrate'); //税率

					
					

					var Productions = []
					var arr_Name = [];
					var arr_Id = [];
					var arr_Price_L = [];
					var arr_Price_P = [];
					var arr_Amount = [];
					var arr_Amount_B = [];
					var arr_Fnote = [];
					var arr_Ftaxrate = [];

					for (var i = 0; i < Name.length; i++) {  
					    arr_Name.push(Name[i].textContent); 
					    arr_Amount.push(0);   
					};
					for (var i = 0; i < Id.length; i++) {  
					    arr_Id.push(Id[i].textContent);  
					}; 
					for (var i = 0; i < Price_L.length; i++) {  
					    arr_Price_L.push(Price_L[i].textContent);  
					}; 
					for (var i = 0; i < Price_P.length; i++) {  
					    arr_Price_P.push(Price_P[i].textContent);  
					}; 
					for (var i = 0; i < Amount_B.length; i++) {  
					    arr_Amount_B.push(Amount_B[i].textContent);  
					}; 
					for (var i = 0; i < Fnote.length; i++) {  
					    arr_Fnote.push(Fnote[i].textContent);  
					};
					for (var i = 0; i < Ftaxrate.length; i++) {  
					    arr_Ftaxrate.push(Ftaxrate[i].textContent);  
					};

					arr_Name.map((item,idx)=>{
						var Obj = {
							'id':arr_Id[idx],
							'name':item,
							'pricel':arr_Price_L[idx],
							'pricep':arr_Price_P[idx],
							'amount':arr_Amount[idx],
							'amountb':arr_Amount_B[idx],
							'fnote':arr_Fnote[idx],
							'ftaxrate':arr_Ftaxrate[idx],
						}
						Productions.push(Obj)
					})
					console.log(arr_Fnote)
					 
					this.productionList = Productions

					console.log(this.productionList);



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
.ProductInfo{
	margin-top:10px;
	background:#fff;
}


.ColumnTit {
  width: 100%;
  height: 56px;
  margin-top: 8px;
  padding:0 8px;
}

.footer_price{
	width:100%;
	height:42px;
	background:#fff;
	position:fixed;
	left:0;
	bottom:0;
	.flex-demo{
		height:100% !important;
		line-height:42px;
	}
	.flex-demo:first-child{
		color:orange;
	}
	.flex-demo:last-child{
		background:orange;
		color:#fff;
	}

}
.ProductionList{
	margin-bottom:50px;
	font-size:12px;
	.ProductionItem{
		margin-bottom:5px;
		max-height:80px;
		.mu-input{
			margin-top:-10px;
			padding-top:0px !important;
		}
		.GoodsName{
			overflow:hidden;
		}
		.flex-demo23{
			width:100px;
			min-height: 40px;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
}


.demo-text {
  padding: 16px 8px;
  background: #fff;
  p {
    margin: 8px 0;
  }
}
.mu-carousel{
	height:250px !important;
}
.mu-carousel-item{
	img{
		width:100%;
		height:auto;
	}
}




</style>
