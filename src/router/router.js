import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Store from '../store/store'
import App from '../App'
import Index from '../page/Index/Index'

import {deviceInfo} from "../util/device"
import {setCookie,getCookie} from '../util/utils'

import {MessageChange} from "../util/utils"

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {path: '/Index', name: '首页', component: Index},
      //{path: '/Operator', name: '运营者平台', component: Operator,meta: {requireAuth: true}},
      {path:'*', redirect: '/Index'}
    ]
  }
]
const router = new VueRouter({
  routes: routes, // short for routes: routes
  //linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
  saveScrollPosition: true ,//记住页面的滚动位置 html5模式适用
  //mode: 'history',
  //ashbang: false,
  history: true
})
//登录控制
router.beforeEach((to, from, next) => {
    next();
})
//导航显示当前路由名称
router.afterEach((to, from, next) => {
  //var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  //Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
  //获取消息通知
  // MessageChange()
})
export default router
