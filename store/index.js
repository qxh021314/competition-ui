import Vue from 'vue'
import Vuex from 'vuex'
import userService from './modules/userService.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		userService
	}
})

export default store
