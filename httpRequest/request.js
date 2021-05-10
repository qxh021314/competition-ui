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
						uni.hideLoading()
					}

					if (res.data.code == 406 && !loginLock) {
						loginLock = true
						$utils.modal('提示', "您还未登录，是否前往登录", true, (result) => {
							if (result) {
								uni.navigateTo({
									url: '/pages/user/phone-login/index'
								})
							}
							loginLock = false
						})
						return
					}
					// 异常提示信息
					if (res.data.code == 0) {
						resolve(res.data)
					} else if (res.data.code == 401) {
						$utils.toast("登录信息已失效!")
					} else {
						$utils.toast(res.data.msg)
					}
				},
				fail: (res) => {
					// clearTimeout($utils.delayed)
					// $utils.delayed = null;
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

	},
	/**
	 * 统一下单请求
	 */
	payOrder: function(orderId) {
		console.log(orderId);
		return new Promise(function(resolve, reject) {
			$http.request('/app/pay/prepay', 'POST', {
				orderId: orderId,
				tradeType: 'APP'
			}).then((res) => {
				console.log(res);
				if (res.code === 0) {
					let appOrderResult = res.appOrderResult;
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: {
							"appid": appOrderResult.appId,
							"noncestr": appOrderResult.nonceStr,
							"package": appOrderResult.packageValue,
							"partnerid": appOrderResult.partnerId,
							"prepayid": appOrderResult.prepayId,
							"timestamp": appOrderResult.timeStamp,
							"sign": appOrderResult.sign
						},
						success: function(res) {
							console.log(res)
							resolve(res);
						},
						fail: function(res) {
							console.log(res)
							reject(res);
						},
						complete: function(res) {
							console.log(res)
							reject(res);
						}
					});
				} else {
					reject(res);
				}
			});
		});
	}
}

export default $http
