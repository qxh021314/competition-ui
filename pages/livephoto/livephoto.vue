<template>
	<view class="live-photo">
		<u-card :show-head="false" :foot-border-top="false" margin="0" :border-radius="0">
			<view class="card-bd" slot="body">
				<image src="" mode="aspectFill" />
				<text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure placeat.</text>
			</view>5
			<view slot="foot">
				<view class="u-flex u-row-around">
					<text>123张相册</text>
					<text>888次相册浏览</text>
				</view>

				<u-line class="u-m-t-40 u-m-b-30"></u-line>

				<u-icon name="clock" label="2021-01-01" size=""></u-icon>
			</view>
		</u-card>

		<u-tabs :list="tabs" :is-scroll="false" :current="currentTab" @change="changeTab">
		</u-tabs>
		
		<!--  tab pannel  -->
		<view class="tab-pannel">
			<view v-if="currentTab === 0 || currentTab === 1" class="u-p-20">
				<u-row class="photo-item" v-for="i in 5">
					<u-col span="6" @click="onClickPhotoItem">
						<image src="" mode="aspectFill"></image>
					</u-col>
					<u-col span="6">
						<image src="" mode="aspectFill"></image>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						name: "照片"
					},
					{
						name: "热门"
					},
					{
						name: "我的照片"
					},
				],
				currentTab: 0
			}
		},
		methods: {
			changeTab(n) {
				this.currentTab = n
			},
			onClickPhotoItem(item) {
				console.log('click photo item')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-bd {
		display: flex;
		justify-content: center;
		flex-direction: column;

		image {
			width: 100%;
			height: 340rpx;
			background: #eee;
			border-radius: 6px;
		}

		text {
			padding: 20rpx 10rpx 0;
		}
	}

	.tab-pannel {
		width: 100%;
		min-height: 400rpx;
		background: #fff;
	}

	.photo-item {
		image {
			width: 100%;
			height: 200rpx;
			background: #eee;
			border-radius: 8rpx;
		}
	}
</style>
