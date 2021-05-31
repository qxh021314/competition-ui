<script>
	import {refresh} from '@/api/system.js'
	export default {
		onLaunch: function() {
			refresh({
				openId: this.$userService.getOpenId()
			}).then((res) => {
				console.log(res);
				this.$store.dispatch('setUserToken', res.token)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* uview */
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
	image {
		position: relative;
		width: 100%;
		height: 100%;
	}
	page {
		background: #f1f2f7;
		box-sizing: border-box;
	}
</style>
