import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import vant from '../vant.config'
import store from '../src/store/login'

import router from "./router/index.js"

Vue.config.productionTip = false
Vue.prototype.$axios=axios;
// Vue.prototype.HOME = '/api' 

axios.defaults.baseURL = '/api'  
Vue.use(vant)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
