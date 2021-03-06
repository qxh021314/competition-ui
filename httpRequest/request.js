/**
 * 请求接口进行封装处理
 * @author wdd.
 **/
import $utils from '../utils/index.js'
import $Store from '../store/index.js'
import $userService from '../utils/userService.js'
import config from '../config/index.js'
var loginLock = false

const $http = {
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param bool isDelay 是否延迟显示loading
	 * @param bool isJson 数据格式
	 *  false: 'application/x-www-form-urlencoded'
	 *  true:'application/json'
	 * @param bool hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: function(url, method, postData, isJson = true, hideLoading = false) {
		//接口请求
		let loadding = false;
		// $utils.delayed && uni.hideLoading();
		// clearTimeout($utils.delayed);
		// $utils.delayed = null;
		if (!hideLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...',
				success(res) {
					loadding = true
				}
			})
		}
		var toUrl = config.interfaceUrl() + url
		if (url.indexOf('http') === 0) {
			toUrl = url
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: toUrl,
				data: postData,
				header: {
					'content-type': isJson ? 'application/json' :
						'application/x-www-form-urlencoded',
					'token': $userService.getToken()
				},
				method: method, //'GET','POST'
				dataType: 'json',
				timeout: 5000,
				success: (res) => {
					// clearTimeout($utils.delayed)
					// $utils.delayed = null;
					if (!hideLoading) {
						setTimeout(() => {
							uni.hideLoading()
						}, 500)
					}

					if (res.data.code == 401 && !loginLock) {
						loginLock = true
						$utils.modal('提示', "您还未登录，是否前往登录", true, (result) => {
							if (result) {
								uni.navigateTo({
									url: '/package-events/views/authorize/authorize'
								})
							}
							loginLock = false
						})
						return
					}
					// 异常提示信息
					if (res.data.code == 0) {
						resolve(res.data)
					} else {
						$utils.toast(res.data.msg)
					}
				},
				fail: (res) => {
					// clearTimeout($utils.delayed)
					// $utils.delayed = null;
					console.log(res);
					$utils.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string path 文件路径
	 */
	uploadFile: function(url, path) {
		uni.showLoading({
			title: '请稍候...'
		})
		var url = config.interfaceUrl() + url
		return new Promise((resolve, reject) => {
			console.log(url);
			const uploadTask = uni.uploadFile({
				url: url,
				filePath: path,
				name: 'file',
				fileType: 'image',
				header: {
					"Content-Type": "multipart/form-data",
					'token': $userService.getToken()
				},
				success: function(res) {
					console.log(res.data.fileId);
					var resJson = JSON.parse(res.data)
					resolve(resJson)
					uni.hideLoading()
				},
				fail: function(res) {
					console.log(res);
					$utils.toast("图片上传失败！")
					reject(res)
				}
			})
		})
	},

	/**
	 * @param {Object} url
	 * @param {Object} src
	 */
	downloadFile: function(url) {

	}
}

export default $http
