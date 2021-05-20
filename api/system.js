import $http from '../httpRequest/request.js'

// 小程序授权获取openId
function getOpenId(params) {
	return $http.request(`/wx/ma/login/${params.code}`, 'get', params)
}

export {
	getOpenId
}