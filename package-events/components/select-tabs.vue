<template>
	<view class="select-tabs">
		<view class="select-tabs_t">
			<view v-for="(item, index) in list" :key="index" @click="selectGroup(item, index)"
				:style="[ industryIndexList.indexOf(index) >= 0 ? styleAfter : styleBefore ]">
				<text>{{ item.groupName }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				selectFeedbackData: [{
					name: '功能建议',
					val: '01'
				}, {
					name: '内容建议',
					val: '02'
				}, {
					name: '问题反馈',
					val: '03'
				}, {
					name: '界面建议',
					val: '04'
				}, {
					name: '使用建议',
					val: '05'
				}, {
					name: '产品建议',
					val: '06'
				}, {
					name: '其他',
					val: '99'
				}],
				styleBefore: {
					backgroundColor: '#ffffff',
					'color': '#000000'
				},
				styleAfter: {
					backgroundColor: this.$utils.themeColor,
					'color': '#ffffff'
				},
				industryIndexList: [] //
			}
		},
		onLoad() {},
		methods: {
			selectGroup(item, index) {
				if (this.industryIndexList.indexOf(index) == -1) {
					this.industryIndexList = []
					this.industryIndexList.push(index)
					this.$emit('change', item)
				} else {
					this.industryIndexList = []
					item.id = ''
					this.$emit('change', item)
				}
				// if (this.industryIndexList.indexOf(index) >= 0) {
				// 	item.id = ''
				// 	console.log('---');
				// 	this.$emit('change', item)
				// } else {
				// 	console.log('===');
				// 	this.industryIndexList.push(index)
				// 	this.$emit('change', item)
				// }

			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-tabs {
		background-color: #FFFFFF;
		padding: 20rpx 0;

		&_t {
			display: flex;
			flex-wrap: wrap;

			view {
				flex: 0 0 23%;
				padding: 20rpx 0;
				margin: 1%;
				text-align: center;
				border: 1rpx solid #ebebeb;
				border-radius: 10rpx;
			}
		}
	}
</style>
