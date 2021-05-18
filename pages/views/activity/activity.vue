<template>
	<view class="activity">

		<view class="activity--card" v-for="index in 1" :key="index" @click="activityDetails()">
			<view class="activity--card_title">精彩赛事</view>
			<view class="activity--card_img">
				<image src="/static/events.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {},
		methods: {
			activityDetails() {
				uni.navigateTo({
					url: '/package-events/views/activity-details/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.activity {
		margin: 20rpx;

		&--card {
			background-color: #FFFFFF;
			border-radius: 10rpx;
			height: 210rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20rpx 0;

			&_title {
				flex: 1;
				text-align: center;
				font-weight: bold;
				letter-spacing: 10rpx;
				font-size: 35rpx;
			}

			&_img {
				margin: 0 50rpx;
				width: 130rpx;
				height: 130rpx;
			}
		}
	}
</style>
