export const userMixin = {
	data() {
		return {
			openOauth: false,
			userInfoObj: null
		}
	},
	mounted() {
		// #ifdef MP-WEIXIN
		const openId = this.$userService.getOpenId();
		if (!this.$utils.isNotBlank(openId)) {
			this.openOauth = true;
		}
		// #endif
	},
	methods: {
		getSetting() {
		}
	}
}
