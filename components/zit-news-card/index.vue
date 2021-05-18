<template>
	<view>
		<view class="zit-news u-border-bottom u-body-item" v-for="indexp in 1" :key="indexp">
			<view class="zit-news_title u-line-1">
				标题/名称1
			</view>
			<view class="u-flex u-col-between u-p-t-0">
				<view class="u-body-item-title u-line-2">
					瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半
					瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半
				</view>
				<image src="https://img.zcool.cn/community/015f52598d716700000021298c562f.jpg@1280w_1l_2o_100sh.jpg"
					mode="aspectFill"></image>
			</view>
			<view class="zit-news_time">
				2021-05-17 09:09
			</view>

		</view>
		<view class="zit-news u-border-bottom u-body-item">
			<view class="zit-news_title u-line-1">
				标题/名称2
			</view>
			<view class="u-body-item u-flex u-col-between u-p-t-0">
				<view class="u-body-item-title u-line-2">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
			</view>
			<view class="zit-news_image u-flex">
				<image src="https://img.zcool.cn/community/015f52598d716700000021298c562f.jpg@1280w_1l_2o_100sh.jpg"
					mode="aspectFill"></image>
				<image src="http://pic.616pic.com/bg_w1180/00/14/52/W0OnDtpHCJ.jpg!/fw/1120" mode="aspectFill"></image>
				<image src="http://img.aiimg.com/uploads/allimg/190622/1-1Z622001G7.jpg" mode="aspectFill"></image>
			</view>
			<view class="zit-news_time">
				2021-05-17 09:09
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
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.u-body-item-title {
		letter-spacing: 3rpx;
		font-size: 29rpx;
	}

	.zit-news {
		margin-bottom: 10rpx;
		background-color: #FFFFFF;

		&_title {
			font-size: 30rpx;
			font-weight: bold;
			padding: 10rpx;
		}

		&_image {
			image {
				height: 150rpx;
				flex: 0 0 30%;
				border-radius: 8rpx;
			}
		}

		&_time {
			font-size: 26rpx;
			color: #a3a3a3;
			margin-top: 20rpx;
		}
	}
</style>
