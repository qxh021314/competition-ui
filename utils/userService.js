const $userService = {
	// 设置用户信息缓存
	setUserInfo: function(userInfo) {
		uni.setStorageSync('userInfo', userInfo)
	},
	getUserInfo: function() {
		return uni.getStorageSync("userInfo")
	},

	// 通过触发微信授权机制，设置授权信息相对应的信息
	setUserEncryInfo: function(userEncryInfo) {
		uni.setStorage({
			data: userEncryInfo,
			key: 'userEncryInfo'
		})
	},
	getUserEncryInfo: function() {
		return uni.getStorageSync("userEncryInfo")
	},
	//获取token
	getToken() {
		return uni.getStorageSync("user_token")
	},

	//设置token
	setToken(userToken) {
		return uni.setStorageSync("user_token", userToken)
	},
	// 获取openId
	getOpenId() {
		return uni.getStorageSync('openId');
	},
	// 设置openId
	setOpenId(openId) {
		uni.setStorage({
			key: 'openId',
			data: openId
		})
	},
	// 获取userId
	getUserId() {
		return uni.getStorageSync('userId');
	},
	// 设置userId
	setUserId(userId) {
		uni.setStorage({
			key: 'userId',
			data: userId
		})
	},
	// 获取协议阅读状态
	getReadStatus() {
		return uni.getStorageSync('readStatus');
	},
	// 设置协议阅读状态
	setReadStatus(readStatus) {
		uni.setStorage({
			key: 'readStatus',
			data: readStatus
		})
	},
	// 根据是否获取到用户信息判断是否登录
	isLogin: function() {
		return uni.getStorageSync("userInfo") ? true : false
	}
}
export default $userService
