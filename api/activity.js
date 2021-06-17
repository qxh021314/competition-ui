import $http from '../httpRequest/request.js'

function getActivityPage(params) {
	return $http.request(`/app/activity/page/${params.pageCurrent}/${params.pageSize}`, 'post', params)
}


function activityInfo(params) {
	return $http.request(`/app/activity/info/${params.id}`, 'get', params)
}

function signUpForm(params) {
	return $http.request(`/app/activity/signUp`, 'post', params)
}

export {
	getActivityPage,
	activityInfo,
	signUpForm
}