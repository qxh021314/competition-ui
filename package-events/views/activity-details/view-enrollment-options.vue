<template>
	<view>
		<enrollment v-if="listData && listData.length > 0" :listData="listData" @change="getMyApplyInfo"></enrollment>
		<no-data v-else></no-data>
	</view>
</template>

<script>
	import {
		listMyMatchBySubject
	} from '@/api/competition.js'
	import enrollment from '../../components/enrollment.vue'
	export default {
		components: {
			enrollment
		},
		data() {
			return {
				matchId: '',
				listData: []
			}
		},
		onLoad(options) {
			this.matchId = options.matchId
			this.getListMyMatchBySubject()
		},
		methods: {
			// 编辑
			getMyApplyInfo(e) {
				uni.navigateTo({
					url: `/package-events/views/activity-details/sign-up?matchId=${this.matchId}&subjectId=${e.subjectId}&type=update`
				})
				// getMyApplyInfo({
				// 	matchId: this.matchId,
				// 	openId: this.$userService.getOpenId()
				// }).then((res) => {})
			},
			// 获取列表
			getListMyMatchBySubject() {
				listMyMatchBySubject({
					matchId: this.matchId,
					openId: this.$userService.getOpenId()
				}).then((res) => {
					console.log(res);
					this.listData = res.record
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
