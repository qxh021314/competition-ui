import Vue from 'vue'
import App from './App'
import $http from './httpRequest/request.js'
import $utils from './utils/index.js'
import $userService from './utils/userService.js'
import store from './store'
import config from './config'
import $code from './utils/code.js'

Vue.config.productionTip = false
Vue.prototype.$http = $http
Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$utils = $utils // 工具类
Vue.prototype.$code = $code // 编码
Vue.prototype.$userService = $userService // 用户信息

App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
