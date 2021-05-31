<template>
	<view class="other">
		<u-parse :html="aboutText"></u-parse>
	</view>
</template>

<script>
	import {epidemicTips} from '@/api/competition.js'
	export default {
		data() {
			return {
				aboutText: ''
			}
		},
		onLoad() {
			this.getAboutUs()
		},
		methods: {
			getAboutUs() {
				epidemicTips({}).then(res => {
					this.aboutText = res.info
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
