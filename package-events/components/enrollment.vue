<template>
	<view>
		<view class="enrollment-card" v-for="(item ,index) in listData" :key="index" @click="toHref(item)">
			<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
				<image :src="item.mainPic" mode="aspectFill"></image>
				<view class="u-body-item-title">
					<view class="u-line-2 enrollment-card_title">
						{{item.subjectName ? item.subjectName : item.matchName}}
					</view>
					<view class="u-line-1 willnum" v-if="$utils.isNotBlank(item.name)">
						报名人: {{item.name}}
					</view>
					<view class="u-line-1 willnumtime">
						报名时间: {{item.createTime}}
					</view>
				</view>
			</view>
			<view class="enrollment-card_foot" v-if="item.status">
				<view class="enrollment-card_foot_status" :style="{backgroundColor: statusBack(item.status)}">
					{{activity ? $utils.getEnventStatus(item.status) : $utils.getStatus(item.status)}}</view>
				<u-icon v-if="item.status == '0' || item.status == '3'" name="edit-pen-fill" color="#2979ff"
					label-color="#2979ff" size="34" label="编辑"></u-icon>
				<view v-if="item.arrangeEdit == '1'" @click.stop="toGroup(item)">
					<u-icon name="edit-pen-fill" color="#ffaa00" label-color="#ffaa00" size="34" label="阵容"></u-icon>
				</view>
			</view>

			<view class="reason" v-if="item.status == '3'">
				原因: {{item.reason}}
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
			},
			activity: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			statusBack(status) {
				switch (status) {
					case '0':
						return '#ffaa00'
						break
					case '1':
						return '#00aaff'
						break;
					case '2':
						return this.$utils.themeColor
						break
					case '3':
						return '#ff0000'
						break;
					default:
						return ''
						break;
				}
			},
			update(item) {},
			toHref(item) {
				if (item.status) {
					if (item.status == '0' || item.status == '3') {
						this.$emit('change', item, 'update')
					} else {
						this.$emit('change', item)
					}
				} else {
					this.$emit('change', item)
				}
			},
			toGroup(item) {
				this.$utils.togo('/package-events/views/group-stage/grouping', {
					subjectId: item.subjectId,
					teamId: item.teamId,
					teamName: item.name,
					teamRole: item.teamRole
				})
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

	.enrollment-card_foot {
		display: flex;
		justify-content: space-between;

		&_status {
			color: #FFFFFF;
			background-color: $global-color;
			padding: 5rpx 10rpx;
		}
	}
	.reason{
		margin: 15rpx 0;
		color: #787878;
	}
</style>
