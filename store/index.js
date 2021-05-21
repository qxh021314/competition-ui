import Vue from 'vue'
import Vuex from 'vuex'
import userService from './modules/userService.js'
import livePhoto from './modules/livePhoto.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		userService,
		livePhoto
	}
})

export default store
