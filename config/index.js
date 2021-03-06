const config = {
	baseUrl: 'https://match.anhuity.com.cn/api',
	// baseUrl: 'http://localhost:8889/platform-api',
	prodUrl: 'https://match.anhuity.com.cn/api',
	//接口地址
	interfaceUrl: function() {
		if (process.env.NODE_ENV === 'development') {
			return config.baseUrl; //开发环境
		} else {
			return config.prodUrl; //生产环境
		}
	},
	cdnDomain: 'https://match.anhuity.com.cn', // 静态资源地址
	debug: false
}
module.exports = config
