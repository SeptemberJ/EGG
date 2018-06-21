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
		<!--栏目-->
		<mu-flex class="flex-wrapper ColumnTit" align-items="center">
			<mu-flex class="flex-demo" justify-content="start" style="width:35%;">产品名</mu-flex>
			<mu-flex class="flex-demo" justify-content="center" style="width:25%;">单价</mu-flex>
			<mu-flex class="flex-demo" justify-content="start" style="width:15%;">数量</mu-flex>
			<mu-flex class="flex-demo" justify-content="center" style="width:25%;">总价</mu-flex>
		</mu-flex>

		<!--<mu-form :model="form" class="mu-demo-form"  label-width="100">


		-->
			<div class="demo-text ProductionList">
					<mu-flex class="flex-wrapper ProductionItem" align-items="start" v-for="(Production,Idx) in productionList" :value="Production.id" :key="Production.id" >
						<mu-flex class="flex-demo GoodsName" justify-content="start" style="width:35%;" >{{Production.name}}
						</mu-flex>
						<mu-flex class="flex-demo" justify-content="start" style="width:25%;">￥{{Number(AmountList[Idx])>Number(Production.amountb) ? Production.pricep : Production.pricel}} </mu-flex>

						<mu-flex class="flex-demo" justify-content="center" style="width:15%;">
							<mu-text-field  v-model="AmountList[Idx]" style="font-size:12px;"></mu-text-field>
							</mu-form-item>
						</mu-flex>

						<mu-flex class="flex-demo" justify-content="center" style="width:25%;">￥{{Number(AmountList[Idx])>Number(Production.amountb) ? (Production.pricep * AmountList[Idx]): (Production.pricel * AmountList[Idx])}}
						</mu-flex>
					</mu-flex>
			</div>
		<!--</mu-form>-->
		<!--footer-->
		<div class="footer_price">
			<mu-flex class="flex-wrapper" align-items="center">
				<mu-flex class="flex-demo" justify-content="center" fill>￥{{TotalPrice}}</mu-flex>
				<mu-flex class="flex-demo" justify-content="center" fill @click="ToBuy">立即购买</mu-flex>
			</mu-flex>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'

  export default{
    data: function () {
      return {
      	carouselImg1:'../../../static/img/carouse_1.png',
      	carouselImg2:'../../../static/img/carouse_2.png',
     	carouselImg3:'../../../static/img/carouse_3.png',
     	carouselImg4:'../../../static/img/carouse_4.png',
     	carouselImg5:'../../../static/img/carouse_5.png',
     	tab_cur: 0,
     	productionList:[],
     	AmountList:[],
     	form: {
	        ChooseProduction: [],
	        Amount:''
	      }
      }
    },
    mounted(){
     
    },
    created() {
   	this.GetProductions()
    },
    watch: {
    	AmountList: {
			handler(newVal, oldVal) {
				this.TotalPriceChange()
			},
			deep: true //对象内部属性的监听，关键。
		}
      
    },
    computed: {
    	TotalPrice:{
            get: function () {
              return this.$store.state.TotalPrice
            },
            set: function (newValue) {
              this.$store.state.TotalPrice = newValue
            }
        },
    
    },
    components: {
      
    },
    
    methods: {
    	ChangeAmount(e){
    		console.log(e)
    	},
    	ToBuy(){
    		//console.log(this.productionList)
    		//console.log(this.AmountList);
    		this.$router.push({name:'订单信息'})
    	},
    	TotalPriceChange(){
    		let sum = 0
    		this.AmountList.map((amount,idx)=>{
    			//let total = Number(amount)>Number(this.productionList[idx].amountb) ? (this.productionList[idx].pricep * amount).toFixed(2) : (this.productionList[idx].pricel * amount).toFixed(2)
    			let total = amount > this.productionList[idx].amountb ? amount * this.productionList[idx].pricep:amount * this.productionList[idx].pricel
    			sum+=total
    			//this.productionList[idx].amount = amount
    		})

    		this.$store.commit('T_PRICE_CHANGE',{TotalPrice: sum})
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
			tmpData+= '<FSql>select a.F_103,a.F_104,a.F_105,a.fnumber,a.fitemid,a.fname,a.ftaxrate,a.fseccoefficient,a.funitid,b.fname sup,c.fname jiliang from t_icitem a left join t_measureunit b on b.fmeasureunitid=a.fsecunitid left join t_measureunit c on c.fitemid=a.funitid where a.fitemid>0 order by a.fnumber</FSql>'; 
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

					var Productions = []
					var arr_Name = [];
					var arr_Id = [];
					var arr_Price_L = [];
					var arr_Price_P = [];
					var arr_Amount = [];
					var arr_Amount_B = [];

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
					    arr_Amount_B.push(Id[i].textContent);  
					}; 

					arr_Name.map((item,idx)=>{
						var Obj = {
							'id':arr_Id[idx],
							'name':item,
							'pricel':arr_Price_L[idx],
							'pricep':arr_Price_P[idx],
							'amount':arr_Amount[idx],
							'amountb':arr_Amount_B[idx],
						}
						Productions.push(Obj)
					})

					 
					this.productionList = Productions
					this.AmountList = arr_Amount

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
	height:200px !important;
}
.mu-carousel-item{
	img{
		width:100%;
	}
}




</style>
