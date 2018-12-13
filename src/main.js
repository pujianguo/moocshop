import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'

// import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/styles/index.less'
import 'swiper/dist/css/swiper.css'

// Vue.use(VueAwesomeSwiper /* { default global options } */)

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
