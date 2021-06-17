<template>
	<view>
		<zit-envents-card v-if="listData && listData.length > 0" mainImg="imgUrl" :listData="listData"
			:showStatus="true" @change="toDetails"> </zit-envents-card>
		<no-data v-else></no-data>
	</view>
</template>

<script>
	import {
		getActivityPage
	} from '@/api/activity.js'
	import zitEnventsCard from '../../components/zit-envents-card.vue'
	export default {
		components: {
			zitEnventsCard
		},
		data() {
			return {
				listData: [],
				contentText: {
					loadmore: '上拉显示更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				queryParams: {
					"pageCurrent": 1,
					"pageSize": 10
				}
			}
		},
		onShow() {
			if (this.listData && this.listData.length == 0) {
				this.queryParams.pageCurrent = 1
				this.getActivityPage()
			}
		},
		onReachBottom() {
			if (this.status == 'loading') {
				this.queryParams.pageCurrent += 1
				this.getActivityPage()
			}
		},
		methods: {
			getActivityPage() {
				getActivityPage(this.queryParams).then(res => {
					this.listData.push(...res.page.records)
					if (res.page.records.length < 10) {
						this.status = 'nomore'
					} else {
						this.status = 'loading'
					}
				})
			},
			toDetails(item) {
				uni.navigateTo({
					url: `/package-events/views/wonderful-activity/sign-up?id=${item.id}`
				})
			}
		}
	}
</script>

<style>

</style>
