<template>
	<view class="game-card">
		<u-card v-if="listData && listData.length > 0" v-for="item in listData" :key="item.id" :show-head="false"
			:show-foot="false" padding="20" class="card-wrap">
			<view class="card-bd" slot="body">
				<u-row @click="entryPhoto(item)">
					<u-col span="6">
						<image :lazy-load="true" :src="item.imgUrl" mode="aspectFill"></image>
					</u-col>
					<u-col span="6" class="card-bd--content">
						<view class="card-bd--title u-line-2">{{ item.albumName }}</view>
						<view class="card-bd--time u-p-10">{{ item.createTime }}</view>
					</u-col>
				</u-row>
			</view>
		</u-card>
		<no-data v-else></no-data>
		<view class="placeholder"></view>
		<u-loadmore v-if="listData && listData.length > 0" :status="status" :icon-type="iconType"
			:load-text="contentText" />
	</view>
</template>

<script>
	import {
		qLivePhotoListByPage
	} from '@/api/competition.js'

	export default {
		data() {
			return {
				contentText: {
					loadmore: '上拉显示更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				iconType: 'flower',
				status: 'loading',
				listData: [],
				queryParams: {
					"pageNum": 1,
					"pageSize": 10
				}
			}
		},
		filters: {},
		onReachBottom() {
			if (this.status == 'loading') {
				this.queryParams.pageNum += 1
				this.fetchData()
			}
		},
		methods: {
			getLivePhotoListByPage() {
				qLivePhotoListByPage(this.queryParams).then((res) => {
					const {code , page} = res
					if (code === 0) {
						const records = page.records || []
						this.listData.push(...records)
						if (records.length < 10) {
							this.status = 'nomore'
						} else {
							this.status = 'loading'
						}
					} else {
						this.listData = []
					}
					
					console.log('qLivePhotoListByPage::', res);
					
				})
			},
			// 进入相册
			entryPhoto(item) {
				this.$store.commit('SET_ALBUM', item)
				uni.navigateTo({
					url: '/package-events/views/livephoto/livephoto'
				})
				console.log(item)
			},
			// 请求接口
			fetchData() {
				this.getLivePhotoListByPage()
			}
		},
		onLoad() {
			this.fetchData()
		}
	}
</script>

<style scoped lang="scss">
	.game-card {
		padding: 10px 0 20px;
	}


	.card-wrap {}

	.card-bd {
		color: #333;

		image {
			width: 100%;
			height: 160rpx;
			border-radius: 6rpx;
			background: #eee;
		}

		&--content {}

		&--title {
			font-size: 36rpx;
		}

		&--time {
			font-size: 30rpx;
			color: #666;
		}

	}
</style>
