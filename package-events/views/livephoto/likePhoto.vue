<template>
	<view v-if="show" class="like-photo">
		<view>
			<view class="u-flex u-row-right u-p-40">
				<u-icon name="close" @click="close" size="50" />
			</view>
			<view class="bd" @click="previewImg">
<!--				<image v-if="isOriginal" :src="getOssPicture(data.pictureUrl, '', true)" mode="aspectFill"></image>-->
				<image :src="getOssPicture(data.pictureUrl)" mode="aspectFill"></image>
			</view>
			<view class="footer u-flex u-row-between u-p-l-35 u-p-r-35 u-col-center">
				<view style="display: flex;align-items: center;">
					<u-button size="mini" plain defaultId="defashare" open-type="share">
            <u-icon name="share" size="50"></u-icon>
          </u-button>
				</view>
				<view>
					<u-button type="primary" @click="showOriginalPic">查看高清</u-button>
<!--					<u-button type="primary" @click="showOriginalPic" :disabled="isOriginal">查看高清</u-button>-->
				</view>
				<view @click="addLike" class="w150">
					<u-icon :name="likeCount ? 'thumb-up-fill' : 'thumb-up'" size="50"></u-icon>
					<text class="u-p-l-10 c999 u-font-14">{{ data.likesCount + likeCount }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLivePhotoLike
	} from '@/api/competition.js'
 
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			data: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				likeCount: 0,
				isOriginal: false
			}
		},
		methods: {
			/**
			 * @param {String} url
			 * @param {Number} wsize 默认宽度
			 * @param {Boolean} flag 是否原图
			 */
			getOssPicture(url, wsize = 375, original) {
				if (original) return url
				return `${url}?x-oss-process=image/resize,w_${wsize}`
			},
			showOriginalPic() {
				uni.showLoading({
					title: '请稍候'
				})
				this.isOriginal = true
				setTimeout(uni.hideLoading, 300) // 假loading
        this.previewImg()
			},
			addLike() {
				this.likeCount++
				console.log('add', this.likeCount);
				getLivePhotoLike({id: this.data.id})
			},
			close() {
				this.likeCount = 0
				this.isOriginal = false
				this.$emit('update:show', false)
			},
      previewImg() {
        const pictures = this.data.allList.map(item => item.pictureUrl)
        const pos = pictures.indexOf(this.data.pictureUrl)
        uni.previewImage({
          current: pos,
          urls: pictures,
          longPressActions: {
            itemList: ['保存图片', '发送给朋友'],
            fail: function(err) {
              console.error(err)
            }
          },
          fail: function (err) {
            console.error(err)
          }
        })
      }
		},
		watch: {
			show(b) {
				console.log(b, this.data);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.like-photo {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		color: #fff;
		background: rgba(0, 0, 0, .9);
		z-index: 11;

		&>view {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			height: 100%;
		}

		.bd {
			image {
				height: 400rpx;
			}
		}

		.footer {
			width: 100%;
			height: 120rpx;
			background: rgba($color: #000000, $alpha: 0.3);
		}

		.c999 {
			color: #999;
		}

		.w150 {
			width: 150rpx;
			text-align: right;
		}
	}
</style>

