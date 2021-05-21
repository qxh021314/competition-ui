<template>
	<view class="live-photo">
		<u-card :show-head="false" :foot-border-top="false" margin="0" :border-radius="0">
			<view class="card-bd" slot="body">
				<image :src="album.imgUrl" mode="aspectFill" />
				<text>{{ album.albumName }}</text>
			</view>5
			<view slot="foot">
				<view class="u-flex u-row-around u-m-b-20">
					<text>{{ albumTotal }}张相册</text>
					<text>{{ album.browseCount }}次相册浏览</text>
				</view>
				<u-line></u-line>
				<u-icon class="u-m-t-50" name="clock" label="2021-01-01"></u-icon>
			</view>
		</u-card>

		<u-tabs :list="tabs" :is-scroll="false" :current="currentTab" @change="changeTab">
		</u-tabs>

		<!--  tab pannel  -->
		<view class="tab-pannel">
			<view v-if="currentTab === 0" class="u-p-20">
				<u-row class="photo-item" v-for="(row, index) in photosUI" :key="index">
					<u-col v-for="(item, indexchild) in row" :key="indexchild" v-if="item" class="photo-item-bd"
						span="6" @click="onClickPhotoItem(item)">
						<image :src="getOssPicture(item.pictureUrl)" mode="aspectFill" />
						<view v-if="isActiveSelect" class="photo-item-select">
							<u-icon v-if="selected.length && (selected.length===photos.length)" name="checkmark">
							</u-icon>
							<text v-else>{{ getSelectItemPos(item) | formatSelectedIndex }}</text>
						</view>
					</u-col>
					<u-col v-else span="6"></u-col>
				</u-row>
			</view>

			<view v-if="currentTab === 1" class="u-p-20">
				<u-row class="photo-item hot" v-for="(item, index) in hotPhotos" :key="index">
					<u-col class="photo-item-bd" @click="onClickPhotoItem(item)">
						<image :src="getOssPicture(item.pictureUrl)" mode="aspectFill" />
					</u-col>
					<u-col>
						<view class="u-flex u-row-right u-p-30">
							<view @click="likePhoto(item)">
								<u-icon name="thumb-up" size="40" color="#999" />
								<text class="u-p-l-5 u-m-r-35 u-font-12">100点赞</text>
							</view>
							<u-icon name="share" size="50" color="#333" @click="sharePhoto(item)" />
						</view>
					</u-col>
				</u-row>
			</view>

			<view v-if="currentTab === 2" class="u-p-20">
				<u-row class="photo-item" v-for="(row, index) in myPhotosUI" :key="index">
					<u-col v-for="(item, indexchild) in row" :key="indexchild" v-if="item" class="photo-item-bd"
						span="6" @click="onClickPhotoItem(item)">
						<image :src="getOssPicture(item.pictureUrl)" mode="aspectFill" />
						<view v-if="isActiveSelect" class="photo-item-select">
							<u-icon v-if="selected.length && (selected.length===photos.length)" name="checkmark">
							</u-icon>
							<text v-else>{{ getSelectItemPos(item) | formatSelectedIndex }}</text>
						</view>
					</u-col>
					<u-col v-else span="6"></u-col>
				</u-row>
			</view>

			<view class="u-p-t-30 u-p-b-50">
				<u-loadmore :status="loadStatus" :load-text="loadText" @loadmore="updateTabData" />
			</view>
		</view>



		<!-- footer -->
		<view class="live-photo-footer">

			<view v-if="!isActiveSelect" class="photo-action u-text-center u-font-sm">
				<view @click="toggleSelectPhoto(1)">
					<u-icon name="camera" :size="46" />
					<view>拼图</view>
				</view>

				<view @click="togglePopShare">
					<u-icon name="share" :size="46" />
					<view>分享</view>
				</view>

				<view @click="toggleSelectPhoto(2)">
					<u-icon name="download" :size="46" />
					<view>下载</view>
				</view>
			</view>

			<!-- 拼图操作栏 -->
			<template v-else>
				<view v-if="isActiveSelect===1" class="photo-action u-font-34">
					<text @click="toggleSelectPhoto(0)">取消</text>
					<view @click="mergeSelectPhoto">
						<text>确认</text>
						<text v-if="selected.length" class="photo-action--badge">{{ selected.length }}</text>
					</view>
				</view>

				<view v-if="isActiveSelect===2" class="photo-action u-font-34">
					<text @click="selectAllPhoto">全选</text>
					<view>
						<text @click="toggleSelectPhoto(0)">取消</text>
						<text class="u-p-l-30 u-p-r-30">|</text>
						<text @click="downSelectPhoto">下载</text>
						<text v-if="selected.length" @click="downSelectPhoto"
							class="photo-action--badge">{{ selected.length }}</text>
					</view>
				</view>

			</template>
		</view>


		<!-- popup - 合图 -->
		<u-popup v-model="showPopPage" mode="right" length="100%" closeable close-icon-color="#eee"
			close-icon-size="50">
			<view class="pop-page">
				<image :src="mergeImg" mode="widthFix" />
			</view>
		</u-popup>
		<poster v-if="list.length" :list="list" background-color="#FFF" :width="750" :height="height"
			@on-success="posterSuccess" ref="poster" />

		<!-- popup - 分享按钮 -->
		<u-popup v-model="isShowPopShare" mode="bottom">
			<view class="u-flex u-row-around u-text-center u-p-t-40 u-p-b-40">
				<view>
					<view class="u-m-b-20">
						<u-icon name="grid" size="80" color="#333" />
					</view>
					<u-button plain open-type="share">二维码分享</u-button>
				</view>

				<view>
					<view class="u-m-b-20">
						<u-icon name="attach" size="80" color="#333" />
					</view>
					<u-button plain @click="copyShareLink">链接分享</u-button>
				</view>
			</view>
		</u-popup>

		<!-- popup - 点赞 -->
		<like-photo :show.sync="showLikePopPage" :data="linkPhotoItem" />

		<!-- toast -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import chunkDataWithInUI from '@/utils/chunkArray.js'
	import Poster from '../../components/Poster.vue'
	import LikePhoto from './likePhoto.vue'

	import {
		qLivePhotoDetailByPage,
		getLivePhotoBrowse
	} from '@/api/competition.js'

	// mock data ->
	// import { mockData } from './mock.js'
	// <- mock data

	// 配置小程序分享
	// 链接
	const MPLINK = 'mp://test'
	// 二维码
	const MPCODEIMG = 'https://ypjc-resource.c360dn.com/jony/galleryH5/resource/images/shareQr_new.png'


	export default {
		components: {
			Poster,
			LikePhoto
		},
		data() {
			return {
				album: {}, // 相册信息
				albumTotal: 0,
				
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

				// 分页
				page: {
					size: 10, // 一页条数
					photoNo: 1,
					hotNo: 1,
					myNo: 1,
					photoTotal: 1,
					hotTotal: 1,
					myTotal: 1
				},
				pending: false, // 数据请求中
				// 点赞
				showLikePopPage: false,
				linkPhotoItem: {},

				list: [],
				selected: [],
				isActiveSelect: 0,
				showPopPage: false,
				height: 1200,
				mergeImg: '', // 合并后的图片 - base64
				isShowPopShare: false,
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
			}
		},
		filters: {
			formatSelectedIndex(n) {
				return (n + 1) || ''
			}
		},
		onReachBottom() {
			if (!this.pending) this.updateTabData()
		},
		watch: {
			showLikePopPage(b) {
				if (!b) this.linkPhotoItem = {}
			}
		},
		methods: {
			// Data ->
			updateTabData() {
				if (this.currentTab === 0) this.fetchPhotos();
				if (this.currentTab === 1) this.fetchHotPhotos();
				if (this.currentTab === 2) this.fetchMyPhotos();
			},
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
			async fetchMyPhotos() {
				if (this.page.myNo > this.page.myTotal) {
					this.loadStatus = 'nomore'
					console.log('nomore ...');
				} else {
					const q = {
						pageNo: this.page.myNo,
						pageSize: this.page.size
					}
					const page = await this.fetchData(q)
					const records = page.records || []
					this.myPhotos.push(...records)
					this.page.myTotal = page.pages
					this.page.myNo++
					
					if (!records.length || (this.page.myNo === this.page.myTotal)) {
						this.loadStatus = 'nomore'
					}
					
					console.log('fetch my Photos ...');
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
			// <-

			posterSuccess(e) {
				this.showPopPage = true
				uni.hideLoading()
				this.mergeImg = e
			},
			changeTab(n) {
				this.currentTab = n
				this.updateTabData()
			},
			toggleSelectPhoto(n) {
				this.isActiveSelect = n
				if (!this.isActiveSelect) {
					this.selected = []
				}
			},
			/**
			 * @param {Object} item id需不重复
			 */
			onClickPhotoItem(item) {
				if (!this.isActiveSelect) {
					this.showLikePopPage = true
					this.linkPhotoItem = item
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
			
			/**
			 * @param {String} url
			 * @param {Number} wsize 默认宽度
			 * @param {Boolean} original 是否原图
			 */
			getOssPicture(url, wsize = 375, original) {
				if (original) return url
				return `${url}?x-oss-process=image/resize,w_${wsize}`
			},

			/**
			 * 合图
			 */
			mergeSelectPhoto() {
				this.list = []
				if (this.selected.length) {
					const list = this.selected.map(item => this.getOssPicture(item, 750))
					this.$nextTick(function() {
						this.calculate(list)
					})
					uni.showLoading({
						mask: true,
						title: '请稍候...'
					})
				}
			},
			/**
			 * 合图计算位置
			 * @param {Object} num 图片数量
			 */
			calculate(imgList) {
				this.height = 100 + imgList.length * 350
				let mergeImg = {
					type: 'image',
					path: '',
					x: 0,
					y: 0,
					width: 750,
					height: 350
				}
				let y = 100
				let list = []
				for (var i = 0; i < imgList.length; i++) {
					mergeImg.y = y
					mergeImg.path = imgList[i]
					list.push(JSON.parse(JSON.stringify(mergeImg)))
					y = mergeImg.y + mergeImg.height
					console.log(mergeImg);
				}
				this.list = list
			},

			// 点赞
			likePhoto(item) {
				this.showLikePopPage = true
				this.linkPhotoItem = item
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
			// -- 分享 --
			togglePopShare(b) {
				if (b !== undefined) {
					this.isShowPopShare = !!b
				} else {
					this.isShowPopShare = !this.isShowPopShare
				}
			},
			copyShareLink() {
				uni.setClipboardData({
					data: MPLINK,
					success: () => {
						this.togglePopShare(false)
						uni.showToast({
							title: '复制成功'
						})
					}
				})
			},
			initData() {
				this.album = this.$store.state.livePhoto.album
				this.fetchPhotos()
				getLivePhotoBrowse({id: this.album.id}) // 上报浏览量
			}
		},
		onLoad() {
			this.initData()
		},

		onShareAppMessage() {
			return {
				title: '分享二维码',
				imageUrl: MPCODEIMG
			}
		}
	}
</script>

<style lang="scss">
	.live-photo {
		$bottomBarHeight: 120rpx;

		padding-bottom: $bottomBarHeight;

		.card-bd {
			display: flex;
			justify-content: center;
			flex-direction: column;

			image {
				width: 100%;
				height: 340rpx;
				background: #eee;
				border-radius: 6px;
			}

			text {
				padding: 20rpx 10rpx 0;
			}
		}

		.tab-pannel {
			width: 100%;
			min-height: 450rpx;
			background: #fff;
		}

		.photo-item {
			image {
				width: 100%;
				height: 200rpx;
				background: #eee;
				border-radius: 8rpx;
			}

			&.hot {
				image {
					height: 400rpx;
				}

				text {
					color: #999;
				}
			}

			&-bd {
				position: relative;
			}

			// 兼容小程序
			.u-col.u-col-6 {
				position: relative;
			}

			&-select {
				position: absolute;
				right: 24rpx;
				bottom: 24rpx;
				background: #fff;
				width: 54rpx;
				height: 54rpx;
				border-radius: 100%;
				border: 1px solid #333;
				display: flex;
				justify-content: center;
				align-items: center;

				&--down {
					background: #333;
					border: 1px solid #fff;
				}
			}
		}

		.live-photo-footer {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: $bottomBarHeight;
			border-top: 1px solid #c7c7c7;
			background: #f9f9f9;
			color: #333;
			z-index: 10;


			.u-row {
				height: 100%;
			}

			.u-col:active {
				opacity: .8;
			}


			.photo-action {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: $bottomBarHeight;
				padding: 0 100rpx;

				&--badge {
					margin-left: 10rpx;
					padding: 0 20rpx;
					border: 1px solid #999;
					background: #f8f8f8;
					border-radius: 20rpx;
					font-size: 24rpx;
				}
			}
		}

		.pop-page {
			image {
				width: 100%;
			}
		}

		.pop-page-like {
			.u-drawer {
				background: #000;
			}
		}
	}
</style>
