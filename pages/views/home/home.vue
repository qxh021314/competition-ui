<template>
	<view class="home">
		<!-- 背景图 -->
		<view class="titleNview-background"></view>

		<!-- 公告 -->
		<u-notice-bar bg-color="#ffffff" mode="horizontal" color="#ffffff" :list="textList"></u-notice-bar>

		<view class="zit-banner">
			<u-swiper bgColor="" name="imgUrl" height="300" :list="listBanner" :effect3d="true"
				effect3d-previous-margin="40" @click="bannerToDetails"></u-swiper>
		</view>

		<view class="zit-menu">
			<!-- 菜单 -->
			<menu-list :list="menuList"></menu-list>
		</view>

		<!-- 企业动态 -->
		<view class="zit-busin">
			<view class="zit-busin_title">
				<u-section :line-color="lineColor" :sub-color="lineColor" font-size="33" title="企业动态" sub-title="更多动态"
					@click="showNewsListPage">
				</u-section>
			</view>
			<view class="zit-busin_content">
				<zit-news-card></zit-news-card>
			</view>
		</view>

	</view>
</template>

<script>
	import zitNewsCard from '@/components/zit-news-card/index.vue'
	import {
		homeBannerInfo
	} from '@/api/system.js'
	export default {
		components: {
			zitNewsCard
		},
		data() {
			return {
				noticeColor: this.$utils.themeColor,
				menuList: [{
					img: '/static/gywm.png',
					name: '关于我们',
					url: '/package-events/views/other/other',
					type: 'gywm'
				}, {
					img: '/static/hxcp.png',
					name: '核心产品',
					url: '/package-events/views/product/index',
					type: 'hxcp'
				}, {
					img: '/static/tycg.png',
					name: '体育场馆',
					url: '/package-events/views/stadium/stadium',
					type: 'tycg'
				}, {
					img: '/static/gdss.png',
					name: '更多搜索',
					url: '',
					type: 'gdss'
				}],
				srvUrl: 'data:image/jpeg;base64,',
				lineColor: this.$utils.themeColor,
				textList: [],
				listBanner: []
			}
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.$utils.themeColor
			})
		},
		onLoad() {
			this.getBanner()
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getBanner() {
				homeBannerInfo().then((res) => {
					this.listBanner = res.bannerList
					this.textList.push(res.notice)
				})
			},
			bannerToDetails() {},
			showNewsListPage() {
				uni.navigateTo({
					url: '/package-events/views/news/list'
				})
			}
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
		right: 0;
		width: 100%;
		height: 300rpx;
		transition: .4s;
		background-color: $global-color;
		border-radius: 0 0 10% 10%;
		// overflow: hidden;
	}

	.titleNview-background::after {
		// content: '';
		// width: 140%;
		// height: 250rpx;
		// /* #ifndef MP */
		// height: 300rpx;
		// /* #endif */
		// position: absolute;
		// left: -20%;
		// top: 0;
		// border-radius: 0 0 50% 50%;
		// background-color: $global-color;
	}

	.compe-image {
		width: 100%;
		height: 350rpx;
	}

	.compe-introduce {
		margin: 10rpx;
		border-radius: 10rpx;
	}

	.zit-banner {
		// margin: 30rpx 0;
	}

	/deep/ .u-swiper-wrap {
		margin-bottom: 20rpx;
	}

	.zit-busin {
		&_title {
			background-color: #FFFFFF;
			padding: 20rpx 10rpx;
		}

		&_content {
			// background-color: #ffffff;
		}
	}

	.zit-menu {
		margin: 20rpx 0;
		background-color: #FFFFFF;
		// box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.14);
		border-radius: 10rpx;
		background-color: #FFFFFF;
		position: relative;
	}
</style>
