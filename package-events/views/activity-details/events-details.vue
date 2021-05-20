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
						<u-icon name="file-text" size="50"></u-icon>
						<text class="scheme--intro_btn_text">立即报名</text>
					</view>
				</view>
			</view>

			<!-- 			赛事安排
			<view class="scheme--intro">
				<view class="scheme--intro_title">
					<u-section font-size="35" title="赛事安排" :right="false"></u-section>
				</view>
				<view class="scheme--intro_menu">
					<view class="scheme--intro_menu_icon" v-for="(item, index) in arranList" :key="index">
						<u-icon :name="item.icon" size="70"></u-icon>
						<text class="scheme--intro_menu_text">{{item.name}}</text>
					</view>
				</view>
			</view> -->


		</view>
	</view>
</template>

<script>
	import {
		qMatchById
	} from '@/api/competition.js'
	export default {
		data() {
			return {
				listBanner: [{
					imgUrl: "https://img.zcool.cn/community/015f52598d716700000021298c562f.jpg@1280w_1l_2o_100sh.jpg"
				}],
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
						menuUrl: '/package-events/views/livephoto/livephoto'
					}
				],
				textList: []
			}
		},
		onLoad(options) {
			this.paramsId = options.id
			this.getqMatchById()
		},
		methods: {
			getqMatchById() {
				qMatchById({
					id: this.paramsId
				}).then((res) => {
					this.recordObj = res.record
					this.textList.push(res.record.matchNotice)
					console.log(res);
				})
			},
			// 
			toHref(item) {
				uni.navigateTo({
					url: item.menuUrl + `?id=${this.paramsId}`
				})
			},
			toRegister() {
				uni.navigateTo({
					url: `/package-events/views/activity-details/subject?matchId=${this.paramsId}`
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
				justify-content: space-around;
				align-items: center;
				margin: 20rpx 0;

				&_icon {
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
</style>
