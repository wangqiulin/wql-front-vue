import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import User from '@/components/user/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/user',
      name: '用户列表',
      component: User
    }
  ]
})
