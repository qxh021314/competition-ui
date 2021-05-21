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
			getMyApplyInfo(e, type) {
				if (type && type == 'update') {
					uni.navigateTo({
						url: `/package-events/views/activity-details/sign-up?matchId=${this.matchId}&subjectId=${e.subjectId}&applyId=${e.id}&status=001&type=update`
					})
				} else {
					uni.navigateTo({
						url: `/package-events/views/activity-details/sign-up?matchId=${this.matchId}&subjectId=${e.subjectId}&applyId=${e.id}&status=001`
					})
				}
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
