<template>
	<view>
		<view class="enrollment-card" v-for="(item ,index) in listData" :key="index">
			<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
				<image
					src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
					mode="aspectFill"></image>
				<view class="u-body-item-title">
					<view class="u-line-2 enrollment-card_title">
						{{item.subjectName}}
					</view>
					<view class="u-line-1 willnum">
						报名人: {{item.subjectName}}
					</view>
					<view class="u-line-1 willnumtime">
						报名时间: {{item.createTime}}
					</view>
				</view>
			</view>
			<view class="enrollment-card_foot">
				<u-icon name="edit-pen-fill" color="#2979ff" label-color="#2979ff" size="34" label="编辑" @click="update(item)"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		props: {
			listData: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {};
		},
		methods: {
			update(item) {
				this.$emit('change', item)
			}
		}
	};
</script>

<style scoped lang="scss">
	.enrollment-card {
		margin: 20rpx;
		background-color: #FFFFFF;
		padding: 10rpx;

		&_title {
			font-size: 35rpx;
		}

		&_foot {
			margin: 8rpx 0;
			text-align: right;
		}
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item-title {
		margin: 0 20rpx;

		view {
			margin: 8rpx 0;
		}
	}

	.u-body-item image {
		width: 150rpx;
		flex: 0 0 150rpx;
		height: 140rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.willnum {
		color: $global-color;
		font-size: 30rpx;
	}

	.willnumtime {
		font-size: 30rpx;
		color: #ababab;
	}
</style>
