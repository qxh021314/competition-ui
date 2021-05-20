<template>
	<view class="subject">
		<view class="subject--tips">
			<view class="subject--tips_title u-border-bottom">{{matchInfo.matchName}}</view>
			<view class="subject--tips_content">
				<view class="subject--tips_content_label">
					比赛地点：<text>{{matchInfo.matchAddress}}</text>
				</view>
				<view class="subject--tips_content_label">
					联系方式：<text>{{matchInfo.phoneNo}}</text>
				</view>
			</view>
			<view class="subject--tips_btn">
				<view class="subject--tips_btn_pre" @click="toAssociation ()">
					查看竞赛规程
				</view>
				<view class="subject--tips_btn_pre" @click="toEnrollment()">
					查看我的报名
				</view>
			</view>
		</view>

		<view class="subject--title">
			选择报名项目:
		</view>

		<view class="subject--tips" v-for="(item,index) in recordList" :key="index">
			<view class="subject--tips_title u-border-bottom subject--tips_env">{{item.subjectName}}</view>
			<view class="subject--tips_content">
				<view class="subject--tips_content_label">
					报名时间:
				</view>
				<view class="subject--tips_content_label">
					<text>{{matchInfo.startTime}} 至 {{matchInfo.endTime}}</text>
				</view>
				<view class="subject--tips_content_label">
					团体赛报名要求:
				</view>
				<view class="subject--tips_content_label">
					<text>{{item.subjectRule}}</text>
				</view>
			</view>
			<view class="subject--tips_btn">
				<view class="subject--tips_btn_aft" @click="toRegister(item)">
					报名
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getApplyInfo
	} from '@/api/competition.js'
	export default {
		data() {
			return {
				matchId: '',
				matchInfo: {},
				recordList: []
			}
		},
		onLoad(options) {
			this.matchId = options.matchId
			this.getApplyInfo()
		},
		methods: {
			getApplyInfo() {
				getApplyInfo({
					matchId: this.matchId
				}).then((res) => {
					this.matchInfo = res.matchInfo
					this.recordList = res.list
				})
			},
			// 赛事章程
			toAssociation() {
				uni.navigateTo({
					url: `/package-events/views/constitution/constitution?id=${this.matchId}`
				})
			},
			toRegister(item) {
				uni.navigateTo({
					url: `/package-events/views/activity-details/sign-up?matchId=${this.matchId}&subjectId=${item.id}`
				})
			},
			toEnrollment() {
				uni.navigateTo({
					url: `/package-events/views/activity-details/view-enrollment-options?matchId=${this.matchId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.subject {
		margin: 20rpx;

		&--title {
			margin: 30rpx 20rpx;
			font-size: 35rpx;
			color: #ababab;
		}

		&--tips {
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding: 20rpx;
			margin: 20rpx 0;

			&_title {
				font-size: 35rpx;
				font-weight: bold;
				padding: 0 20rpx 20rpx 20rpx;
			}

			&_env {
				color: $global-color;
			}

			&_content {
				padding: 0 20rpx;

				&_label {
					color: #ababab;
					margin: 20rpx 0;

					text {
						color: #000000;
					}
				}

			}

			&_btn {
				display: flex;
				justify-content: space-around;

				&_pre {
					background-color: $global-color;
					color: #FFFFFF;
					padding: 20rpx 50rpx;
					letter-spacing: 5rpx;
					border-radius: 15rpx;
					border: 1rpx solid #57bcad;
				}

				&_aft {
					background-color: $global-color;
					color: #FFFFFF;
					width: 100%;
					text-align: center;
					padding: 15rpx 50rpx;
					letter-spacing: 5rpx;
					border-radius: 15rpx;
					border: 1rpx solid #57bcad;
				}
			}
		}
	}
</style>
