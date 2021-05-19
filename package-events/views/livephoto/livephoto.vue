<template>
	<view class="live-photo">
		<u-card :show-head="false" :foot-border-top="false" margin="0" :border-radius="0">
			<view class="card-bd" slot="body">
				<image src="" mode="aspectFill" />
				<text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure placeat.</text>
			</view>5
			<view slot="foot">
				<view class="u-flex u-row-around">
					<text>123张相册</text>
					<text>888次相册浏览</text>
				</view>

				<u-line class="u-m-t-40 u-m-b-30"></u-line>

				<u-icon name="clock" label="2021-01-01"></u-icon>
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
						<image :src="item.src" mode="aspectFill" />
						<view v-if="isActiveSelect" class="photo-item-select">
							{{ getSelectItemPos(item) | formatSelectedIndex }}
						</view>
					</u-col>
					<u-col v-else span="6"></u-col>
				</u-row>
			</view>
		</view>

		<!-- footer -->
		<view class="live-photo-footer">
			<u-row v-if="!isActiveSelect" align="center">
				<u-col span="4" text-align="center" @click="toggleSelectPhoto(1)">
					<u-icon name="camera" :size="46" />
					<view>拼图</view>
				</u-col>
				<u-col span="4" text-align="center">
					<u-icon name="share" :size="46" />
					<view>分享</view>
				</u-col>
				<u-col span="4" text-align="center">
					<u-icon name="download" :size="46" />
					<view>下载</view>
				</u-col>
			</u-row>

			<!-- 拼图操作栏 -->
			<u-row v-else align="center" class="photo-action">
				<u-col span="6" text-align="center" @click="toggleSelectPhoto(0)">
					取消
				</u-col>
				<u-col span="6" text-align="center" @click="mergeSelectPhoto">
					确认
					<text v-if="selected.length" class="photo-action--badge">{{ selected.length }}</text>
				</u-col>
			</u-row>
		</view>

		<!-- popup -->
		<u-popup v-model="showPopPage" mode="right" length="100%" closeable close-icon-color="#eee"
			close-icon-size="50">
			<view class="pop-page">
				<image :src="mergeImg" mode="widthFix" />
			</view>
		</u-popup>
		<poster v-if="list.length" :list="list" background-color="#FFF" :width="750" :height="height"
			@on-success="posterSuccess" ref="poster" />
		<!-- toast -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import chunkDataWithInUI from '@/utils/chunkArray.js'
	import Poster from '../../components/Poster.vue'

	// mock data ->
	const mockData = {
		photos: [{
				id: 1,
				exif: 'abcd1111',
				src: 'https://c360-o2o.c360dn.com/MTg5ODA1OTY3MjgxNjE4NzMxNjgzMTIy375'
			},
			{
				id: 2,
				exif: 'abcd2222',
				src: 'https://c360-o2o.c360dn.com/MTg5ODA1OTY3MjgxNjE4NzMxNjkzMDk0375'
			},
			{
				id: 3,
				exif: 'abcd2222',
				src: 'https://c360-o2o.c360dn.com/MTg5ODA1OTY3MjgxNjE4NzMxNjkzMDk0375'
			},
			{
				id: 4,
				exif: 'abcd2222',
				src: 'https://c360-o2o.c360dn.com/Fjnp1vNTP0I5UNgCZ193xYYHuF_e375'
			},
			{
				id: 5,
				exif: 'abcd2222',
				src: 'https://c360-o2o.c360dn.com/MTg5ODA1OTY3MjgxNjE4NzMxNjkzMDk0375'
			},
			{
				id: 6,
				exif: 'abcd2222',
				src: 'https://c360-o2o.c360dn.com/MTg5ODA1OTY3MjgxNjE4NDc3NjA3MjMx'
			},
			{
				id: 7,
				exif: 'abcd3333',
				src: 'https://c360-o2o.c360dn.com/MTg5ODA1OTY3MjgxNjE4NzMxNjkzMDk0375'
			}
		]
	}
	// <- mock data

	export default {
		components: {
			Poster
		},
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
				photos: [],
				list: [],
				selected: [],
				isActiveSelect: false,
				showPopPage: false,
				height: 1200,
				mergeImg: '' // 合并后的图片 - base64
			}
		},
		computed: {
			photosUI() {
				return chunkDataWithInUI(this.photos, 2)
			}
		},
		filters: {
			formatSelectedIndex(n) {
				return (n + 1) || ''
			}
		},

		methods: {
			posterSuccess(e) {
				this.showPopPage = true
				uni.hideLoading()
				this.mergeImg = e
			},

			photoPoster() {
				let list = []
				list.push({
					type: 'image',
					path: 'https://img.zcool.cn/community/015f52598d716700000021298c562f.jpg@1280w_1l_2o_100sh.jpg',
					x: 0,
					y: 100,
					width: 750,
					height: 350
				})
				list.push({
					type: 'image',
					x: 0,
					y: 450,
					width: 750,
					height: 350,
					path: 'https://img.zcool.cn/community/015f52598d716700000021298c562f.jpg@1280w_1l_2o_100sh.jpg'
				})
				list.push({
					type: 'image',
					x: 0,
					y: 800,
					width: 750,
					height: 350,
					path: 'https://img.zcool.cn/community/015f52598d716700000021298c562f.jpg@1280w_1l_2o_100sh.jpg'
				})
				this.calculate(list)
			},

			changeTab(n) {
				this.currentTab = n
			},
			toggleSelectPhoto(n) {
				this.isActiveSelect = !!n
				if (!this.isActiveSelect) {
					this.selected = []
				}
			},
			/**
			 * @param {Object} item id需不重复
			 */
			onClickPhotoItem(item) {
				if (!this.isActiveSelect) {
					console.log('图片分享 ...')
					return
				}

				const pos = this.getSelectItemPos(item)
				if (pos !== -1) {
					this.selected.splice(pos, 1)
				} else {
					this.selected.push(`${item.src}?${item.id}`)
				}

				console.log('选择拼图')
			},
			getSelectItemPos(item) {
				return this.selected.indexOf(`${item.src}?${item.id}`)
			},
			/**
			 * 合图
			 */
			mergeSelectPhoto() {
				
				this.list = []
				this.$nextTick(function(){
					this.calculate(this.selected)
				})
				uni.showLoading({
					mask: true,
					title: '请稍候...'
				})
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
			}
		},
		onLoad() {
			this.photos = mockData.photos
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
			min-height: 400rpx;
			background: #fff;
		}

		.photo-item {
			image {
				width: 100%;
				height: 200rpx;
				background: #eee;
				border-radius: 8rpx;
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
			color: #999;
			font-size: 24rpx;
			padding-top: 10rpx;


			.u-row {
				height: 100%;
			}

			.u-col:active {
				opacity: .8;
			}


			.photo-action {
				font-size: 30rpx;
				line-height: $bottomBarHeight;

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

	}
</style>
