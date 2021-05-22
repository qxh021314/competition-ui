import Vue from 'vue'
import Vuex from 'vuex'
import userService from './modules/userService.js'
import livePhoto from './modules/livePhoto.js'
import news from './modules/news/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		userService,
		livePhoto,
		news
	}
})

export default store
