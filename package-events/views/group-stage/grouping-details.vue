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
				<view class="group-card_vs_val group-card_vs_flex" v-if="staff !== '1'">
					<text>{{item.ascore == null ? '' : item.ascore}}</text>
					<u-line :color="$utils.themeColor" margin="0 20rpx" length="20" />
					<text>{{item.bscore == null ? '' : item.bscore}}</text>
				</view>
				<view class="group-card_vs_val group-card_vs_flex" v-else>
					<u-input class="zit-inp" v-model="item.ascore" placeholder=" " type="number" input-align="center"
						:border="true" :clearable="false" maxlength="2" />
					<u-line :color="$utils.themeColor" margin="0 20rpx" length="20" />
					<u-input class="zit-inp" v-model="item.bscore" placeholder=" " type="number" input-align="center"
						:border="true" :clearable="false" maxlength="2" />
				</view>
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

		<u-button v-if="staff == '1'" :ripple="true" :custom-style="{backgroundColor: $utils.themeColor, color: '#ffffff'}"
			@click="toSubmit()">提交</u-button>
	</view>
</template>

<script>
	import {
		getEnventsDetail,
		resultSave
	} from '@/api/competition.js'
	export default {
		data() {
			return {
				showScore: false,
				optionObj: {},
				detailsObj: {},
				staff: '',
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
					resultId: this.optionObj.id,
					subjectId: this.optionObj.subjectId,
					matchId: this.optionObj.matchId
				}).then((res) => {
					this.listData = res.list
					this.staff = res.staff
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
			},
			// 提交
			toSubmit() {
				this.$utils.modal('提示', '确定好比分之后点击确定!', true, (res) => {
					if (res) {
						resultSave(this.listData).then((res) => {
							this.$utils.toast("提交成功！")
							uni.navigateBack({
								data: 0
							})
						})
					}
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

				text {
					margin: 0 10rpx;
				}
			}

			&_name {
				color: #7a7a7a;
				font-size: 33rpx;

				view {
					padding: 20rpx 0;
				}
			}

			&_flex {
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
		}
	}

	.group-total {
		margin: 30rpx 10rpx;
	}

	.scoring-formula {
		margin: 20rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;

		&_pre {
			margin: 20rpx 40rpx;
			font-size: 50rpx;
			color: $global-color;
		}
	}

	.zit-inp {
		width: 80rpx;
		height: 80rpx;
		color: $global-color;
	}
</style>
