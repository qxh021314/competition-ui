<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="false" indicator-active-color="themeColor">
			<swiper-item>
				<view class="menu-list">
					<view class="item" v-for="(item, index) in list" :key="index" @click="toUrl(item)">
						<view class="item-icon">
							<image :src="item.img"></image>
						</view>
						<view class="item-title"><text>{{item.name}}</text></view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			active: {
				// 当前步骤
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data() {
			return {
			}
		},
		computed: {
			themeColor() {
				return this.$utils.themeColor
			}
		},
		methods: {
			toUrl(item) {
				console.log(item);
				if (item.name == '精彩活动') {
					uni.switchTab({
						url: item.url
					})
				} else if (item.name == '成熟案例') {
					uni.switchTab({
						url: item.url
					})
				} else {
					uni.navigateTo({
						url: item.url
					})
				}
	
			},
			getMenuList() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FFFFFF;
	}

	uni-swiper-item {}

	.swiper {
		background-color: rgba(255, 255, 255, 1);
		padding: 10rpx 0;
		height: 320rpx;
	}

	.menu-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
	}

	.menu-list .item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 0 0 25%;
		margin: 10rpx 0;

		text {
			font-size: 25rpx;
		}
	}

	.menu-list .item .item-icon {
		height: 90rpx;
		width: 90rpx;
		margin-bottom: 10rpx;
		// padding: 20rpx;
		border-radius: 50%;
		// box-shadow: 8rpx 10rpx 55rpx 0 rgba($color: #000000, $alpha: 0.2), 0 6rpx 20rpx 0 rgba($color: #aaffff, $alpha: 0.2);
		// background-color: rgba($color: $global-color, $alpha: 0.2);
	}

	swiper-item {
		display: flex;
		align-items: center;
	}
</style>
