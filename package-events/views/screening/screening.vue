<template>
	<view class="other">
		<u-parse :html="aboutText"></u-parse>
	</view>
</template>

<script>
	import {getScene} from '@/api/competition.js'
	export default {
		data() {
			return {
				aboutText: ''
			}
		},
		onLoad(options) {
			let matchId = options.id
			this.getScene(matchId)
		},
		methods: {
			getScene(matchId) {
				getScene({
					matchId: matchId
				}).then(res => {
					this.aboutText = res.record.content
				})
			}
		}
	}
</script>

<style lang="scss">
	.other{ 
		margin: 0 20rpx;
	}
</style>
