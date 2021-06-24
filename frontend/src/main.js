import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 配置导入axios
import axios from 'axios'
// 配置发起请求的根路径
axios.defaults.baseURL = 'https://arkid.demo.longguikeji.com/siteapi/v1/ucenter/'
// 拦截器添加token header
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在最后必须 return config
//   return config
// })
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
