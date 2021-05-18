<template>
	<view>
		<zit-scheme-card :showStatus="true" :sectionText="false" @change="toDetails"></zit-scheme-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toDetails() {
				uni.navigateTo({
					url: '/package-events/views/activity-details/events-details'
				})
			}
		}
	}
</script>

<style>

</style>
