// 配置API接口地址
var root = process.env.API

// 引用axios
var axios = require('axios')

// 自定义判断元素类型JS
function toType (obj) {
 return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
 for (var key in o) {
   if (o[key] === null) {
     delete o[key]
   }
   if (toType(o[key]) === 'string') {
     o[key] = o[key].trim()
   } else if (toType(o[key]) === 'object') {
     o[key] = filterNull(o[key])
   } else if (toType(o[key]) === 'array') {
     o[key] = filterNull(o[key])
   }
 }
 return o;
}

//api方法调用封装
function apiAxios (method, url, params, resp) {
 if (params) {
   params = filterNull(params)
 }
 axios({
   method: method,
   url: url,
   data: method === 'POST' ? params : null,
   params: method === 'GET' ? params : null,
   baseURL: root,
   withCredentials: false
 })
 .then(function (res) {
   console.log("请求地址：" + root+url +", 返回内容：");
   console.log(res.data);
   resp(res.data)
 })
 .catch(function (err) {
   let res = err.response
   if (err) {
     console.log('api error, HTTP CODE: ' + res.status);
     return;
   }
 })
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success) {
      return apiAxios('GET', url, params, success)
    },
    post: function (url, params, success) {
        return apiAxios('POST', url, params, success)
    }
}
