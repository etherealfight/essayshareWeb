import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import homepage from '../components/Homepage/homepage'
import regist_login from '../components/Login/regist-login'
import regist from '../components/Login/regist'
import login from '../components/Login/login'
import profile from '../components/profile/profile'
import publish from '../components/Homepage/publish'
import personalPage from "../components/profile/personalPage"
import mypersonalPage from "../components/profile/mypersonalPage"

Vue.use(ElementUI)
Vue.use(VueRouter)

//定义路由
const routes = [{
    path: '/',
    redirect: '/homepage' //将根路由重定向到首页
  },
  {
    path: '/homepage',
    component: homepage, //首页
  },
  {
    path: '/regist-login',
    component: regist_login, //登录注册页面
    children: [{
        path: '/regist-login/regist',
        component: regist
      },
      {
        path: '/regist-login/login',
        component: login
      }
    ]
  },
  {
    path: '/profile',
    component: profile //个人信息页面
  },
  {
    path: '/mypersonalPage',
    component: mypersonalPage //个人主页
  },
  {
    path: '/personalPage',
    component: personalPage //他人主页
  },
  {
    path: '/publish',
    component: publish //发布文章页面
  }
]
//创建router示例
const router = new VueRouter({
  routes,
  mode: 'hash',
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router