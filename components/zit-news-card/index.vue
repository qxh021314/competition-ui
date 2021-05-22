<template>
	<view>

		<view @click="entry(item)" class="zit-news u-border-bottom u-body-item" v-for="item in list" :key="item.id">
			<view class="zit-news_title u-line-1">
				{{ item.title }}
			</view>

			<template v-if="item.images && (item.images.length > 1)">
				<view class="u-flex u-p-20">
					<view class="u-body-item-title u-line-2">
						{{ item.intro }}
					</view>
				</view>
				<view class="zit-news_image u-flex u-p-20">
					<image v-for="src in item.images" :src="src" :key="src" mode="aspectFill"></image>
				</view>
			</template>

			<view v-else class="u-flex u-row-between u-p-l-20 u-p-r-20">
				<view class="u-body-item-title u-line-2">
					{{ item.intro }}
				</view>
				<image v-if="item.images && item.images.length" :src="item.images[0]" mode="aspectFill"></image>
			</view>
			<view class="zit-news_time u-p-l-20">
				{{ item.createTime }}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			entry(item) {
				uni.navigateTo({
					url: `/package-events/views/news/detail?id=${item.id}`
				})
			},
			init() {
				this.list = this.$store.state.news.list
			}
		},
		created() {
			this.init()
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
		text-indent: 1em;
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
			overflow-x: auto;

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
