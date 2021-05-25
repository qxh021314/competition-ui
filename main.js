import Vue from 'vue'
import App from './App'
import $http from './httpRequest/request.js'
import $utils from './utils/index.js'
import $userService from './utils/userService.js'
import store from './store'
import config from './config'
import uView from "uview-ui";

Vue.config.productionTip = false
Vue.use(uView); 

Vue.prototype.$http = $http
Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$utils = $utils // 工具类
Vue.prototype.$userService = $userService // 用户信息

App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
