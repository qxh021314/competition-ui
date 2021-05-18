<template>
	<view>

		<view class="sight-navbar">
			<u-navbar :is-back="false" :border-bottom="false" :title-bold="true" title="方案"
				navbarInnerBackGround="#FFFFFF">
				<view class="u-navbar_left" @click="show = true">
					<!-- <text class="u-navbar_name">{{selectText}}</text> -->
					<u-icon name="/static/filtrate.png" size="40"></u-icon>
					<u-dropdown active-color="#860200">
						<u-dropdown-item v-model="show" :title="selectText" :options="list" @change="confirm">
						</u-dropdown-item>
					</u-dropdown>
				</view>

			</u-navbar>
		</view>

		<zit-scheme-card :title="true" @change="toDetails"></zit-scheme-card>


		<!-- <u-select v-model="show" :list="list" @confirm="confirm"></u-select> -->
	</view>
</template>

<script>
	import zitSchemeCard from '@/components/zit-scheme-card/zit-scheme-card.vue'
	export default {
		components: {
			zitSchemeCard
		},
		data() {
			return {
				show: 1,
				selectText: '筛选',
				list: [{
						value: '1',
						label: '智慧变电'
					},
					{
						value: '2',
						label: '智慧输电'
					}, {
						value: '3',
						label: '智慧变电'
					},
					{
						value: '4',
						label: '智慧输电'
					}
				]
			}
		},
		onLoad() {
			// let comList = []
			// let comObj = {
			// 	value: 1,
			// 	label: '变电'
			// }
			// for (var i = 0; i < 50; i++) {
			// 	comObj.value = i
			// 	comObj.label = '变电' + i
			// 	comList.push(JSON.parse(JSON.stringify(comList)))
			// }
			// this.list = comList
			// console.log(comList);
		},
		methods: {
			confirm(e) {
				this.selectText = this.list[e].label
			},
			toDetails() {
				uni.navigateTo({
					url: '/package-events/views/scheme-details/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sight-navbar {
		background-color: #FFFFFF;
		box-shadow: 10rpx 10rpx 10rpx #e1e1e1;
		margin-bottom: 20rpx;
	}

	.u-navbar_left {
		display: flex;
		align-items: center;
		margin: 0 15rpx;
	}

	.u-navbar_name {
		color: $global-color;
		margin: 0 15rpx;
	}

	/deep/.u-dropdown {
		border-radius: 10rpx;
		flex: 0 0 160rpx;
		// padding: 15rpx 0;
		height: 50rpx;

		.u-dropdown__menu {
			height: 50rpx;

			.u-dropdown__menu__item {
				height: 50rpx;
				width: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				&__text {
					color: $global-color !important;
				}

				.u-icon__icon {
					color: $global-color !important;
				}
			}
		}

		.u-dropdown__content {
			margin-top: -30rpx;

			.u-cell.u-border-bottom {
				padding: 0rpx 20rpx;
				border-radius: 10rpx;
				text-align: center;

				.u-cell_title {
					color: $global-color !important;
				}

				.u-icon__icon {
					width: 26rpx;
					height: 26rpx;
					color: $global-color !important;
				}
			}

			.u-dropdown__content__mask {
				height: 0;
			}
		}

	}
</style>
