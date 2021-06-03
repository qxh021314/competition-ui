<template>
	<view class="ranking">
		<view class="ranking-card" v-for="(item, index) in list" :key="index">
			<view class="ranking-card_name">
				<view class="ranking-card_name_mc">
					名次: {{item.ranking || ''}}
				</view>
				<view class="">
					团队: {{item.teamName}}
				</view>
			</view>
			<view class="ranking-card_inp">
				<u-input class="zit-inp" v-model="item.ranking" placeholder=" " type="number" input-align="center"
					:border="true" :clearable="false" maxlength="2" />
			</view>
		</view>

		<u-button :ripple="true"
			:custom-style="{backgroundColor: $utils.themeColor, color: '#ffffff', margin: '80rpx 0'}"
			@click="toSubmit()">提交</u-button>
	</view>
</template>

<script>
	import {getListTeam,setRanking} from '@/api/competition.js'
	export default {
		data() {
			return {
				bscore: '',
				groupId: '',
				list: []
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: 'A组名次'
			});
			this.groupId = option.groupId
			this.getListTeam()
		},
		methods: {
			toSubmit() {
				this.$utils.modal('提示', '确认好名次后点击确定!', true, (res) => {
					if (res) {
						setRanking(this.list).then(res => {
							this.$utils.toast('保存成功!')
							uni.navigateBack({
								data: 0
							})
						})
					}
				})
			},
			getListTeam() {
				getListTeam({
					groupId: this.groupId
				}).then(res => {
					console.log(res);
					this.list = res.list
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ranking {
		margin: 20rpx;
	}

	.ranking-card {
		position: relative;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		margin: 30rpx 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&_name {
			flex: 1;
			font-size: 35rpx;
			font-weight: bold;
			&_mc{
				font-size: 30rpx;
				width: 200rpx;
				background-color: $global-color;
				text-align: center;
				padding: 10rpx 0;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				color: #FFFFFF;
			}
			
		}

	}

	.zit-inp {
		width: 80rpx;
		height: 80rpx;
		color: $global-color;
		font-size: 35rpx;
		border-color: $global-color !important;
	}
	/deep/ .u-input__input{
		width: 80rpx;
		height: 80rpx;
	}
</style>
