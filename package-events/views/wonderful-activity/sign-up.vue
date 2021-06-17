<template>
	<view>
		<!-- banner图进入的详情 -->
		<view class="poster">
			<view class="poster_detail posterPh">
				<scroll-view :scroll-y="true" class="scroll-Y" :style="{height:pH+'px'}">
					<u-parse :html="content"></u-parse>
				</scroll-view>
			</view>
			<view class="poster_btn" @click="registerNow()">
				<text>立即报名</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {activityInfo} from '@/api/activity.js'
	export default {
		data() {
			return {
				isAsign: true,
				pH: '',
				content: '',
				bannerType: '',
				courseImportId: '',
				activityId: ''
			}
		},
		onLoad(options) {
			this.activityId = options.id
			this.getActivityInfo(options.id)
		},
		onReady() {
			var _this = this;
			uni.getSystemInfo({
				success: (resu) => {
					console.log(resu);
					const query = uni.createSelectorQuery()
					query.select('.scroll-Y').boundingClientRect()
					query.exec(function(res) {
						console.log(res);
						_this.pH = resu.windowHeight - 50;
						console.log('打印页面的剩余高度', _this.pH);
					})
				},
				fail: (res) => {}
			})
		},
		methods: {
			getActivityInfo(id) {
				activityInfo({
					id: id
				}).then(res => {
					this.content = res.info.detail
				})
			},
			registerNow() {
				uni.navigateTo({
					url: '/package-events/views/wonderful-activity/sign-up-form?activityId=' + this.activityId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.poster {
		background-color: #FFFFFF;

		&_detail {}

		&_btn {
			// height: 50rpx;
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 25rpx 0;
			text-align: center;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
			background-color: $global-color;
		}
	}
</style>
