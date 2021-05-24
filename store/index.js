import Vue from 'vue'
import Vuex from 'vuex'
import userService from './modules/userService.js'
import livePhoto from './modules/livePhoto.js'
import news from './modules/news/index.js'
import scheme from './modules/scheme/index.js'
import sys from './modules/sys.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		userService,
		livePhoto,
		sys,
		news,
		scheme
	}
})

export default store
