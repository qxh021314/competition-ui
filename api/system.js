import $http from '../httpRequest/request.js'

// 小程序授权获取openId
function getOpenId(params) {
	return $http.request(`/wx/ma/login/${params.code}`, 'get', params)
}


function aboutUs(params) {
	return $http.request('/sys/config/aboutUs', 'get', params)
}

// token刷新
function refresh(params) {
	return $http.request('/wx/ma/refresh', 'get', params)
}

// 首页banner和公告
function homeBannerInfo(params) {
	return $http.request('/sys/config/home/info', 'get', params)
}


function getAppletCode(params) {
	return $http.request(`/mp/applet/getAppletCode`, 'post', params)
}

export {
	getOpenId,
	aboutUs,
	refresh,
	homeBannerInfo,
	getAppletCode
}