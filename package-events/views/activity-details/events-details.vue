<template>
	<view>
		<!-- 公告 -->
		<view class="envent-notice">
			<u-notice-bar mode="horizontal" bgColor="#ffffff" :list="textList"></u-notice-bar>
		</view>

		<view class="zit-banner">
			<u-swiper bgColor="#ffffff" name="pic" height="300" :list="recordObj.matchBannerList" :effect3d="true"
				effect3d-previous-margin="40" @click="bannerToDetails"></u-swiper>
		</view>

		<view class="scheme">
			<view class="scheme--intro_menu">
				<view class="scheme--intro_menu_icon" v-for="(item, index) in objList" :key="index"
					@click="toHref(item)">
					<u-icon :name="item.icon" size="70"></u-icon>
					<text class="scheme--intro_menu_text">{{item.name}}</text>
				</view>
			</view>

			<!-- 赛事简介 -->
			<view class="scheme--intro">
				<view class="scheme--intro_title">
					<u-section font-size="35" title="赛事简介" :right="false"></u-section>
				</view>
				<view class="scheme--intro_content">{{recordObj.matchDesc}}</view>
			</view>

			<!-- 赛事报名 -->
			<view class="scheme--intro">
				<view class="scheme--intro_title">
					<u-section font-size="35" title="赛事报名" :right="false"></u-section>
				</view>
				<view class="scheme--intro_content">
					{{recordObj.matchApply}}
				</view>
				<view class="scheme--intro_btn">
					<view class="scheme--intro_btn_icon" @click="toRegister()">
						<!-- <u-icon name="file-text" size="50"></u-icon> -->
						<text class="scheme--intro_btn_text">立即报名</text>
					</view>
				</view>
			</view>
			
			<u-cell-group>
				<u-cell-item icon="tags" title="疫情防控小贴士" @click="toTips()"></u-cell-item>
			</u-cell-group>

			<u-popup v-model="registeShow" mode="center" width="85%" border-radius="10" :closeable="true">
				<view class="user-register">
					<view class="user-register_title">绑定</view>
					<!-- <view class="user-register_msg">提示</view> -->
					<u-form :model="bindForm" ref="uForm" label-width="180" :label-style="labelStyle">
						<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="姓名" prop="userName">
							<u-input v-model="bindForm.userName" type="text" placeholder="请输入姓名" />
						</u-form-item>
						<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="手机号码" prop="userName">
							<u-input v-model="bindForm.phoneNo" type="text" placeholder="请输入手机号码" maxlength="11" />
						</u-form-item>
						<u-form-item :leftIconStyle="leftIconStyle" label="身份证号码" prop="userName">
							<u-input v-model="bindForm.idCard" type="text" placeholder="请输入身份证" />
						</u-form-item>
					</u-form>
					<view class="user-register_btn" @click="registerUser()">
						确定
					</view>

				</view>
			</u-popup>
		</view>
		<user-oauth></user-oauth>
	</view>
</template>

