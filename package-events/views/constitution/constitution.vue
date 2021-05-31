<template>
	<view>
		<u-parse :html="recordObj.matchRule"></u-parse>
	</view>
</template>

<script>
	import {
		qMatchById
	} from '@/api/competition.js'
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
			},
			previewDocument(e) {
				var current = e.src
				uni.showLoading({
					title: '正在加载文件...',
					mask: true
				})
				uni.downloadFile({
					url: current,
					success: function(res) {
						uni.hideLoading()
						let filePath = res.tempFilePath
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								console.log('打开文档成功')
							},
						});
					},
					fail() {
						uni.hideLoading()
					}
				});
			},
			downloadFile(e) {
				uni.showToast({
					title: '该类型附件不支持查看',
					icon: 'none',
					mask: true,
					duration: 3000
				})
			}
		}
	}
</script>

<style>

</style>
