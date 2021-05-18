<template>
	<view>
		<!-- 公告 -->
		<view class="envent-notice">
			<u-notice-bar mode="horizontal" bgColor="#ffffff" :list="textList"></u-notice-bar>
		</view>

		<view class="zit-banner">
			<u-swiper bgColor="#ffffff" name="imgUrl" height="300" :list="listBanner" :effect3d="true"
				effect3d-previous-margin="40" @click="bannerToDetails"></u-swiper>
		</view>

		<view class="scheme">
			<view class="scheme--intro_menu">
				<view class="scheme--intro_menu_icon" v-for="(item, index) in objList" :key="index"
					@click="toHref(item)">
					<u-icon :name="item.icon" size="70"></u-icon>
					<text class="scheme--intro_menu_text">{{item.name}}</text>
				</view>
			</view>
			<!-- 赛事简介 -->
			<view class="scheme--intro">
				<view class="scheme--intro_title">
					<u-section font-size="35" title="赛事简介" :right="false"></u-section>
				</view>
				<view class="scheme--intro_content">
					方案是计划中内容最为复杂的一种。由于一些具有某种职能的具体工作比较复杂，不作全面部署不足以说明问题，因而公文内容构成势必要繁琐一些，一般有指导思想、主要目标、工作重点、实施步骤、政策措施、具体要求等项目。方案的内容多是上级对下级或涉及面比较大的工作，一般都用带“文件头”形式下发，所以不用落款，只有标题、成文时间和正文三部分内容。
				</view>
			</view>

			<!-- 赛事报名 -->
			<view class="scheme--intro">
				<view class="scheme--intro_title">
					<u-section font-size="35" title="赛事报名" :right="false"></u-section>
				</view>
				<view class="scheme--intro_content">
					方案是计划中内容最为复杂的一种。由于一些具有某种职能的具体工作比较复杂，不作全面部署不足以说明问题，因而公文内容构成势必要繁琐一些，一般有指导思想、主要目标、工作重点、实施步骤、政策措施、具体要求等项目。方案的内容多是上级对下级或涉及面比较大的工作，一般都用带“文件头”形式下发，所以不用落款，只有标题、成文时间和正文三部分内容。
				</view>
				<view class="scheme--intro_btn">
					<view class="scheme--intro_btn_icon" @click="toRegister()">
						<u-icon name="file-text" size="50"></u-icon>
						<text class="scheme--intro_btn_text">立即报名</text>
					</view>
				</view>
			</view>

			<!-- 			赛事安排
			<view class="scheme--intro">
				<view class="scheme--intro_title">
					<u-section font-size="35" title="赛事安排" :right="false"></u-section>
				</view>
				<view class="scheme--intro_menu">
					<view class="scheme--intro_menu_icon" v-for="(item, index) in arranList" :key="index">
						<u-icon :name="item.icon" size="70"></u-icon>
						<text class="scheme--intro_menu_text">{{item.name}}</text>
					</view>
				</view>
			</view> -->


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listBanner: [{
					imgUrl: "https://img.zcool.cn/community/015f52598d716700000021298c562f.jpg@1280w_1l_2o_100sh.jpg"
				}],
				
				objList: [{
						name: '签位表',
						icon: '/static/thedraw.png'
					},
					{
						name: '选手名单',
						icon: '/static/roster.png',
						menuUrl: ''
					},
					{
						name: '赛事章程',
						icon: '/static/constitution.png',
						menuUrl: ''
					},
					{
						name: '赛事相册',
						icon: '/static/photoalbum.png',
						menuUrl: '/package-events/views/livephoto/livephoto'
					}
				],
				textList: ['重要信息播报：测试中，具体功能尽情期待！']
			}
		},
		methods: {
			// 
			toHref(item) {
				uni.navigateTo({
					url: item.menuUrl
				})
			},
			toRegister() {
				uni.navigateTo({
					url: '/package-events/views/activity-details/sign-up'
				})
			},
			bannerToDetails() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.envent-notice {}

	.zit-banner {
		margin: 20rpx 0;
	}

	.scheme {
		margin: 0 20rpx;

		&--title {
			text-align: center;
			font-size: 35rpx;
			font-weight: bold;
			padding: 20rpx 0;
		}

		&--intro {
			margin: 40rpx 0;

			&_title {
				margin: 20rpx 0;
				font-size: 35rpx;
				font-weight: bold;
			}

			&_content {
				line-height: 50rpx;
				letter-spacing: 3rpx;
			}

			&_menu {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 20rpx 0;

				&_icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					// background-color: rgba($color: $global-color, $alpha: 0.2);
					border-radius: 50%;
					padding: 15rpx;
				}

				&_text {
					font-size: 20rpx;
					margin-top: 10rpx;
				}
			}

			&_btn {
				display: flex;
				justify-content: center;
				align-items: center;

				&_icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					background-color: rgba($color: $global-color, $alpha: 1);
					border-radius: 10rpx;
					padding: 30rpx 45rpx;
					color: #FFFFFF;
				}

				&_text {
					font-size: 30rpx;
					margin-top: 10rpx;

				}
			}
		}
	}
</style>