<script>
	import {
		qMatchById,
		setMatchAuth,
		enabling
	} from '@/api/competition.js'
	export default {
		data() {
			return {
				labelStyle: {
					padding: '0'
				},
				leftIconStyle: {
					color: '#ff0000',
					fontSize: '32rpx'
				},
				listBanner: [],
				paramsId: '',
				recordObj: {},
				objList: [{
						name: '签位表',
						icon: '/static/thedraw.png',
						menuUrl: '/package-events/views/group-stage/index'
					},
					{
						name: '选手名单',
						icon: '/static/roster.png',
						menuUrl: '/package-events/views/players/players'
					},
					{
						name: '赛事章程',
						icon: '/static/constitution.png',
						menuUrl: '/package-events/views/constitution/constitution'
					},
					{
						name: '赛事相册',
						icon: '/static/photoalbum.png',
						menuUrl: '/package-events/views/livephoto/list'
					},
					{
						name: '场次',
						icon: '/static/screening.png',
						menuUrl: '/package-events/views/screening/screening'
					},
					{
						name: '认证',
						icon: '/static/approve.png',
						menuUrl: '',
						type: 'xxrz'
					}
				],
				bindForm: {
					matchId: '',
					openId: '',
					userName: '',
					idCard: '',
					phoneNo: ''
				},
				registeShow: false,
				textList: []
			}
		},
		onLoad(options) {
			if (options.query) {
				this.paramsId = options.query.scene
			}
			if (options.id) {
				this.paramsId = options.id
			}
			this.setenabling()
			this.getqMatchById()
		},
		methods: {

			getqMatchById() {
				qMatchById({
					id: this.paramsId
				}).then((res) => {
					this.recordObj = res.record
					this.textList.push(res.record.matchNotice)
				})
			},

			setenabling() {
				enabling({
					"openId": this.$userService.getOpenId(),
					"matchId": this.paramsId
				}).then((res) => {
					console.log(res);
				})
			},

			toHref(item) {

				if (item.type && item.type == 'xxrz') {
					this.registeShow = true
				} else {
					uni.navigateTo({
						url: item.menuUrl + `?id=${this.paramsId}`
					})
				}

			},

			// 疫情防护小贴士
			toTips() {
				uni.navigateTo({
					url: `/package-events/views/tips/tips`
				})
			},

			toRegister() {
				uni.navigateTo({
					url: `/package-events/views/activity-details/subject?matchId=${this.paramsId}`
				})
			},

			// 选手认证
			registerUser() {
				this.bindForm.openId = this.$userService.getOpenId()
				this.bindForm.matchId = this.paramsId
				let rules = {
					matchId: '',
					openId: '',
					userName: '',
					phoneNo: ''
				}
				if (!this.$utils.isPhone(this.bindForm.phoneNo)) {
					this.$utils.toast('手机号码有误！')
					return
				}
				if (this.$utils.isNotBlank(this.bindForm.idCard) && !this.$utils.identityCodeValid(this.bindForm.idCard)) {
					this.$utils.toast('身份证号码有误！')
					return
				}
				this.$utils.verify(this.bindForm, rules).then((valid) => {
					if (valid) {
						setMatchAuth(this.bindForm).then((res) => {
							this.registeShow = false
							this.bindForm.idCard = ''
							this.bindForm.userName = ''
						})
					}
				})
			},

			bannerToDetails() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.envent-notice {}

	.zit-banner {
		margin: 20rpx 0;
	}

	.scheme {
		margin: 0 20rpx;

		&--title {
			text-align: center;
			font-size: 35rpx;
			font-weight: bold;
			padding: 20rpx 0;
		}

		&--intro {
			margin: 40rpx 0;

			&_title {
				margin: 20rpx 0;
				font-size: 35rpx;
				font-weight: bold;
			}

			&_content {
				line-height: 50rpx;
				letter-spacing: 3rpx;
			}

			&_menu {
				display: flex;
				align-items: center;
				margin: 20rpx 0;
				flex-wrap: wrap;

				&_icon {
					flex: 0 0 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					// background-color: rgba($color: $global-color, $alpha: 0.2);
					border-radius: 50%;
					padding: 15rpx;
				}

				&_text {
					font-size: 20rpx;
					margin-top: 10rpx;
				}
			}

			&_btn {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 20rpx 0;

				&_icon {
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: rgba($color: $global-color, $alpha: 1);
					border-radius: 10rpx;
					width: 100%;
					padding: 20rpx 145rpx;
					color: #FFFFFF;
				}

				&_text {
					font-size: 30rpx;
					margin-top: 10rpx;

				}
			}
		}
	}

	.user-register {

		padding: 50rpx 30rpx;

		&_title {
			color: $global-color;
			font-size: 35rpx;
			font-weight: bold;
			margin: 20rpx 0;
		}

		&_msg {
			background-color: #fce4e6;
			color: #7e7e7e;
			padding: 20rpx;
			border-radius: 10rpx;
		}

		&_form {
			display: flex;
			align-items: center;
			margin: 20rpx 0;
			font-size: 34rpx;

			&_name {
				margin: 20rpx 0;
				width: 150rpx;
			}

			&_inp {
				flex: 1;
			}
		}

		&_btn {
			margin-top: 40rpx;
			background-color: $global-color;
			color: #FFFFFF;
			text-align: center;
			padding: 20rpx 0;
			font-size: 34rpx;
			letter-spacing: 3rpx;
			border-radius: 20rpx;
		}
	}

	.u-cell {
		// background-color: $global-color !important;
		// color: #FFFFFF;
	}
</style>
