<template>
	<view>
		<view class="z-tabs">
			<u-tabs name="subjectName" :list="listTab" :active-color="titleColor" bar-width="120" :is-scroll="true"
				:current="current" @change="change"></u-tabs>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listTab: [
					{subjectName: '第一男双'},
					{subjectName: '第二男双'},
					{subjectName: '第三男双'}
				],
				current: 0,
				titleColor: this.$utils.themeColor
			}
		},
		methods: {
			change(e) {
				this.current = e
			}
		}
	}
</script>

<style>

</style>
