/* eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import login from '@/pages/login/index.vue'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: "index",
      redirect: to => {
        return '/login'
      }
    },
    {
      path: '/login',
      name: "login",
      component: login
    }]
})
