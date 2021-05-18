<template>
	<view class="scheme">
		<u-row gutter="16" justify="center">
			<u-col>
				<view class="scheme--title">方案</view>
			</u-col>
		</u-row>

		<!-- 方案简介 -->
		<view class="scheme--intro">
			<view class="scheme--intro_title">
				<u-section font-size="35" title="方案简介" :right="false"></u-section>
			</view>
			<view class="scheme--intro_content">
				方案是计划中内容最为复杂的一种。由于一些具有某种职能的具体工作比较复杂，不作全面部署不足以说明问题，因而公文内容构成势必要繁琐一些，一般有指导思想、主要目标、工作重点、实施步骤、政策措施、具体要求等项目。
				方案的内容多是上级对下级或涉及面比较大的工作，一般都用带“文件头”形式下发，所以不用落款，只有标题、成文时间和正文三部分内容。
			</view>
			<view class="scheme--intro_img">
				<image
					src="https://platform-xrsj.oss-cn-hangzhou.aliyuncs.com/media/20210429/8f74a1810c7c40c8aced49175ba1f1bc.jpg"
					mode=""></image>
			</view>
		</view>

		<!-- 实际案例 -->
		<view class="scheme--intro">
			<view class="scheme--intro_title">
				<u-section font-size="35" title="实际案例" :right="false"></u-section>
			</view>
			<view class="scheme--intro_content">
				1、服务有成效——客观真实
				案例要求具有真实性，案例来源于社工的实务过程，内容能真实和**的呈现助人过程，包括社会工作者与案主的互动过程以及场景描述等。另外，也要求服务是有成效的，能促进服务对象的成长和问题的解决。
				2、凸显专业性——方法技巧运用适当
				能根据对服务对象问题和需求的分析，恰当的运用社会工作的专业方法技巧，体现个案工作的流程，秉持社会工作价值的伦理取向展现社会工作理论与方法的专业魅力。
				3、在书写方面——保持中立、有条理和逻辑、具有保密性
				在案例的书写方面，社工需要做到文字简洁，语句通顺、有条理，有逻辑。客观的记录事实，保持记录的中立性，避免社工的主观判断和评价。案例须尊重案主或其监护人的隐私权，不使用案主的真实姓名，不涉及案主及其家人的工作单位、家庭住址等个人真实信息。
			</view>
			<view class="scheme--intro_img">
				<u-swiper :effect3d="true" :list="list"></u-swiper>
			</view>
		</view>


		<!-- 核心产品 -->
		<view class="scheme--intro">
			<view class="scheme--intro_title">
				<u-section font-size="35" title="核心产品" :right="false"></u-section>
			</view>
			<view class="scheme--intro_content">
				1、服务有成效——客观真实
				案例要求具有真实性，案例来源于社工的实务过程，内容能真实和**的呈现助人过程，包括社会工作者与案主的互动过程以及场景描述等。另外，也要求服务是有成效的，能促进服务对象的成长和问题的解决。
				2、凸显专业性——方法技巧运用适当
				能根据对服务对象问题和需求的分析，恰当的运用社会工作的专业方法技巧，体现个案工作的流程，秉持社会工作价值的伦理取向展现社会工作理论与方法的专业魅力。
				3、在书写方面——保持中立、有条理和逻辑、具有保密性
				在案例的书写方面，社工需要做到文字简洁，语句通顺、有条理，有逻辑。客观的记录事实，保持记录的中立性，避免社工的主观判断和评价。案例须尊重案主或其监护人的隐私权，不使用案主的真实姓名，不涉及案主及其家人的工作单位、家庭住址等个人真实信息。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
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
			margin: 20rpx 0;

			&_title {
				margin: 15rpx 0;
			}

			&_content {
				line-height: 50rpx;
				letter-spacing: 3rpx;
			}

			&_img {
				width: 100%;
				height: 300rpx;
				margin: 20rpx 0;
			}
		}
	}
</style>
