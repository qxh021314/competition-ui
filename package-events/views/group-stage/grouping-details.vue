<template>
	<view>
		<view class="group-vs">
			<view class="group-vs_pre">{{detailsObj.ateamName}}</view>
			<u-icon name="/static/vs.png" size="50"></u-icon>
			<view class="group-vs_aft">{{detailsObj.bteamName}}</view>
		</view>

		<view class="group-card" v-for="(item, index) in listData" :key="index">
			<u-section font-size="30" :line-color="$utils.themeColor" :color="$utils.themeColor"
				:title="item.arrangeName" :right="false"></u-section>
			<view class="group-card_vs">
				<view class="group-card_vs_name">
					<view v-for="(item1, index1) in item.aathleteList" :key="index1">{{item1}}</view>
				</view>
				<view class="group-card_vs_val">{{item.ascore}} - {{item.bscore}}</view>
				<view class="group-card_vs_name">
					<view v-for="(item2, index2) in item.bathleteList" :key="index2">{{item2}}</view>
				</view>
			</view>
		</view>

		<view class="group-total">

			<u-section font-size="30" :line-color="$utils.themeColor" :color="$utils.themeColor" title="总比分"
				:right="false">
			</u-section>
			<!-- 计分方式 -->
			<view class="scoring-formula">
				<view class="scoring-formula_pre">
					{{totalScore.ascore}}
				</view>
				<view class="scoring-formula_pre">
					-
				</view>
				<view class="scoring-formula_pre">
					{{totalScore.bscore}}
				</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	import {
		getEnventsDetail
	} from '@/api/competition.js'
	export default {
		data() {
			return {
				optionObj: {},
				detailsObj: {},
				totalScore: {
					ascore: '',
					bscore: ''
				},
				listData: []
			}
		},
		onLoad(options) {
			this.optionObj = options
			this.detailsObj = this.$store.state.sys.sysCache
			this.getEnventsDetail()
		},
		methods: {
			getEnventsDetail() {
				getEnventsDetail({
					id: this.optionObj.id,
					subjectId: this.optionObj.subjectId
				}).then((res) => {
					this.listData = res.list
					let acount = 0
					let bcount = 0
					this.listData.forEach((item, index) => {
						if (item.ascore > item.bscore) {
							acount++
						}
						if (item.bscore > item.ascore) {
							bcount++
						}
					})
					this.totalScore.ascore = acount
					this.totalScore.bscore = bcount
				})
			}
		}
	}
</script>

<style lang="scss">
	.group-vs {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFFFFF;
		padding: 40rpx 0;
	}

	.group-card {
		background-color: #FFFFFF;
		margin: 20rpx 10rpx;
		padding: 20rpx;

		&_vs {
			margin: 20rpx 0;
			display: flex;
			justify-content: space-around;
			align-items: center;

			&_val {
				font-size: 37rpx;
				color: $global-color;
			}

			&_name {
				color: #7a7a7a;
				font-size: 33rpx;

				view {
					padding: 20rpx 0;
				}
			}
		}
	}
	.group-total{
		margin: 30rpx 10rpx;
	}
	.scoring-formula{
		margin: 20rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		&_pre{
			margin: 20rpx 40rpx;
			font-size: 50rpx;
			color: $global-color;
		}
	}
</style>
