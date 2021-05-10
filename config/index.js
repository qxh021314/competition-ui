const config = {
	baseUrl: 'http://xinrui.liliudong.com/platform-api',
	prodUrl: 'http://xinrui.liliudong.com/platform-api',
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
