<template>
	<view>
		<u-parse :html="recordObj.matchRule"></u-parse>
	</view>
</template>

<script>
	import {qMatchById} from '@/api/competition.js'
	export default {
		data() {
			return {
				recordObj: ''
			}
		},
		onLoad(option) {
			this.getqMatchById(option.id)
		},
		methods: {
			getqMatchById(id) {
			qMatchById({
				id: id
			}).then((res) => {
				this.recordObj = res.record
			})
			}
		}
	}
</script>

<style>

</style>
