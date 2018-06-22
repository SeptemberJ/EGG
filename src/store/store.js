import Vue from 'vue'
import Vuex from 'vuex'
import "babel-polyfill"
import * as types from "./types.js"
import * as Storage from "../util/storage.js";
import CryptoJS from "crypto-js";
import {setCookie,getCookie} from '../util/utils'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
	    //PlainText:'柏田科技2018',
	    //IfLoading:false,  //mark loading
	    // token:localStorage.getItem("user_token"),//登录token
	    //userInfo:{
	        //username:localStorage.getItem("BT_name"),
	       // userID:localStorage.getItem("BT_id"),
	       // userType:localStorage.getItem("BT_type"),
	        //register_type:localStorage.getItem("register_type"),
	        // useravatar:localStorage.getItem("user_avatar"),
	    //},
	    //MessageCount:11,
	    //OperatorMenuCur:'首页',
	    //DeveloperMenuCur:'首页',
	    //ifLogined:getCookie('btsby_cookie')?true : false,
	    // ifLogined:(localStorage.getItem("member_id"))?true : false,
	    //loading:false,
	    activeRoute:'首页', //导航显示路由名字
	    TotalPrice:0,
	    TotalAmount:0,
	    ChoosedProduction:[],
    },
    // 公共
    comm: {
    
    },
  
	mutations:{
		[types.ROUTE_CHANGE](state,data){
		  state.activeRoute = data.activeRoute
		},
		[types.T_PRICE_CHANGE](state,data){
		  state.TotalPrice = data.TotalPrice
		},
	},
	actions: {
  	
	},
	getter: {

	}
})
export default store







