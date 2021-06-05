<template>
	<view>
		<view class="z-tabs">
			<u-tabs name="subjectName" :list="listTab" :active-color="titleColor" bar-width="120" :is-scroll="true"
				:current="current" @change="change"></u-tabs>
		</view>

		<view class="z-select">
			<view class="z-select_btn z-select_pre"
				:style="[ industryIndexList.indexOf(index) >= 0 ? styleAfter : styleBefore ]"
				v-for="(item, index) in grouplist" :key="index" @click="selectGroup(item, index)">{{item.stageName}}
			</view>
		</view>

		<!-- 比赛表格 -->
		<view class="" v-if="groupCurrent == 0">
			<scroll-view scroll-x="true" style="width: 100%;overflow:hidden;background-color: #FFFFFF;"
				:show-scrollbar="true">
				<view class="">
					<view class="" v-for="(itemparent, indexparent) in dataObj.teamList" :key="indexparent">
						<view class="group-flex_tab">
							<view class="group-name">
								{{itemparent.groupName}}
							</view>
							<view class="" v-if="getStaff == '1'">
								<u-button :ripple="true" size="mini"
									:custom-style="{backgroundColor: $utils.themeColor, color: '#ffffff'}"
									@click="toRanking(itemparent)">名次</u-button>
							</view>
						</view>


						<u-table bg-color="#FFFFFF">
							<u-tr>
								<u-th v-for="(item, index) in itemparent.teamList" :key="index">
									<view class="zit-td" v-if="index == 0">
										<view class="diagonal" :style="{'width': grpWidth}"></view>
									</view>
									<view class="zit-td" v-else>
										{{item.teamName}}
									</view>
								</u-th>
								<u-th>
									<view class="zit-td">
										名次
									</view>
								</u-th>
							</u-tr>

							<u-tr v-for="(item, index) in  itemparent.matchList" :key="index">
								<u-td v-for="(itemchild,indexchild) in item" :key="indexchild">
									<view class="zit-td" @click="toHref(itemchild)">
										{{itemchild.name}}
									</view>
								</u-td>
								<u-td>
									<view class="zit-td">
										{{item[0].ranking}}
									</view>
								</u-td>
							</u-tr>
						</u-table>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="" v-if="groupCurrent == 1">
			<view class="group-flex u-border-top">
				<view class="group-flex_tabs"
					:style="[ enventsIndexList.indexOf(index) >= 0 ? styleAfter : styleBefore ]"
					v-for="(item, index) in enventsList" :key="index" @click="selectEnvents(item, index)">
					{{item.stageName}}
				</view>
			</view>


			<view class="group--vs u-border" v-for="(item, index) in eventsResultList" :key="index"
				@click="toHref(item)">
				<view class="group--vs_pre">
					<text class="group--vs_pre_name">{{item.ateamName}}</text>
					<text class="group--vs_pre_val" v-if="item.ascoreList.length > 0">
						<text style="margin: 0 20rpx;" v-for="(itemchild, indexchild) in item.ascoreList"
							:key="indexchild">{{itemchild}}</text>
					</text>
					<text class="group--vs_pre_val" v-else>0</text>
				</view>
				<u-divider color="#fa3534" half-width="100%">VS</u-divider>
				<view class="group--vs_pre">
					<text class="group--vs_pre_name">{{item.bteamName}}</text>
					<text class="group--vs_pre_val" v-if="item.bscoreList.length > 0">
						<text style="margin: 0 20rpx;" v-for="(itemchild, indexchild) in item.bscoreList"
							:key="indexchild">{{itemchild}}</text>
					</text>
					<text class="group--vs_pre_val" v-else>0</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		stageList,
		resultList,
		getApplyInfo
	} from '@/api/competition.js'
	export default {
		data() {
			return {
				titleColor: this.$utils.themeColor,
				styleBefore: {
					backgroundColor: '#ffffff',
					border: '1rpx solid #8f8f8f',
					'color': '#000000'
				},
				styleAfter: {
					backgroundColor: this.$utils.themeColor,
					border: '1rpx solid #8f8f8f',
					'color': '#ffffff'
				},
				industryIndexList: [0],
				enventsIndexList: [0],
				enventsList: [],
				eventsResultList: [],
				matchId: '',
				subjectId: '',
				current: 0,
				groupCurrent: 0,
				enventsCurrent: 0,
				grouplist: [],
				dataObj: {
					matchResult: [],
					teamList: []
				},
				listTeam: [],
				listData: [],
				listTab: []
			}
		},
		computed: {
			grpWidth() {
				console.log(this.dataObj.teamList[0]);
				let width = 0
				if (this.dataObj.teamList[0]) {
					console.log(this.dataObj.teamList[0].teamList.length);
					width = Math.pow(162 * this.dataObj.teamList[0].teamList.length, 2) + Math.pow(95 * this
						.dataObj.teamList[0].teamList.length, 2)
				}
				return Math.sqrt(width) + 'rpx'
				// return '0rpx'
			},
			getStaff() {
				return this.$store.state.userService.staff
			}
		},
		onLoad(options) {
			this.matchId = options.id
		},
		onShow() {
			this.getApplyInfo()
		},
		methods: {
			// 跳转名次
			toRanking(e) {
				uni.navigateTo({
					url: `../ranking/ranking?groupId=${e.groupId}`
				})
			},
			getApplyInfo() {
				getApplyInfo({
					matchId: this.matchId
				}).then((res) => {
					this.matchInfo = res.matchInfo
					this.listTab = res.list
					this.subjectId = this.listTab[0].id
					this.getStageList(1)
				})
			},
			getStageList(type = 1) {
				stageList({
					subjectId: this.subjectId,
					type: type
				}).then((res) => {
					if (res.list && res.list.length > 0) {
						if (type == '1') {
							this.grouplist = res.list
							this.getResultList(type, this.grouplist[0].id)
						} else {
							this.enventsList = res.list
							this.getResultList(type, this.enventsList[this.enventsCurrent].id)
						}
					}
				})
			},
			// 表格数据
			getResultList(type, stageId) {
				resultList({
					subjectId: this.subjectId,
					type: type,
					stageId: stageId
				}).then((res) => {
					if (type == '1') {
						this.dealTable(res.matchResult, res.teamList)
					} else {
						this.eventsResultList = res.matchResult
					}
				})
			},

			// 表格数据处理
			dealTable(matchResult, teamList) {
				teamList.forEach((item, index) => {
					item.matchList = []
					item.teamList.forEach((itemchild, indexchild) => {
						console.log(itemchild);
						let obj = {
							name: itemchild.teamName,
							aTeamName: '',
							ranking: itemchild.ranking || "",
							bTeamName: '',
							matchId: '',
							id: ''
						}
						let objList = []
						let objChildList = []
						objChildList.push(JSON.parse(JSON.stringify(obj)))
						if (matchResult && matchResult.length > 0) {
							matchResult.forEach((filterItem, filterIndex) => {
								if (itemchild.id == filterItem.ateamId) {
									obj.name = filterItem.ascore + '-' + filterItem.bscore
									obj.id = filterItem.id
									obj.matchId = filterItem.matchId
									obj.ateamName = filterItem.ateamName
									obj.bteamName = filterItem.bteamName
									if (filterItem.ascore == '-100' || filterItem.bscore ==
										'-100') {
										obj.name = ''
									}
									objChildList.push(JSON.parse(JSON.stringify(obj)))
								}
								if (itemchild.id == filterItem.bteamId) {
									obj.name = filterItem.bscore + '-' + filterItem.ascore
									obj.id = filterItem.id
									obj.matchId = filterItem.matchId
									obj.ateamName = filterItem.ateamName
									obj.bteamName = filterItem.bteamName
									if (filterItem.ascore == '-100' || filterItem.bscore ==
										'-100') {
										obj.name = ''
									}
									objChildList.push(JSON.parse(JSON.stringify(obj)))
								}
							})
						} else {
							let leng = item.teamList.length - 1
							for (var i = 0; i < leng; i++) {
								objChildList.push({
									name: ''
								})
							}
						}
						// if (objChildList.length < item.teamList.length) {
						// 	objChildList.push(JSON.parse(JSON.stringify({name: ''})))
						// }

						objChildList.splice(indexchild + 1, 0, {
							name: ''
						});
						objList.push(objChildList)
						item.matchList.push(...objList)
					})
					let listTeam = [{}]
					listTeam.push(...item.teamList)
					item.teamList = listTeam
				})
				console.log(teamList);
				this.dataObj.teamList = teamList
				
			},

			// 分组
			selectGroup(item, index) {
				this.industryIndexList = []
				this.industryIndexList.push(index)
				this.groupCurrent = index
				this.getStageList(index + 1)
				// this.getResultList(item.type, item.id)
			},

			selectEnvents(item, index) {
				this.enventsIndexList = []
				this.enventsIndexList.push(index)
				this.enventsCurrent = index
				this.getResultList('2', this.enventsList[this.enventsCurrent].id)
			},
			// 比赛详情
			toHref(e) {
				console.log(e);
				if (this.$utils.isNotBlank(e.id)) {
					this.$store.commit('SET_SYS_CACHE', e)
					this.$utils.togo('/package-events/views/group-stage/grouping-details', {
						id: e.id,
						subjectId: this.subjectId,
						matchId: e.matchId
					})
					// uni.navigateTo({
					// 	url: `/package-events/views/group-stage/grouping-details?id=${e.id}&subjectId=${this.subjectId}`
					// })
				}
			},

			change(e) {
				this.dataObj.matchResult = []
				this.dataObj.teamList = []
				this.grouplist = []
				this.enventsList = []
				this.current = e
				this.groupCurrent = 0
				this.industryIndexList = [0]
				this.subjectId = this.listTab[e].id
				this.getStageList(1)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.z-select {
		display: flex;
		justify-content: space-between;
		margin: 40rpx 20rpx;

		&_btn {
			padding: 15rpx 0;
			width: 300rpx;
			text-align: center;
		}

		&_pre {
			background-color: #007AFF;
			color: #FFFFFF;
			border-radius: 10rpx;
		}

		&_aft {
			background-color: #09BB07;
			color: #FFFFFF;
			border-radius: 10rpx;
		}
	}

	.zit-td {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 75rpx;
		width: 150rpx;
		font-size: 30rpx;
	}

	.diagonal {
		position: absolute;
		top: 0;
		left: 0;
		height: 1rpx;
		background-color: rgb(228, 231, 237);
		transform-origin: left;
		transform: rotate(29.8deg);
	}

	.group-name {
		padding: 20rpx;
		color: $global-color;
		font-weight: bold;
		letter-spacing: 5rpx;
	}

	.group-flex {
		display: flex;
		flex-wrap: wrap;
		padding: 30rpx 0;

		&_tabs {
			flex: 0 0 31.3%;
			padding: 15rpx;
			border-radius: 10rpx;
			margin: 10rpx 1%;
			text-align: center;
		}



	}

	.group {
		&--vs {
			margin: 20rpx 10rpx;
			padding: 20rpx;
			border-radius: 20rpx;

			&_pre {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;

				&_name {
					font-weight: bold;
					font-size: 30rpx;
				}

				&_val {
					font-size: 30rpx;
					color: #007AFF;
				}
			}
		}
	}

	.group-flex_tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
