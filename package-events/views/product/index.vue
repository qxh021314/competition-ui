<template>
	<view>

		<view class="zit-banner">
			<u-swiper bgColor="" name="imgUrl" height="300" :list="listBanner" :effect3d="true"
				effect3d-previous-margin="0" @click="bannerToDetails"></u-swiper>
		</view>

		<!-- 		 热销产品       -->
		<view class="zit-product">
			<u-section font-size="33" title="热销产品" :right="false"></u-section>
		</view>
		<view class="zit-product_content">
			<zit-news-card></zit-news-card>
		</view>

		<!-- 		 推荐产品       -->
		<view class="zit-product">
			<u-section font-size="33" title="推荐产品" :right="false"></u-section>
		</view>
		<view class="zit-product_content">
			<zit-news-card></zit-news-card>
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
				listBanner: [{
					imgUrl: "http://pic.616pic.com/bg_w1180/00/14/52/W0OnDtpHCJ.jpg!/fw/1120"
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.zit-product {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx 10rpx;
		&_content {
			background-color: #ffffff;
		}
	}
</style>
