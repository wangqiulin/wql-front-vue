import Vue from 'vue'
import App from './App'
import router from './router'
//引入elemen-u控件,  npm i element-ui -S
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-chalk/index.css'
//封装axios
import Api from './api/api.js'   

Vue.config.productionTip = false
//使用use命令后才起作用
Vue.use(ElementUI)

//定义全局变量$http
Vue.prototype.$http=Api

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
