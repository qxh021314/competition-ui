<template>
	<view>
		<view class="no-data">
			<image src="/static/zanwushuju.png" mode=""></image>
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"no-data",
		data() {
			return {
				
			};
		}
	}
</script>
<style lang="scss">
	.no-data{
		margin: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 220rpx;
			height: 150rpx;
		}
		text{
			margin: 20rpx 0;
			font-size: 35rpx;
			color: #8a8a8a;
		}
	}
</style>
