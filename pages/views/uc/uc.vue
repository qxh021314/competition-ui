<template>
	<view class="wd-user">
		<view class="wd-user_back">
			<image :src="backgroundImg" mode=""></image>
		</view>
		<!-- 头像账户展示 -->
		<view class="wd-user_info">
			<view class="wd-flex">
				<view class="wd-user_img">
					<image :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/wxactaurl.png'" mode=""></image>
				</view>
			</view>
			<view class="wd-user_card">
				<view class="wd-user_phone wd-flex">
					<view class="wd-center wd-name">
						<text>{{ userInfo.nickName }}</text>
					</view>
					<!-- <view class="wd-center"> -->
					<!-- <text>账户ID:{{ phoneNumber }}</text> -->
					<!-- </view> -->
				</view>
			</view>


		</view>

		<view class="wd-user_menu">
			<view class="wd-user_select" v-for="(item, index) in menuList" :key="index" @click="navigatorTo(item)">
				<view class="wd-select_bef">
					<view class="wd-select_img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="wd-select_name"><text>{{item.name}}</text></view>
				</view>
				<view></view>
				<view class="wd-select_next">
					<u-icon name="arrow-right" color="#bebebe" size="40"></u-icon>
					<!-- <image src="@/static/next.png" mode=""></image> -->
				</view>
			</view>
		</view>


		<user-oauth v-if="userOauth"></user-oauth>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userOauth: false,
				phoneNumber: '1876738123',
				backgroundImg: 'http://www.zqgame.com.cn/picture/editorimage/attached/image/20160525/201605251464138259953.jpg',
				menuList: [{
					name: '我的资料',
					img: '/static/mydoc.png',
					url: '',
				}, {
					name: '我的活动',
					img: '/static/myact.png',
					tenderType: '11',
					url: '/package-events/views/my-activity/my-activity'
				}]
			}
		},
		computed: {
			userInfo() {
				const user = this.$userService.getUserEncryInfo()
				if (user) {
					return user
				}
				return this.$store.state.userService.userEncryInfo
			}
		},

		onHide() {
			console.log('uc-hide');
			this.userOauth = false
		},

		onShow() {
			console.log('uc-show');
			const openId = this.$userService.getOpenId();
			console.log(openId);
			// #ifdef MP-WEIXIN
			if (!this.$utils.isNotBlank(openId)) {
				this.userOauth = true
			}
			// #endif
		},

		methods: {
			navigatorTo(item) {
				if (item.url.length == 0) {
					this.$utils.toast('功能正在开发中！')
					return
				}
				switch (item.name) {
					case '订阅信息':
						uni.switchTab({
							url: item.url + `?name=${item.name}`
						})
						break;
					case '我的收藏':
						this.$store.commit('SET_TENDER_INFO', item.tenderType)
						uni.navigateTo({
							url: item.url + `?name=${item.name}`
						})
						break;
					default:
						uni.navigateTo({
							url: item.url
						})
						break;
				}
			},
			// 跳转到积分
			toIntegral() {
				console.log('00000');
				uni.navigateTo({
					url: '/pages/user/integral/integral'
				})
			},
			getUserInfoById() {
				let userInfo = this.$userService.getUserInfo()
				let params = {
					"id": userInfo.userId
				}
				this.$http.request('/user-info/info', 'post', params).then((res) => {
					if (res.code == 200) {
						let phone = res.entity.phone
						this.phoneNumber = phone ? phone : ''
					} else {
						this.$utils.toast(res.message);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wd-user {
		position: relative;

		.wd-user_back {
			position: absolute;
			width: 100%;
			height: 300rpx;
		}
	}

	.wd-user_info {
		position: relative;
		// border-bottom: 1rpx solid #f7f7f7;
		padding-bottom: 20rpx;

		// background-image: linear-gradient(to top, #ffffff 0%, $bok-color 100%);
		// border-radius: 0 0 80rpx 80rpx;
		// background-image: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2420581124,1124925735&fm=26&gp=0.jpg');
		text {
			font-size: 30rpx;
		}

		.wd-flex {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx 0;
		}

		.wd-user_phone {
			text {
				font-size: 32rpx;
				// color: #FFFFFF;
			}

			.wd-center {
				text-align: center;
				margin: 20rpx 0;
			}

			.wd-name {
				font-weight: bold;

				text {
					font-size: 35rpx;
				}
			}
		}

		.wd-user_img {
			width: 180rpx;
			height: 180rpx;

			image {
				background-color: #f9f9f9;
				border-radius: 50%;
			}
		}

		.wd-user_val {
			display: flex;
			justify-content: space-around;
			padding-top: 0;

			.wd-sc_val {
				display: inline-block;
				font-size: 38rpx;
			}

			view {
				// border: 1rpx solid #000000;
			}

			text {
				// color: #FFFFFF;
			}
		}
	}

	.wd-user_menu {
		background-color: #FFFFFF;
		margin: 10rpx 0rpx;
		// margin-top: -40rpx;
		padding: 60rpx 0;
		border-radius: 20rpx;
		box-shadow: 0rpx -10rpx 20rpx 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		margin-bottom: 100rpx;

		.wd-user_select {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f4f4f4;
			padding: 30rpx 20rpx;

			text {
				font-size: 32rpx;
			}

			.wd-select_name {
				text {
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.wd-select_bef {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.wd-select_img {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
			}

			.wd-select_next {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.wd-user_card {
		height: 250rpx;
		background-color: #ffffff;
		margin: -80rpx 40rpx 0;
		padding-top: 40rpx;
		border-radius: 30rpx;
		box-shadow: 0 10rpx 20rpx 0 rgba(0, 0, 0, 0.2);
	}

	.switch-back {
		position: absolute;
		right: 0;
		margin: 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.wd-logo {
		position: relative;
		margin-top: 100rpx;
	}
</style>
