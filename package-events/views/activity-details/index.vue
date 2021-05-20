<template>
	<view>
		<zit-scheme-card v-if="listData && listData.length > 0" :listData="listData" :showStatus="true" :sectionText="false" @change="toDetails">
		</zit-scheme-card>
		<no-data v-else></no-data>
		<view class="placeholder"></view>
		<u-loadmore v-if="listData && listData.length > 0" :status="status" :icon-type="iconType" :load-text="contentText" />
	</view>
</template>

<script>
	import {
		qMatchByPage
	} from '@/api/competition.js'
	export default {
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
					"pageNum": 1,
					"pageSize": 10
				}
			}
		},
		onLoad() {
			this.getqMatchByPage()
		},
		onReachBottom() {
			if (this.status == 'loading') {
				this.queryParams.pageNum += 1
				this.getqMatchByPage()
			}
		},
		methods: {
			getqMatchByPage() {
				qMatchByPage(this.queryParams).then((res) => {
					this.listData.push(...res.record.records)
					if (res.record.records.length < 10) {
						this.status = 'nomore'
					} else {
						this.status = 'loading'
					}
				})
			},
			toDetails(item) {
				uni.navigateTo({
					url: `/package-events/views/activity-details/events-details?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.placeholder{
		height: 30rpx;
	}
</style>
