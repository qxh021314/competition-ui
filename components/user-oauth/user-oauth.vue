<template>
	<view>
		<!-- 授权弹窗 -->
		<u-popup v-model="openOauth" mode="center" border-radius="10">
			<view class="oauth">
				<view class="oauth--title u-border-bottom">微信授权</view>
				<view class="oauth--content">
					<view class="oauth--content_tips">申请获得以下权限</view>
					<view class="oauth--content_text">获得你的公开信息（昵称、头像、地区及性别）</view>
				</view>
				<view class="oauth--option u-border-top">
					<view class="oauth--option_btn">
						<button class="oauth--option_back" @click="reFuseUserInfo">拒绝</button>
					</view>
					<view class="oauth--option_btn oauth--option_confirm">
						<button @click="getUserInfo()">允许</button>
				<!-- 		<button type="success" open-type="getUserInfo" withCredentials="true" lang="zh_CN"
							@getuserinfo="getUserInfo">允许</button> -->
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getOpenId
	} from '@/api/system.js'
	export default {
		data() {
			return {
				openOauth: false,
				userInfoObj: null,
				userInfo: null,
				encryptedDataUser: null,
				ivUser: null,
				wxCode: ''
			};
		},
		mounted() {
			// #ifdef MP-WEIXIN
			const openId = this.$userService.getOpenId();
			if (!this.$utils.isNotBlank(openId)) {
				this.openOauth = true
			}
			// #endif
		},
		methods: {
			getUserInfo(e) {
				console.log(e);
				this.openOauth = false
				uni.getUserProfile({
					desc: 'Wexin', // 这个参数是必须的
					success: res => {
						console.log(res)
						if (res.userInfo) {
							this.userInfo = res.userInfo;
							this.encryptedDataUser = res.encryptedData
							this.ivUser = res.iv
							this.$store.commit('SET_USER_ENCRY_INFO', this.userInfo)
							// 鉴权
							uni.login({
								provider: "weixin",
								success: (res) => {
									this.wxCode = res.code
									this.checkLogin(res.code)
								}
							});
						}
					},
					fail: err => {
						console.log(err)
					}
				})

				// #ifdef MP-WEIXIN
				// uni.getProvider({
				// 	service: 'oauth',
				// 	success: function(res) {
				// 		console.log(res);
				// 		if (~res.provider.indexOf('weixin')) {
				// 			this_.toLogin()
				// 		} else {
				// 			uni.showToast({
				// 				title: '请先安装微信或升级版本',
				// 				icon: "none"
				// 			});
				// 		}
				// 	}
				// });
				//#endif
			},
			// 用户信息从微信获取，并调后端接口获取相应信息
			toLogin() {
				var this_ = this
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uni.getUserInfo({
							provider: 'weixin',
							success: (info) => {
								console.log(info);
							},
							fail: () => {
								uni.showToast({
									title: "微信登录授权失败",
									icon: "none"
								});
							}
						})
					},
					fail: () => {
						uni.showToast({
							title: "微信登录授权失败",
							icon: "none"
						});
					}
				})
			},
			reFuseUserInfo(e) {
				this.openOauth = false
			},
			showOauth() {
				this.openOauth = true
			},
			checkLogin(code) {
				getOpenId({
					code: code
				}).then((res) => {
					 this.$store.dispatch('setOpenId', res.openId);
					 this.$store.dispatch('setUserToken', res.token)
					// this.$store.commit('SET_OPEN_ID', res.openId)
				})
			}
		}
	}
</script>

<style lang="scss">
	.oauth {
		&--title {
			text-align: center;
			font-weight: bold;
			font-size: 34rpx;
			padding: 35rpx 0;
		}

		&--content {
			margin: 50rpx 20rpx;

			&_tips {
				margin: 20rpx 0;
				font-size: 35rpx;
				letter-spacing: 3rpx;
			}

			&_text {
				letter-spacing: 3rpx;
			}
		}

		&--option {
			display: flex;

			&_btn {
				flex: 1;

				/* #ifndef MP-WEIXIN */
				uni-button {
					border-radius: 0;
					background-color: #FFFFFF;
				}

				uni-button:after {
					border-radius: 0;
					border: none;
				}

				/* #endif */
				/* #ifdef MP-WEIXIN */
				button {
					border-radius: 0;
					background-color: #FFFFFF;
				}

				button:after {
					border-radius: 0;
					border: none;
				}

				/* #endif */
			}

			&_confirm {

				/* #ifdef MP-WEIXIN */
				button {
					background-color: #09BB07;
					color: #FFFFFF;
				}

				/* #endif */

				/* #ifndef MP-WEIXIN */
				uni-button {
					background-color: #09BB07;
					color: #FFFFFF;
				}

				/* #endif */
			}
		}
	}
</style>
