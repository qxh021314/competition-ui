const sysService = {
	state: {
		sysCache: {} // 数据暂存区
	},
	mutations: {
		SET_SYS_CACHE: (state, sysCache) => {
			state.sysCache = sysCache
		}
	},
	actions: {}
}

export default sysService
