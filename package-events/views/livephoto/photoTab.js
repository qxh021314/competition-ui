import chunkDataWithInUI from '@/utils/chunkArray.js'

import {
		qLivePhotoDetailByPage,
		getLivePhotoBrowse,
		uploadHeadPic
	} from '@/api/competition.js'

export default {
	data() {
		return {
			tabs: [{
					name: "照片"
				},
				{
					name: "热门"
				},
				{
					name: "我的照片"
				},
			],
			currentTab: 0,
			photos: [], // 照片 
			hotPhotos: [], // 热门
			myPhotos: [], // 我的照片
			uploadStatus: 1, // 0-有匹配数据 1-首次传 2-无匹配数据

			// 分页
			page: {
				size: 10, // 一页条数
				photoNo: 1,
				hotNo: 1,
				photoTotal: 1,
				hotTotal: 1
			},
			pending: false, // 数据请求中
			// 点赞
			showLikePopPage: false,
			likePhotoItem: {},
			// load more
			loadStatus: 'loadmore',
			loadText: {
				loadmore: '点击或上滑加载更多',
				loading: '',
				nomore: '没有更多了'
			}
		}
	},
	computed: {
		photosUI() {
			return chunkDataWithInUI(this.photos, 2)
		},
		myPhotosUI() {
			return chunkDataWithInUI(this.myPhotos, 2)
		},
		showLoadMore() {
			return this.currentTab !== 2
		}
	},
	methods: {
		async fetchPhotos() {
			if (this.page.photoNo > this.page.photoTotal) {
				this.loadStatus = 'nomore'
				console.log('nomore ...');
			} else {
				this.loadStatus = 'loading'
				const q = {
					pageNo: this.page.photoNo,
					pageSize: this.page.size
				}
				const page = await this.fetchData(q)
				const records = page.records || []
				this.photos.push(...records)
				this.page.photoTotal = page.pages
				this.page.photoNo++

				if (!records.length || (this.page.photoNo === this.page.photoTotal)) {
					this.loadStatus = 'nomore'
				}

				// 相册总数
				this.albumTotal = page.total || 0

				console.log('fetch Photos ...');
			}
		},
		async fetchHotPhotos() {
			if (this.page.hotNo > this.page.hotTotal) {
				this.loadStatus = 'nomore'
				console.log('nomore ...');
			} else {
				this.loadStatus = 'loading'
				const q = {
					pageNo: this.page.hotNo,
					pageSize: this.page.size,
					order: 1
				}
				const page = await this.fetchData(q)
				const records = page.records || []
				this.hotPhotos.push(...records)
				this.page.hotTotal = page.pages
				this.page.hotNo++

				if (!records.length || (this.page.hotNo === this.page.photoTotal)) {
					this.loadStatus = 'nomore'
				}

				console.log('fetch hot Photos ...');
			}
		},
		// 拿接口数据
		fetchData(q) {
			console.log('Tab::', q);
			return new Promise(resolve => {
				this.pending = true
				// const data = mockData.photos.slice(0, 5)
				qLivePhotoDetailByPage({
					pageNum: q.pageNo,
					pageSize: q.pageSize,
					order: q.order
				}).then(res => {
					resolve(res.page || {})
					this.pending = false
					console.log('res::', res);
				})
			})
		},

		/**
		 * @param {Object} item id需不重复
		 */
		onClickPhotoItem(item) {
			if (!this.isActiveSelect) {
				this.showLikePopPage = true
				this.likePhotoItem = item
				console.log('图片分享 ...')
				return
			}

			const pos = this.getSelectItemPos(item)
			if (pos !== -1) {
				this.selected.splice(pos, 1)
			} else {
				this.selected.push(`${item.pictureUrl}`)
			}

			console.log('选择拼图')
		},
		getSelectItemPos(item) {
			return this.selected.indexOf(`${item.pictureUrl}`)
		},

		// 点赞
		likePhoto(item) {
			this.showLikePopPage = true
			this.likePhotoItem = item
			console.log('like::', item);
		},
		// 分享
		sharePhoto(item) {
			console.log('share::', item);
		},
		// 分享图片
		/**
		 * 全选图片
		 */
		selectAllPhoto() {
			this.selected = this.photos.map(item => item.pictureUrl)
		},
		/**
		 * 下载图片
		 */
		async downSelectPhoto() {
			if (this.selected) {
				uni.showLoading({
					title: '正在下载图片'
				})
				for (let item of this.selected) {
					const [error, res] = await uni.downloadFile({
						url: item
					})
					if (res) {
						const saveRes = await uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath
						})
						console.log('保存::', saveRes);
					}
					console.log('下载::', res, error)
				}
				this.selected = []
				uni.hideLoading()
			}
		},
		// 人脸识别
		uploadPic() {
			const id = this.album.id
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: temp => {
					console.log(temp)
					const filePath = temp.tempFilePaths[0]
					uni.showLoading({
						title: '请稍候'
					})
					uni.uploadFile({
						url: uploadHeadPic({
							id
						}),
						fileType: 'image',
						filePath,
						name: 'headPic',
						success: res => {
							const data = JSON.parse(res.data) || {}
							this.myPhotos = data.list || []
							this.uploadStatus = this.myPhotos.length ? 0 : 2
							console.log('uploadPic::', res);
						},
						fail: err => {
							console.error(err)
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}
			})

		},
		// -- 分享 --
		togglePopShare(b) {
			if (b !== undefined) {
				this.isShowPopShare = !!b
			} else {
				this.isShowPopShare = !this.isShowPopShare
			}
		},
		initData() {
			this.album = this.$store.state.livePhoto.album
			this.fetchPhotos()
			getLivePhotoBrowse({id: this.album.id}) // 上报浏览量
		}
	}
}
