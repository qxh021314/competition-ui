// 文件处理模块
export function previewDocument(src) {
	this.src = src
	this.openDoc = function() {
		uni.showLoading({
			title: '正在加载文件...',
			mask: true
		})
		uni.downloadFile({
			url: this.src,
			success: function(res) {
				uni.hideLoading()
				let filePath = res.tempFilePath
				uni.openDocument({
					showMenu: true,
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
	}
}