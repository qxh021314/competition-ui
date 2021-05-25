const config = {
	baseUrl: 'https://match.anhuity.com.cn/api',
	prodUrl: 'https://match.anhuity.com.cn/api',
	//接口地址
	interfaceUrl: function() {
		if (process.env.NODE_ENV === 'development') {
			return config.baseUrl; //开发环境
		} else {
			return config.prodUrl; //生产环境
		}
	},
	debug: false
}
module.exports = config
