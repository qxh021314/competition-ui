import $userService from '@/utils/userService.js'
const userService = {
	state: {
		// 地址信息存储
		userEncryInfo: null,
		openId: '',
		sessionKey: ''
	},
	mutations: {
		SET_USER_ENCRY_INFO: (state, userEncryInfo) => {
			$userService.setUserEncryInfo(userEncryInfo);
			state.userEncryInfo = userEncryInfo
		},
		SET_OPEN_ID: (state, openId) => {
			$userService.setOpenId(openId);
			state.openId = openId
		}
	},
	actions: {}
}

export default userService
