<!-- <template>
	<view class="game-card">
		<u-card v-for="item in gameList" :show-head="false" :show-foot="false" padding="20" class="card-wrap">
			<view class="card-bd" slot="body">
				<u-row @click="entryGame(item)">
					<u-col span="6">
						<image :lazy-load="true" :src="item.imageSrc" mode="aspectFill"></image>
					</u-col>
					<u-col span="6" class="card-bd--content">
						<view class="card-bd--title u-line-2">{{ item.title }}</view>
						<view class="card-bd--time u-p-10">{{ item.time }}</view>
						<u-button :type="getStatusStyle(item.status)" size="mini">{{ item.status | statusStr }}
						</u-button>
					</u-col>
				</u-row>
			</view>
		</u-card>
	</view>
</template>

<script>
	/* 测试数据 -> */
	const mockData = {
		list: [{
				imageSrc: '',
				title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, vel?',
				time: '2021-01-01',
				status: 0
			},
			{
				imageSrc: '',
				title: 'test',
				time: '2021-01-01',
				status: 1
			},
			{
				imageSrc: '',
				title: 'test',
				time: '2021-01-01',
				status: 2
			},
			{
				imageSrc: '',
				title: 'test',
				time: '2021-01-01',
				status: 0
			},
			{
				imageSrc: '',
				title: 'test',
				time: '2021-01-01',
				status: 0
			},
			{
				imageSrc: '',
				title: 'test',
				time: '2021-01-01',
				status: 0
			},
			{
				imageSrc: '',
				title: 'test',
				time: '2021-01-01',
				status: 0
			}
		]
	}
	/* <- 测试数据 */

	export default {
		data() {
			return {
				gameList: []
			}
		},
		filters: {
			statusStr(n) {
				if (n === 0) return '报名中'
				if (n === 1) return '未开始'
				if (n === 2) return '已结束'
			}
		},
		methods: {
			getStatusStyle(n) {
				if (n === 0) return 'primary'
				if (n === 1) return 'success'
				if (n === 2) return 'disable'
			},
			// 进入赛事
			entryGame(item) {
				console.log(item.title, item)
			},
		},
		onLoad() {
			this.gameList = mockData.list // todo
		}
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
			height: 160rpx;
			border-radius: 6rpx;
			background: #eee;
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
 -->