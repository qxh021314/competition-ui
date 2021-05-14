<template>
	<view>
		<view class="zit-news u-border-bottom u-body-item" v-for="indexp in 5" :key="indexp">
			<view class="zit-news_title">
				标题
			</view>
			<view class="u-flex u-col-between u-p-t-0">
				<view class="u-body-item-title u-line-2">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
				<image
					src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
					mode="aspectFill"></image>
			</view>
		</view>
		<view class="zit-news u-border-bottom u-body-item">
			<view class="zit-news_title">
				标题
			</view>
			<view class="u-body-item u-flex u-col-between u-p-t-0">
				<view class="u-body-item-title u-line-2">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
			</view>
			<view class="zit-news_image u-flex">
				<image v-for="index in 3" :key="index"
					src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
					mode="aspectFill"></image>
		
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
	.zit-news {
		&_title {
			font-size: 30rpx;
			font-weight: bold;
			padding: 10rpx;
		}
	
		&_image{
			image{
				height: 150rpx;
				flex: 0 0 30%;
				border-radius: 8rpx;
			}
		}
	}
</style>
