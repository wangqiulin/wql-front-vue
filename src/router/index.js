import Vue from 'vue'
import Router from 'vue-router'
//使用懒加载的方式来引入,只有路由被访问的时候才加载
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
});

//对每次访问之前都要先看是否已经登录
router.beforeEach((to, from, next)=>{
  if(to.path.startsWith('/login')){
    window.sessionStorage.removeItem('Authentication');
    next();
  }else{
    let token = window.sessionStorage.getItem('Authentication');
    if(!token){
      //未登录  跳回登录页面
      next({path:'/login'});
    } else {
      next();
    }
  }       
});
export default router
