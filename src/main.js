import Vue from 'vue'
import App from './App'
import router from './router'
//封装axios
import api from './utils/api.js' 
import datetime from './utils/datetime.js'
import validate from './utils/validate.js' 

Vue.config.productionTip = false

//定义全局变量$http
Vue.prototype.$http = api 

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
