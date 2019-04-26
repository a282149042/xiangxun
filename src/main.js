import Vue from 'vue'
import echarts from 'echarts'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-tree-halower/dist/halower-tree.min.css'
import './assets/styles/_variable.scss'
import {VTree, VSelectTree} from 'vue-tree-halower'
Vue.use(VTree)
Vue.use(VSelectTree)
Vue.use(ElementUI)


Vue.prototype.echarts = echarts
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
