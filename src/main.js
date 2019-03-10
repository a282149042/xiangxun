import Vue from 'vue'
import vue from 'vue/dist/vue.js';
import App from './App.vue'
import router from './router'
import vueztree from 'vue-ztree-2.0/dist/vue-ztree-2.0.umd.min.js'
import 'vue-ztree-2.0/dist/vue-ztree-2.0.css'
import echarts from 'echarts'
vue.use(vueztree)
Vue.prototype.echarts = echarts
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
