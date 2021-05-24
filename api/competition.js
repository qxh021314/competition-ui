import $http from '../httpRequest/request.js'

// 查询赛事列表
function qMatchByPage(params) {
	return $http.request(`/match/qMatchByPage`, 'get', params)
}


// 查询赛事详情
function qMatchById(params) {
	return $http.request(`/match/qMatchById`, 'get', params)
}

// 查询主题
function getApplyInfo(params) {
	return $http.request(`/match/getApplyInfo`, 'get', params)
}

// 报名
function athleteSave(params) {
	return $http.request(`/match/athlete/save`, 'post', params)
}

// 保存
function athleteSaveBefore(params) {
	return $http.request(`/match/athlete/saveBefore`, 'post', params)
}

// 查看我的报名
function listMyMatchBySubject(params) {
	return $http.request(`/match/athlete/listMyMatchBySubject`, 'get', params)
}

// 编辑
function getMyApplyInfo(params) {
	return $http.request(`/match/athlete/getMyApplyInfo`, 'get', params)
}

// 选手名单
function listAthlete(params) {
	return $http.request(`/match/athlete/listAthlete`, 'get', params)
}

// 分组
function groupList(params) {
	return $http.request(`/match/group/list`, 'get', params)
}

// 相册列表
function qLivePhotoListByPage(params) {
	return $http.request(`/photo/album/page/${params.pageNum}/${params.pageSize}`, 'post', params)
}

// 相册详情
function qLivePhotoDetailByPage(params) {
	return $http.request(`/match/photo/page/${params.pageNum}/${params.pageSize}`, 'post', params)
}

// 相册浏览量
function getLivePhotoBrowse(params) {
	return $http.request(`/photo/album/browse/${params.id}`, 'get', params)
}

// 相册图片点赞
function getLivePhotoLike(params) {
	return $http.request(`/match/photo/like/${params.id}`, 'get', params)
}

// 头像上传
function uploadHeadPic(params) {
	return `/match/photo/searchFace/${params.id}`
}

// 团队的分组导航
function arrangeList(params) {
	return $http.request(`/match/arrange/list`, 'get', params)
}

// 团队下选手的列表，用于分组的
function listAthleteByTeam(params) {
	return $http.request(`/match/athlete/listAthleteByTeam`, 'get', params)
}

// 我的报名列表
function listMyMatch(params) {
	return $http.request(`/match/listMyMatch`, 'get', params)
}
// 我的报名列表
function arrangeSave(params) {
	return $http.request(`/match/arrange/save`, 'post', params)
}

// 分组
function stageList(params) {
	return $http.request(`/match/stage/list`, 'get', params)
}

function resultList(params) {
	return $http.request(`/match/result/list`, 'get', params)
}

// /match/result/getDetail?subjectId=1394899244638289922&id=13
function getEnventsDetail(params) {
	return $http.request(`/match/result/getDetail`, 'get', params)
}

export {
	qMatchByPage,
	qMatchById,
	getApplyInfo,
	athleteSave,
	listMyMatchBySubject,
	getMyApplyInfo,
	listMyMatch,
	listAthlete,
	groupList,
	qLivePhotoListByPage,
	qLivePhotoDetailByPage,
	getLivePhotoBrowse,
	getLivePhotoLike,
	uploadHeadPic,
	arrangeList,
	arrangeSave,
	listAthleteByTeam,
	athleteSaveBefore,
	stageList,
	resultList,
	getEnventsDetail
}
