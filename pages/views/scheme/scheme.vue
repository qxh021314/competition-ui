<template>
	<view>

		<view class="sight-navbar">
			<u-navbar :is-back="false" :border-bottom="false" title="生态" navbarInnerBackGround="#FFFFFF">
				<view class="u-navbar_left">
					<!-- <text class="u-navbar_name">{{selectText}}</text> -->
					<u-icon name="/static/filtrate.png" size="40"></u-icon>
					<u-dropdown :isOpen="isOpen" active-color="#860200" @open="open" @close="close">
						<u-dropdown-item v-model="show" :title="selectText" :options="list" @change="confirm">
						</u-dropdown-item>
					</u-dropdown>
				</view>

			</u-navbar>
		</view>

		<zit-scheme-card :list-data="listData"></zit-scheme-card>

		<!--		<no-data v-else></no-data>-->
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
				show: -1,
				isOpen: false,
				selectText: '筛选',
				listData: [],
				list: [{
						value: 0,
						label: '智慧变电'
					},
					{
						value: 1,
						label: '智慧输电'
					}, {
						value: 2,
						label: '智慧配电'
					},
					{
						value: 3,
						label: '视觉显示'
					},
					{
						value: 4,
						label: '全部'
					}
				]
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			confirm(e) {
				this.selectText = this.list[e].label
			},
			init() {
				const arr = this.$store.state.scheme.list
				if (this.show === -1 || this.show === 4) {
					this.listData = arr // 默认显示所有
				} else {
					this.listData = this.$store.state.scheme.list.filter(item => item.type === +this.show)
				}
				console.log('type::', this.show, arr)
			},
			open() {
				this.isOpen = true
			},
			close() {
				this.isOpen = false
			}
		},
		watch: {
			show() {
				this.init()
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
		// height: 50rpx;

		.u-dropdown__menu {
			height: 50rpx;

			.u-dropdown__menu__item {
				height: 80rpx;
				width: 160rpx;
				padding-left: 10rpx;
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
				padding: 20rpx 0;
				border-radius: 10rpx;
				text-align: center;

				.u-cell_title {
					width: 100%!important;
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
