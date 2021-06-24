import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ThirdPart from '../views/Third_part.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/third_part_callback',
    name: 'ThirdPart',
    component: ThirdPart
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login) 强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr && to.path !== '/third_part_callback') {
    // 非登陆状态，就跳转到login页面
    return next('/login')
  }
  next()
})

export default router
