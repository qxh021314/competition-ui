<template>
	<view>
		<view class="zit-scheme" v-for="index in 1" :key="index" @click="toDetails()">
			<view class="zit-scheme_title u-line-1" v-if="title">
				智慧变电：变电站智慧运检解决方案
			</view>
			<view class="zit-scheme_img">
				<image src="http://pic.616pic.com/bg_w1180/00/14/52/W0OnDtpHCJ.jpg!/fw/1120" mode=""></image>
			</view>
			<view class="zit-scheme_status" v-if="showStatus">
				<text>进行中</text>
			</view>
			<u-section v-if="sectionText" :show-line="false" title=" " sub-title="查看详情"></u-section>
			<u-section v-if="!sectionText" :show-line="false" title=" " sub-title="查看赛况"></u-section>
		</view>
	</view>
</template>

<script>
	import tyVideo from '@/components/ty-video/ty-video.vue'
	export default {
		name: "zit-scheme-card",
		components: {tyVideo},
		props: {
			title: {
				type: Boolean,
				default: false
			},
			showStatus: {
				type: Boolean,
				default: false
			},
			sectionText: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			toDetails() {
				this.$emit('change')
			}
		}
	}
</script>

<style lang="scss" scoped>

	.zit-scheme {
		background-color: #FFFFFF;
		padding: 20rpx;
		margin: 20rpx 0;
		position: relative;
		&_title{
			font-weight: bold;
			font-size: 30rpx;
		}
		&_img{
			width: 100%;
			height: 300rpx;
			margin: 20rpx 0;
		}
		
		&_status{
			position: absolute;
			left: 0rpx;
			top: 15rpx;
			padding: 0 30rpx;
			color: #FFFFFF;
			background-color: #09BB07;
			transform: rotate(-20deg);
		}
	}
</style>
