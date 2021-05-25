<template>
	<view>
		
		<enrollment v-if="listData && listData.length > 0" :listData="listData" @change="getMyApplyInfo"></enrollment>
		<no-data v-else></no-data>

		<view class="placeholder"></view>
		<u-loadmore v-if="listData && listData.length > 0" :status="status" :icon-type="iconType" :load-text="contentText" />
		
	</view>
</template>

<script>
	import {
		listMyMatch
	} from '@/api/competition.js'
	import enrollment from '../../components/enrollment.vue'
	export default {
		components: {
			enrollment
		},
		data() {
			return {
				contentText: {
					loadmore: '上拉显示更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				iconType: 'flower',
				status: 'loading',
				listData: [],
				queryParams: {
					"openId": this.$userService.getOpenId(),
					"pageNum": 1,
					"pageSize": 10
				}
			}
		},
		onLoad() {
			this.getListMyMatch()
		},
		onReachBottom() {
			if (this.status == 'loading') {
				this.queryParams.pageNum += 1
				this.getListMyMatch()
			}
		},
		methods: {
			// 编辑
			getMyApplyInfo(e) {
				uni.navigateTo({
					url: `/package-events/views/activity-details/view-enrollment-options?matchId=${e.matchId}`
				})
			},
			
			// 获取列表
			getListMyMatch() {
				listMyMatch(this.queryParams).then((res) => {
					this.listData.push(...res.record.records)
					if (res.record.records.length < 10) {
						this.status = 'nomore'
					} else {
						this.status = 'loading'
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
</style>
