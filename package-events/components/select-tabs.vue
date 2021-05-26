<template>
	<view class="select-tabs u-border-bottom">
		<view class="select-tabs_t">
			<view v-for="(item, index) in list" :key="index" @click="selectGroup(item, index)"
				:style="[ industryIndexList.indexOf(index) >= 0 ? styleAfter : styleBefore ]">
				<text>{{ item[name] }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: 'name'
			},
			isCancel: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		},

		data() {
			return {
				styleBefore: {
					backgroundColor: '#ffffff',
					'color': '#000000'
				},
				styleAfter: {
					backgroundColor: this.$utils.themeColor,
					'color': '#ffffff'
				},
				industryIndexList: []
			}
		},

		mounted() {
			if (!this.isCancel) {
				this.industryIndexList = [0]
			}
		},

		methods: {
			selectGroup(item, index) {
				if (this.isCancel){
					if (this.industryIndexList.indexOf(index) == -1) {
						this.industryIndexList = []
						this.industryIndexList.push(index)
						this.$emit('change', item)
					} else {
						this.industryIndexList = []
						item.id = ''
						this.$emit('change', item)
					}
				} else {
					this.industryIndexList = []
					this.industryIndexList.push(index)
					this.$emit('change', item, index)
				}
	
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
