const user = {
	state: {
		// 地址信息存储
		addrList: [],
		isRequest: true
	},
	mutations: {
		SET_ADDR_LIST: (state, addrList) => {
			state.addrList = addrList
		},
		SET_IS_REQUEST: (state, isRequest) => {
			state.isRequest = isRequest
		}
	},
	actions: {
		
	}
}

export default user
