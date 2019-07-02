import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import echarts from 'echarts'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {Loading} from 'element-ui'
import './assets/css/style.css'
import './../static/css/fonts/iconfont.css'

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
// Vue.config.silent = true
Vue.use(Loading.directive)
Vue.use(echarts)
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  components: { App }
})
