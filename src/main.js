import Vue from 'vue'
import echarts from 'echarts'
import App from './App.vue'
import router from './router'
import 'vue-tree-halower/dist/halower-tree.min.css'
import './assets/styles/_variable.scss'
import {VTree, VSelectTree} from 'vue-tree-halower'
Vue.use(VTree)
Vue.use(VSelectTree)

Vue.prototype.echarts = echarts
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
