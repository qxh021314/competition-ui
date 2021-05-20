<template>
	<view v-if="show" class="like-photo">
		<view>
			<view class="u-flex u-row-right u-p-40">
				<u-icon name="close" @click="close" size="50" />
			</view>
			<view class="bd">
				<image :src="data.src" mode="aspectFill"></image>
			</view>
			<view class="footer u-flex u-row-between u-p-l-35 u-p-r-35 u-col-center">
				<view>
					<u-icon name="share" size="50"></u-icon>
					<text class="u-p-l-20 c999 u-font-14">分享</text>
				</view>
				<view>
					<u-button type="primary">查看高清</u-button>
				</view>
				<view>
					<u-icon name="thumb-up" size="50"></u-icon>
					<text class="u-p-l-10 c999 u-font-14">100</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			data: {
				type: Object,
				default: {}
			}
		},
		methods: {
			close() {
				this.$emit('update:show', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.like-photo {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		color: #fff;
		background: rgba(0, 0, 0, .9);
		z-index: 11;
		& > view {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			height: 100%;
		}
		
		.bd {
			image {
				height: 400rpx;
			}
		}
		
		.footer {
			width: 100%;
			height: 120rpx;
			background: rgba($color: #000000, $alpha: 0.3);
		}
		
		.c999 {
			color: #999;
		}
	}
</style>
