import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/styles/index.less'
import 'swiper/dist/css/swiper.css'

fastclick.attach(document.body)

// Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueLazyLoad, {
  error: require('./assets/images/error.png'),
  loading: require('./assets/images/loading.gif')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
