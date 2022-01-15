import '@babel/polyfill'
import 'mutationobserver-shim'
// import VueBarGraph from 'vue-bar-graph'
// import BarCharts from 'vue-chartjs'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/app.scss'

Vue.config.productionTip = false
// Vue.component('VueBarGraph', VueBarGraph)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
