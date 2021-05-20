import $http from '../httpRequest/request.js'

// 查询赛事列表
function qMatchByPage(params) {
	return $http.request(`/match/qMatchByPage?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, 'get', params)
}


// 查询赛事详情
function qMatchById(params) {
	return $http.request(`/match/qMatchById?id==${params.id}`, 'get', params)
}

// 查询主题
function getApplyInfo(params) {
	return $http.request(`/match/getApplyInfo?matchId==${params.matchId}`, 'get', params)
}

// 报名
function athleteSave(params) {
	return $http.request(`/match/athlete/save`, 'post', params)
}

// 查看我的报名
function listMyMatchBySubject(params) {
	return $http.request(`/match/athlete/listMyMatchBySubject?matchId=${params.matchId}&openId=${params.openId}`, 'get', params)
}

// 编辑
function getMyApplyInfo(params) {
	return $http.request(`/match/athlete/getMyApplyInfo?matchId=${params.matchId}&openId=${params.openId}&subjectId=${params.subjectId}`, 'get', params)
}

// 选手名单
function listAthlete(params) {
	return $http.request(`/match/athlete/listAthlete?matchId=${params.matchId}&subjectId=${params.subjectId}`, 'get', params)
}

// 分组
function groupList(params) {
	return $http.request(`/match/group/list?subjectId=${params.subjectId}`, 'get', params)
}

export {
	qMatchByPage,
	qMatchById,
	getApplyInfo,
	athleteSave,
	listMyMatchBySubject,
	getMyApplyInfo,
	listAthlete,
	groupList
}