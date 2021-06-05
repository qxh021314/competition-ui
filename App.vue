<script>
	import {
		refresh
	} from '@/api/system.js'
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
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log('版本更新', res);
				console.log(res.hasUpdate);
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function() {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(result) {
								if (result.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onUpdateFailed(function() {
						// 新的版本下载失败
						uni.showModal({
							title: '已经有新版本了哟~',
							content: '新版上线,需要您删除当前小程序,重新搜索打开哟~'
						});
					});
				}
			});
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
