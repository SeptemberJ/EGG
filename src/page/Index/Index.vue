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
		<!--tab-->
		<mu-tabs :value.sync="tab_cur"  inverse  color="teal" indicator-color="rgb(0, 150, 136)" text-color="rgba(0, 0, 0, .54)"  full-width>
			<mu-tab>零售价</mu-tab>
			<mu-tab>批发价</mu-tab>
		</mu-tabs>
		<mu-form :model="form" class="mu-demo-form"  label-width="100">
			<div class="demo-text" v-if="tab_cur === 0">
				<mu-form-item prop="ChooseProduction_L" label="" style="width:100%">
					<mu-flex class="flex-wrapper" align-items="start" v-for="(Production_L,Idx_L) in productionList_L" :value="Production_L.p_id" :key="Production_L.p_id" >
						<mu-checkbox v-model="form.ChooseProduction_L" :value="Idx_L" label=""></mu-checkbox>
						<mu-flex class="flex-demo" justify-content="start" fill>{{Production_L.p_name}}
						</mu-flex>
						<mu-flex class="flex-demo" justify-content="end" fill>{{Production_L.p_price_l}}</mu-flex>
					</mu-flex>
				</mu-form-item>
			</div>
			<div class="demo-text" v-if="tab_cur === 1">
				<mu-form-item prop="ChooseProduction_P" label="" style="width:100%">
					<mu-flex class="flex-wrapper" align-items="start" v-for="(Production_P,Idx_P) in productionList_P" :value="Production_P.p_id" :key="Production_P.p_id" >
						<mu-checkbox v-model="form.ChooseProduction_P" :value="Idx_P" label=""></mu-checkbox>
						<mu-flex class="flex-demo" justify-content="start" fill>{{Production_P.p_name}}</mu-flex>
						<mu-flex class="flex-demo" justify-content="end" fill>{{Production_P.p_price_p}}</mu-flex>
					</mu-flex>
				</mu-form-item>
			</div>
		</mu-form>
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
     	productionList_L:[
     		{'p_id':0,'p_name':'零售产品一','p_price_l':10},
     		{'p_id':1,'p_name':'零售产品二','p_price_l':20},
     		{'p_id':2,'p_name':'零售产品三','p_price_l':30}
     	],
     	productionList_P:[
     		{'p_id':0,'p_name':'批发产品一','p_price_p':11},
     		{'p_id':1,'p_name':'批发产品二','p_price_p':21},
     		{'p_id':2,'p_name':'批发产品三','p_price_p':31}
     	],
     	form: {
	        ChooseProduction_L: [],
	        ChooseProduction_P: [],
	      }
      }
    },
    mounted(){
     
    },
    created() {
   	this.GetProductions()
    },
    watch: {
    	form: {
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
    	ToBuy(){
    		this.$router.push({name:'订单信息'})
    	},
    	TotalPriceChange(){
    		let sum = 0
    		this.form.ChooseProduction_L.map((item,idx)=>{
    			sum+=this.productionList_L[item].p_price_l
    		})
    		this.form.ChooseProduction_P.map((item,idx)=>{
    			sum+=this.productionList_P[item].p_price_p
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
			tmpData+= '<FSql>select a.fitemid,a.fname,a.ftaxrate,a.fseccoefficient,a.funitid,b.fname sup,c.fname jiliang from t_icitem a left join t_measureunit b on b.fmeasureunitid=a.fsecunitid left join t_measureunit c on c.fitemid=a.funitid where a.fitemid>0 order by a.fnumber</FSql>'; 
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
		        //beforeSend: function (xhr) {
		        //   xhr.setRequestHeader('SOAPAction', 'http://tempuri.org/JA_select');
		        //},
		        success: (xml)=> {
		        	console.log('成功---')
       					var str = ''
				      var Result=xml.getElementsByTagName("JA_selectResponse")[0].getElementsByTagName("JA_selectResult")[0]
				      
				      console.log(typeof xml)      
				      //document.getElementById("userInfo").innerText=userInfo;

		        },
		        error: function (x, e) {
		            console.log('error:' + x.responseText);
		        },
		        complete: function (x) {
		            //alert('complete:'+x.responseText);
		        }
		    });
    		
    	},
    	GetProductions11(){
    		var that = this;
			var method = 'JA_select';                                     
			var wsdlurl = 'http://www.webxml.com.cn/webservices/qqOnlineWebService.asmx/qqCheckOnline';            
			var tmpNamespace = 'http://WebXml.com.cn/qqCheckOnline';                 
			var tmpData= '<?xml version="1.0" encoding="utf-8"?>'; 
			tmpData+= '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
			tmpData+= '<soap:Body> ';
			tmpData+= '<qqCheckOnline xmlns="http://WebXml.com.cn/">'; 
			tmpData+= '<qqCode>'+ 123+'</qqCode>';                       
			tmpData+= '</qqCheckOnline>';                   
			tmpData+= '</soap:Body>';
			tmpData+= '</soap:Envelope>';

			var str = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><qqCheckOnline xmlns="http://WebXml.com.cn/"><qqCode>'+666+'</qqCode></qqCheckOnline></soap:Body></soap:Envelope>'

			//console.log(tmpData)

    		$.ajax({
		        type: "Post",
		        url: API_PROXY + wsdlurl,//,'http://180.167.5.198:8084/Service1.asmx?op=JA_select',
		        data:str,
		        dataType : 'xml',//返回的数据类型
     			//processData: false,
		        contentType: "text/xml; charset=utf-8",
		        //beforeSend: function (xhr) {
		        //   xhr.setRequestHeader('SOAPAction', 'http://tempuri.org/JA_select');
		        //},
		        success: function (xml) {
		        	console.log(xml)
		        },
		        error: function (x, e) {
		            console.log('error:' + x.responseText);
		        },
		        complete: function (x) {
		            //alert('complete:'+x.responseText);
		        }
		    });
    		
    	},
    	
    	GetProductions3(){
    		$.soap({
				url: 'http://180.167.5.198:8084/Service1.asmx/',
				method: 'JA_select',

				data: {
					op: 'JA_select',
				},

				success: function (soapResponse) {
					console.log(soapResponse)
					// do stuff with soapResponse
					// if you want to have the response as JSON use soapResponse.toJSON();
					// or soapResponse.toString() to get XML string
					// or soapResponse.toXML() to get XML DOM
				},
				error: function (SOAPResponse) {
					// show error
				}
			});
    	},
    	GetProductions2(){
    		let DATA = {
    			FSql:'select a.fitemid,a.fname,a.ftaxrate,a.fseccoefficient,a.funitid,b.fname sup,c.fname jiliang from t_icitem a left join t_measureunit b on b.fmeasureunitid=a.fsecunitid left join t_measureunit c on c.fitemid=a.funitid where a.fitemid>0 order by a.fnumber',
    			FTable:''
    		}
    		axios.post(API_PROXY + 'http://180.167.5.198:8084/Service1.asmx?op=JA_select',DATA
            ).then((res)=> {
                console.log(res)
                 
            }).catch((error)=> {
                console.log(error)
               
            })
    	},
    	GetProductions5(){

			let DATA = {
    			FSql:'select a.fitemid,a.fname,a.ftaxrate,a.fseccoefficient,a.funitid,b.fname sup,c.fname jiliang from t_icitem a left join t_measureunit b on b.fmeasureunitid=a.fsecunitid left join t_measureunit c on c.fitemid=a.funitid where a.fitemid>0 order by a.fnumber',
    			FTable:'t_user'
    		}
			$.ajax({
		        type: "Post",
		        url: API_PROXY + 'http://180.167.5.198:8084/Service1.asmx?op=JA_select',
		        data:DATA,
		        dataType:'json',
     			//processData: false,
		        contentType: "application/json; charset=utf-8",
		        //beforeSend: function (xhr) {
		         //   xhr.setRequestHeader('SOAPAction', 'http://tempuri.org/JA_select');
		        //},
		        success: function (xml) {
		        	console.log(xml)
		        },
		        error: function (x, e) {
		            console.log('error:' + x.responseText);
		        },
		        complete: function (x) {
		            //alert('complete:'+x.responseText);
		        }
		    });
		}
		    	
      
    }
  }

</script>
<style lang="scss" scoped>
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

.demo-text {
  padding: 16px;
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
.flex-wrapper {
  width: 100%;
  height: 56px;
  margin-top: 8px;
}
.flex-demo {
  width: 50%;
  height: 32px;
  text-align: left;
  line-height: 32px;
  margin-left: 8px;
}
.flex-wrapper:first-child {
  margin-top: 0;
}
.flex-demo:first-child {
  margin-left: 0;
}

</style>
