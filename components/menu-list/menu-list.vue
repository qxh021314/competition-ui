<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="false" indicator-active-color="themeColor">
			<swiper-item>
				<view class="menu-list">
					<view class="item" v-for="(item, index) in menuList_1" :key="index" @click="toUrl(item)">
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
			}
		},
		data() {
			return {
				menuList_1: [{
					img: '/static/test1.png',
					name: '签位表',
					url: '/pages/bidding-notice/index',
					color: this.$utils.themeColor,
					oauth: true
				}, {
					img: '/static/test2.png',
					name: '赛程进程表',
					url: '/pages/bidding-notice/index',
					color: this.$utils.themeColor,
					oauth: false
				}, {
					img: '/static/test3.png',
					name: '场次表',
					color: this.$utils.themeColor,
					url: '',
					oauth: false
				}, {
					img: '/static/test4.png',
					name: '对阵表',
					color: this.$utils.themeColor,
					url: '/pages/bidding-notice/index',
					oauth: false
				}, {
					img: '/static/test6.png',
					name: '赛况',
					color: this.$utils.themeColor,
					url: '',
					oauth: false
				}, {
					img: '/static/test5.png',
					name: '成绩',
					color: this.$utils.themeColor,
					url: '/pages/bidding-notice/index',
					oauth: false
				}]
			}
		},
		computed: {
			themeColor() {
				return this.$utils.themeColor
			}
		},
		methods: {
			toUrl(item) {

			},
			getMenuList() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #FFFFFF;
	}
	uni-swiper-item{
	}
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
		height: 80rpx;
		width: 80rpx;
		margin-bottom: 10rpx;
		padding: 20rpx;
		border-radius: 50%;
		// box-shadow: 8rpx 10rpx 15rpx 0 rgba(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgba(0, 0, 0, 0.19);
		background-color: rgba($color: $global-color, $alpha: 0.2);
	}

	swiper-item {
		display: flex;
		align-items: center;
	}
</style>
