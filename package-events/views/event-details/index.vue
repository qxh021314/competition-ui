<template>
	<view class="">
		<!-- 赛事 -->
		<u-card margin="20rpx" :show-head="false" :show-foot="false">
			<view slot="body">
				<view class="envent--fontweight">2021年****杯网球公开赛</view>
				<view class="envent--margin">
					报名时间: 2021-09-09 09:02
				</view>
				<view class="envent--margin">
					比赛时间: 2021-09-09 09:02
				</view>
				<view class="envent--margin">
					比赛地点: ****会馆
				</view>
			</view>
		</u-card>

		<view class="u-margin-20">
			<view class="envent--width">
				<u-button type="primary" size="mini">点击报名</u-button>
			</view>
		</view>

		<view class="u-margin-20">
			<!-- 菜单 -->
			<menu-list></menu-list>
		</view>

		<!-- 直播相册 -->
		<zt-title name="直播相册"></zt-title>
		<u-card margin="20rpx" :show-head="false" :show-foot="false">
			<view slot="body">
				
				<view class="envent--image">
					<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" alt="">
				</view>
				
				<view class="envent--title">
					<text>啊u奴的趣味的得起我们的前五大区相册</text>
				</view>
				
				<view class="envent--num">
					<text class="">共计100张照片</text>
					<text class="envent--num_margin">已有1000次浏览相册</text>
				</view>
			</view>
		</u-card>
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

<style lang="scss" scoped>

	.envent{
		&--margin{
			margin: 10rpx 0;
		}
		&--fontweight{
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		&--width{
			display: flex;
		}
		&--image{
			width: 100%;
			height: 300rpx;
		}
		&--title{
			font-size: 30rpx;
			margin: 10rpx 0;
		}
		&--num{
			color: #7e7e7e;
			margin: 10rpx 0;
			&_margin{
				margin: 0 20rpx;
			}
		}
	}

</style>
