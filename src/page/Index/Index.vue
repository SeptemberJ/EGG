<template>
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
      }
    },
    mounted(){
     
    },
   created() {
   	this.GetProductions()
   },
   computed: {
    
   },
    components: {
      
    },
    
    methods: {
    	GetProductions2(){
    		var that = this;
			var method = 'JA_select';                                     
			var wsdlurl = 'http://180.167.5.198:8084/Service1.asmx';            
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

			console.log(tmpData)

    		$.ajax({
		        type: "Post",
		        url: API_PROXY + 'http://180.167.5.198:8084/Service1.asmx?op=JA_select',
		        data:tmpData,
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
    	GetProductions(){
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

</style>
