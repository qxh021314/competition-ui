<template>
	<view class="activity">

		<view class="activity--card" v-for="(item, index) in listCard" :key="index" @click="activityDetails(item.url)">
			<view class="activity--card_title">{{item.name}}</view>
			<view class="activity--card_img">
				<image :src="item.img" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listCard: [
					{name: '精彩赛事', img: '/static/events.png', url: '/package-events/views/activity-details/index'},
					{name: '精彩活动', img: '/static/hd.png', url: '/package-events/views/wonderful-activity/index'}
				]
			}
		},
		computed: {},
		methods: {
			activityDetails(url) {
				uni.navigateTo({
					url: url
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
			// background-color: rgba($color: $global-color, $alpha: 0.2);
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
