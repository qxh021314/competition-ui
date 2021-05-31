<template>
	<view>
		<!-- 用户授权页 -->
		<view class="logobac">
			<view class="img">
				<view class="logoimg">
					<image src="/static/wxlogo.png" mode=""></image>
				</view>
				<view class="title">
					<text>新瑞视界</text>
				</view>
			</view>

		</view>

		<view class="oauth-content">
			<view class="tips">申请获得以下权限</view>
			<view class="text">获得你的公开信息（昵称、头像、地区及性别）</view>
		</view>

		<view class="authorize">
			<view class="authsty">
				<view class="auth-img">
					<image src="/static/wxlogo.png" mode=""></image>
				</view>
				<button class="fontsty" withCredentials="true" lang="zh_CN" @click="allow">微信授权</button>
			</view>
		</view>
		<view class="wd-logo">
			<view class="line"></view>
			<view class="logo">
				<image src="/static/set.png" mode=""></image>
			</view>
			<view class="line"></view>
		</view>
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
		onLoad() {},
		methods: {
			allow(e) {
				uni.showLoading({
					mask: true,
					title: '请稍候...'
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 1000)
				var this_ = this
				// #ifdef MP-WEIXIN
				console.log(e);
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
				//#endif
			},
			checkLogin(code) {
				getOpenId({
					code: code
				}).then((res) => {
					uni.navigateBack({
						data: 0
					})
					this.$store.dispatch('setOpenId', res.openId);
					this.$store.dispatch('setUserToken', res.token)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.authorize {
		display: flex;
		flex-direction: column;
		align-items: center;
		// position: fixed;
		// transform: translate(-50%, -50%);
		// top: 50%;
		// left: 50%;

		.authsty {
			width: 600rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin: 20rpx 0;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.auth-img {
				position: absolute;
				width: 70rpx;
				height: 55rpx;
				margin: auto;
				left: 80rpx;
				z-index: 9;
			}

			.fontsty {
				width: 600rpx;
				font-size: 30rpx;
				margin: auto;
				background-color: #4db133;
				color: #FFFFFF;
			}
		}

		.access {
			width: 600rpx;
			display: flex;
			align-items: center;
		}

		.phone {
			background-color: #007AFF;
		}

		view {
			margin: 10rpx 0;
		}
	}

	.logobac {
		position: relative;

		.img {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 400rpx;
			padding: 40rpx 0;
			background-color: #4db133;
		}

		.title {
			margin: 40rpx 0;
			text-align: center;
			color: #FFFFFF;
			font-size: 40rpx;
		}

		.logoimg {
			width: 150rpx;
			height: 120rpx;
		}
	}

	.oauth-content {
		margin: 20px 30px;

		.tips {
			font-size: 28rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}

		.text {
			color: #828282;
		}
	}
</style>
