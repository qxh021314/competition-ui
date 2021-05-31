import $userService from '@/utils/userService.js'
const userService = {
	state: {
		userEncryInfo: {},
		openId: '',
		sessionKey: '',
		user_token: ''
	},
	mutations: {
		SET_USER_ENCRY_INFO: (state, userEncryInfo) => {
			$userService.setUserEncryInfo(userEncryInfo);
			state.userEncryInfo = userEncryInfo
		},
		SET_OPEN_ID: (state, openId) => {
			state.openId = openId
		},
		SET_USER_TOKEN: (state, token) => {
			state.user_token = token
		}
	},
	actions: {
		setOpenId({
			commit
		}, openId) {
			$userService.setOpenId(openId);
			commit('SET_OPEN_ID', openId)
		},
		setUserToken({
			commit
		}, token) {
			$userService.setToken(token);
			commit('SET_USER_TOKEN', token)
		}
	}
}

export default userService
