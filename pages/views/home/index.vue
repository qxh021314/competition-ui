<template>
	<view>
		<!-- 背景图 -->
		<view class="titleNview-background"></view>
		<!-- 公告 -->
		<u-notice-bar mode="horizontal" color="#ffffff" :list="textList"></u-notice-bar>

		<u-swiper bgColor="" name="imgUrl" height="300" :list="listBanner" :effect3d="true"
				  effect3d-previous-margin="40" @click="bannerToDetails"></u-swiper>

		<br>
		<view class="zit-menu">
			<!-- 菜单 -->
			<menu-list></menu-list>
		</view>

		<!-- 企业动态 -->
		<view class="zit-busin">
			<view class="zit-busin_title">
				<u-section :line-color="lineColor" :sub-color="lineColor" font-size="33" title="企业动态" sub-title="更多动态"></u-section>
			</view>
			<view class="zit-busin_content">
				<zit-news-card></zit-news-card>
			</view>
		</view>
	</view>
</template>

<script>
	import zitNewsCard from '@/components/zit-news-card/index.vue'
	export default {
		components: {
			zitNewsCard
		},
		data() {
			return {
				lineColor: this.$utils.themeColor,
				textList: ['和辣椒刺激目前为'],
				listBanner: [{
					imgUrl: "https://platform-xrsj.oss-cn-hangzhou.aliyuncs.com/media/20210429/8f74a1810c7c40c8aced49175ba1f1bc.jpg"
				}]
			}
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.$utils.themeColor
			})
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			bannerToDetails() {}
		}
	}
</script>

<style lang="scss">
	page {
		// background-color: #FFFFFF;
	}

	.titleNview-background {
		position: absolute;
		// background-image: linear-gradient(to top, #ffffff 0%, $global-color 100%);
		top: 0;
		left: 0;
		width: 100%;
		height: 780rpx;
		transition: .4s;
		// overflow: hidden;
	}

	.titleNview-background::after {
		content: '';
		width: 140%;
		height: 250rpx;
		/* #ifndef MP */
		height: 300rpx;
		/* #endif */
		position: absolute;
		left: -20%;
		top: 0;
		border-radius: 0 0 50% 50%;
		background-color: $global-color;
	}

	.compe-image {
		width: 100%;
		height: 350rpx;
	}

	.compe-introduce {
		margin: 10rpx;
		border-radius: 10rpx;
	}

	.zit-busin {
		margin: 20rpx;
		background-color: #FFFFFF;
		&_title {
			background-color: #FFFFFF;
			padding: 20rpx 10rpx;
		}
	}

	.zit-menu {
		margin: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.14);
		border-radius: 10rpx;
		background-color: #FFFFFF;
		margin-top: -20rpx;
		position: relative;
	}
</style>
