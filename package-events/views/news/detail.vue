<template>
	<view class="container">
		<view class="title">{{ detail.title }}</view>
		<view class="time">{{ detail.createTime }}</view>
		<view>
			<view v-for="s in detail.section" :key="s.subtitle">
				<view v-if="s.subtitle" class="sub-title">{{ s.subtitle }}</view>
				<view v-for="(c, idx) in s.content" :key="idx" class="content">
					<view v-if="isImages(c, idx)" class="image-box u-flex u-row-around">
						<image v-for="src in c" :src="src" :key="src" mode="widthFix"
							@click="showPreview(c)"
							:class="[c.length > 1 ? 'num-gt-1' : 'num-1']">
						</image>
					</view>
					<view v-else>{{ c }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {}
			}
		},
		methods: {
			isImages(item) {
				return item instanceof Array;
			},
			showPreview(url, i) {
				uni.previewImage({
					current: i,
					urls: url
				})
				console.log('preview::', url); // todo
			},
			fetchData(id) {
			  let item = this.$store.state.news.detail.filter(item => item.id === +id)
        item = item.length ? item[0] : {} // 后期可替换为接口数据
        this.detail = item
			}
		},
		onLoad(option) {
			this.fetchData(option.id)
			console.log('detail::', option)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.container {
		padding: 35rpx 30rpx;

		.title {
			font-size: 40rpx;
			font-weight: bolder
		}

		.time {
			color: #666;
			font-size: 30rpx;
			padding: 40rpx 10rpx;
		}

		.sub-title {
			font-size: 36rpx;
			font-weight: bolder;
			padding: 20rpx 0;
		}

		.content {
			font-size: 34rpx;
			color: #333;
			text-indent: 1em;
			padding-bottom: 10rpx;
      line-height: 1.5;

			.image-box {
				image {
					padding: 20rpx;
				}
			}

			.num-1 {
				width: 100%;
			}

			.num-gt-1 {
				max-width: 50%;
				height: 300rpx;
			}
		}
	}
</style>
