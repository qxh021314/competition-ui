<template>
	<view>
		<video id="myVideo" :title="title" :initial-time="initDuration" @play="play" @pause="pause" :src="videoUrl"
			:poster="posterUrl" :autoplay="autoplay" @error="videoErrorCallback" :danmu-list="danmuList"
			@timeupdate="timeUpdate" :controls="controls" @progress="progress" @ended="ended" :danmu-btn="danmuBtn">
		</video>
	</view>
</template>

<script>
	export default {
		props: {
			videoUrl: { // 视频路径
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			posterUrl: { // 视频封面路径
				type: String,
				default: ''
			},
			insertParams: { // 发送播放记录参数
				type: Object,
				default: function() {
					return {}
				}
			},
			danmuList: { // 弹幕
				type: Array,
				default: function() {
					return []
				}
			},
			controls: {
				type: Boolean,
				default: true
			},
			autoplay: { // 是否自动播放
				type: Boolean,
				default: false
			},
			loop: { // 是否循环播放
				type: Boolean,
				default: false
			},
			muted: { // 是否静音播放	
				type: Boolean,
				default: false
			},
			initialTime: { // 指定视频初始播放位置，单位为秒（s）。
				type: Number,
				default: 1
			},
			danmuBtn: { // 是否显示弹幕按钮，只在初始化时有效，不能动态变更
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				baseImgUrl: '基准路径',
				isPlaying: false, // 播放状态
				pauseing: true, // 暂停状态
				time: 0,
				duration: 0,
				PlatFormType: false,
				videoWidth: 0,
				currentTime: 1,
				videoHeight: 0,
				initDuration: 0
			}
		},
		computed: {

		},
		methods: {
			// 点击播放
			play(e) {
			
			},
			pause(e) {
				this.pauseing = false
			},
			setinsertUserCourseRecord() {
			},
			videoErrorCallback() {},
			timeUpdate(e) {
				
			},
			isDead() {
				console.log('dead');
			},
			progress(e) {
			},
			ended(e) {
			},
			setDuration() {
			}
		},
		mounted() {
			// // #ifdef H5
			// this.videoContext = uni.createVideoContext(`video${this.videoId}`, this)
			// // #endif
			// // #ifdef MP-WEIXIN
			// if (this.phoneType) {
			// 	this.videoContext = uni.createVideoContext('videoWatch', this)
			// } else {
			// 	this.videoContext = uni.createVideoContext(`video${this.videoId}`, this)
			// }
			// // #endif
		},
		watch: {
			videoId: {
				immediate: true,
				handler(newVal, oldVal) {
					if (this.playType && this.phoneType) {
						this.videoContext = uni.createVideoContext('videoWatch', this)
					}
				}
			},
			videoUrl: {
				immediate: true,
				handler(newVal, oldVal) {
					this.duration = this.insertParams.duration
				}
			},
			videoShow(newval, oldval) {
				if (this.homeInx === 0) { // 判断是不是在看视频的时候跳转的---这里可能到时还需要做其他处理
					if (newval) {
						if (this.videoInx === this.presentInx) {
							this.videoContext.play()
							this.$emit('play', true)
						}
					} else {
						if (this.videoContext != undefined) {
							this.videoContext.pause()
						}
						this.$emit('pause', false)
					}
				}
			},
			playType: {
				immediate: true,
				handler(newVal, oldVal) {
					if (newVal) {
						this.videoContext.play()
					} else {
						if (this.videoContext != undefined) {
							this.videoContext.pause()
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-video {
		width: 100%;
		height: 300rpx;
	}
	.video-tit {
		position: absolute;
		background-color: #000000;
		width: 300rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		bottom: 100rpx;
		left: 20rpx;
		border-radius: 10rpx;
		font-size: 20rpx;
		color: #FFFFFF;
	}
</style>
