<template>
	<view class="game-card">
		<u-card v-for="item in gameList"
			:key="item.name"
			:show-head="false"
			:show-foot="false"
			padding="20"
			class="card-wrap"
		 >
				<view class="card-bd" slot="body">
						<u-row gutter="10">
							<u-col span="6">
								<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
							</u-col>
							<u-col span="6" class="card-bd--content">
								<view class="card-bd--title u-line-2">{{ item.title }}</view>
								<view class="card-bd--time">{{ item.time }}</view>
								<u-button type="success">报名中</u-button>
							</u-col>
						</u-row>
	
				</view>
			</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 2,
				count: 4,
				gameList: [
					{ imageSrc: '', title: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', subTitle: 'test sub', time: '2021-01-01', status: 0 },
					{ imageSrc: '', title: 'test', time: '', status: 0 },
					{ imageSrc: '', title: 'test', time: '', status: 0 },
					{ imageSrc: '', title: 'test', time: '', status: 0 },
					{ imageSrc: '', title: 'test', time: '', status: 0 }
				]
			}
		},
		methods: {
			
		},
		onShow() {}
	}
</script>

<style scoped lang="scss">
	
	.game-card {
		padding: 10px 0 20px;
	}


	.card-wrap {}
	
	.card-bd {
		color: #333;
		
		image {
			width: 100%;
			height: 130rpx;
			border-radius: 6rpx;
		}
		
		&--content {}
		
		&--title {
			font-size: 36rpx;
		}
		
		&--time {
			font-size: 30rpx;
			color: #666;
		}
		
	}
	
</style>
