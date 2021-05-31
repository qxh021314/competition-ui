<template>
	<view>

		<select-tabs name="stageName" :isCancel="false" v-if="group1list && group1list.length > 0" :list="group1list"
			@change="selectTabs"></select-tabs>

		<!-- 		<view class="z-tabs">
			<u-tabs name="arrangeName" :list="listTab" :active-color="titleColor" bar-width="120" :is-scroll="true"
				:current="current" @change="change"></u-tabs>
		</view> -->

		<select-tabs name="arrangeName" :isCancel="false" v-if="listTab && listTab.length > 0" :list="listTab"
			@change="selectArrange"></select-tabs>


		<view class="group-user">
			<view class="players-list_flex">
				<view class="players-list_user u-border" @click="changeBox(itemchild)"
					v-for="(itemchild, indexchild) in listData" :key="indexchild">
					<text>{{itemchild.name}}</text>
				</view>
			</view>
		</view>

		<view class="group-user group-user_card">
			<u-section :title="paramsObj.stageName + '/' + paramsObj.arrangeName" :right="false"
				:color="$utils.themeColor">
			</u-section>
			<view class="players-list_flex">
				<view class="players-list_user u-border" v-for="(itemchild, indexchild) in pramsList" :key="indexchild"
					v-show="itemchild.stageId == paramsObj.stageId && itemchild.arrangeId == paramsObj.arrangeId">
					<text>{{itemchild.name}}</text>
					<u-icon name="close-circle" size="40" class="close-circle_tip" color="#ff0000"
						v-if="teamRole == '1'" @click="deleteCircle(itemchild, indexchild)"></u-icon>
				</view>
			</view>
		</view>

		<view class="group-user">
			<view class="select--name">
				<u-section :color="$utils.themeColor" :title="teamName" :right="false"></u-section>
			</view>
			<view class="group-user_back" v-for="(itemparent, indexparent) in groupSortList" :key="indexparent">
				<u-section :title="itemparent[0].stageName + '/' + itemparent[0].arrangeName" :right="false">
				</u-section>
				<view class="players-list_flex">
					<view class="players-list_user u-border" v-for="(itemchild, indexchild) in itemparent"
						:key="indexchild">
						<text>{{itemchild.name}}</text>
					</view>
				</view>

			</view>
		</view>

		<view class="select--vs">
			<u-icon name="/static/vs.png" size="90"></u-icon>
		</view>
		<view class="group-user">
			<view class="select--name" @click="selectTeam()">
				<u-section :color="$utils.themeColor" :title="vsTeamName" sub-title="更多"></u-section>
			</view>
		</view>

		<u-select value-name="resultId" label-name="teamName" v-model="teamShow" :list="teamList"
			@confirm="confirmTeam"></u-select>

		<view class="group-btn group-bc" @click="toBc()" v-if="teamRole == '1' && showBtn">
			<text class="">暂存</text>
		</view>

		<view class="group-btn" @click="toSave()" v-if="teamRole == '1' && showBtn">
			<text class="">确认分组</text>
		</view>

	</view>
</template>

<script>
	import {
		listAthleteByTeam,
		arrangeList,
		arrangeSave,
		stageListAll,
		listMatchTeam
	} from '@/api/competition.js'
	import {
		sortClass
	} from '@/utils/dataGrouping.js'
	import SelectTabs from '../../components/select-tabs.vue'
	export default {
		components: {
			SelectTabs
		},
		data() {
			return {
				listData: [],
				listTab: [],
				pramsList: [],
				saveList: [],
				group1list: [], // 
				paramsObj: {
					"id": "",
					"stageId": "",
					"arrangeId": "",
					"subjectId": "",
					"matchId": "",
					"stageName": "",
					"arrangeName": "",
					"teamId": "",
					"resultId": "",
					"bTeamName": "",
					"name": ""
				},
				groupSortList: [],
				teamShow: false, // 队伍下拉框
				teamList: [], // 队伍数组
				teamName: '', // 队伍名称
				vsTeamName: '点击选择队伍', // 对抗的队伍名称
				subjectId: '',
				teamId: '',
				current: 0,
				showBtn: true,
				current1: '0',
				current2: '0',
				teamRole: '',
				titleColor: this.$utils.themeColor
			}
		},

		onLoad(option) {
			this.subjectId = option.subjectId
			this.teamId = option.teamId
			this.paramsObj.teamId = option.teamId
			this.teamRole = option.teamRole
			this.teamName = decodeURI(option.teamName) || ''
			console.log('-------', option);
			uni.setNavigationBarTitle({
				title: this.teamName + '分组'
			});
			this.getStageListAll()
			this.getListAthleteByTeam()
		},
		watch: {
			pramsList: {
				handler(newval, oldval) {
					console.log(newval);
					this.setSortClass()
				},
				immediate: true
			}
		},
		methods: {
			change(e) {
				this.paramsObj.arrangeId = this.listTab[e].id
				this.paramsObj.subjectId = this.listTab[e].subjectId
				this.paramsObj.matchId = this.listTab[e].matchId
			},
			// 分组2
			selectArrange(e, index) {
				this.current2 = index
				this.paramsObj.arrangeId = e.id
				this.paramsObj.subjectId = e.subjectId
				this.paramsObj.matchId = e.matchId
				this.paramsObj.arrangeName = e.arrangeName
			},
			toBc() {
				this.$utils.modal('提示', '即将为你保存该数据!', true, (res) => {
					if (res) {
						if (this.$utils.isNotBlank(this.paramsObj.resultId)) {
							if (this.pramsList.length > 0) {
								for (var i = 0; i < this.pramsList.length; i++) {
									this.pramsList[i].resultId = this.paramsObj.resultId
								}
								console.log(this.pramsList);
								uni.setStorageSync(this.teamId + this.paramsObj.resultId, this.pramsList)
							}
						} else {
							this.$utils.toast('请选择队伍!')
						}
					}
				})
			},
			// 确认分组
			toSave() {
				console.log(this.paramsObj.resultId);
				this.$utils.modal('提示', '请您确认分组后提交!', true, (res) => {
					if (res) {
						uni.removeStorageSync(this.teamId + this.paramsObj.resultId);
						if (this.$utils.isNotBlank(this.paramsObj.resultId)) {
							if (this.pramsList.length > 0) {
								for (var i = 0; i < this.pramsList.length; i++) {
									this.pramsList[i].resultId = this.paramsObj.resultId
								}
								console.log(this.pramsList);
								arrangeSave(this.pramsList).then((res) => {
									this.$utils.toast('您已分组成功！')
									uni.navigateBack({
										delta: 1
									})
								})
							} else {
								this.$utils.toast('请选择参赛人员!')
							}
						} else {
							this.$utils.toast('请选择队伍!')
						}
					}
				})
			},
			// 切换组1
			selectTabs(e, index) {
				this.current1 = index
				this.paramsObj.stageId = e.id
				this.paramsObj.stageName = e.stageName
				this.getArrangeList()
			},
			// 获取阵容分组
			getStageListAll() {
				stageListAll({
					subjectId: this.subjectId
				}).then((res) => {
					console.log(res);
					this.group1list = res.list
					this.paramsObj.stageId = res.list[0].id
					this.paramsObj.stageName = res.list[0].stageName
					this.getListMatchTeam()
					this.getArrangeList()
				})
			},
			// 获取二级分组数据
			getArrangeList(type) {
				arrangeList({
					subjectId: this.subjectId,
					teamId: this.teamId,
					stageId: this.paramsObj.stageId,
					resultId: this.paramsObj.resultId
				}).then((res) => {
					this.listTab = res.list
					this.pramsList = res.athleteList

					if (type && type == 'team') {} else {
						this.paramsObj.arrangeId = this.listTab[0].id
						this.paramsObj.subjectId = this.listTab[0].subjectId
						this.paramsObj.matchId = this.listTab[0].matchId
						this.paramsObj.arrangeName = this.listTab[0].arrangeName

					}
					if (res.athleteList.length > 0) {
						this.showBtn = false
						this.setSortClass()
					} else {
						this.showBtn = true
					}
				})
			},

			getListAthleteByTeam() {
				listAthleteByTeam({
					teamId: this.teamId
				}).then((res) => {
					this.listData = res.list
				})
			},

			// 查询某一团队当前阶段的对手
			getListMatchTeam() {
				listMatchTeam({
					stageId: this.paramsObj.stageId,
					id: this.teamId
				}).then((res) => {
					console.log(res);
					this.teamList = res.list
				})
			},

			// 选中某个复选框时，由checkbox时触发
			changeBox(e) {
				if (this.teamRole == '1') {
					if (this.pramsList.length > 0) {
						let count = 0
						let countname = 0
						for (var i = 0; i < this.pramsList.length; i++) {
							if (this.paramsObj.arrangeId == this.pramsList[i].arrangeId && this.paramsObj.stageId == this
								.pramsList[i].stageId) {
								count++
								if (e.id == this.pramsList[i].id) {
									countname++
								}
							}
						}
						if (parseInt(count) < 2 && !countname > 0) {
							this.paramsObj.id = e.id
							this.paramsObj.name = e.name
							this.pramsList.push(JSON.parse(JSON.stringify(this.paramsObj)))
						}
					} else {
						this.paramsObj.id = e.id
						this.paramsObj.name = e.name
						this.pramsList.push(JSON.parse(JSON.stringify(this.paramsObj)))
					}
				}
			},

			// 全选
			checkedAll() {
				this.list.map(val => {
					val.checked = true;
				})
			},

			// 选择对抗的队伍
			selectTeam() {
				this.teamShow = true
			},

			confirmTeam(e) {
				console.log(e);
				this.vsTeamName = e[0].label
				this.paramsObj.resultId = e[0].value
				let list = uni.getStorageSync(this.teamId + this.paramsObj.resultId)
				if (list && list.length > 0) {
					this.showBtn = true
					this.pramsList = list
					this.setSortClass()
				} else {
					this.getArrangeList('team')
				}
			},

			// 删除
			deleteCircle(item, index) {
				this.pramsList.splice(index, 1)
			},


			// 数据分组
			setSortClass() {
				let data = sortClass(this.pramsList, 'arrangeId')
				this.groupSortList = data
				console.log(data);
			}
		}
	}
</script>

<style lang="scss">
	.group-user {
		background-color: #FFFFFF;
		padding: 20rpx;

		&_card {
			background-color: #FFFFFF;
			margin: 20rpx 0;
		}

		&_back {
			// background-color: rgba($color: $global-color, $alpha: 0.9);
			// color: #FFFFFF;
		}
	}

	.group-btn {
		display: flex;
		justify-content: center;
		background-color: $global-color;
		border-radius: 10rpx;
		padding: 18rpx 0;
		margin: 20rpx 20rpx;

		text {
			color: #FFFFFF;
			letter-spacing: 10rpx;
			font-size: 34rpx;
		}
	}

	.group-bc {
		background-color: #FFFFFF;
		margin-top: 40rpx;

		text {
			color: #000000;
		}
	}

	.players-list {
		&_flex {
			display: flex;
			flex-wrap: wrap;
			margin: 10rpx 0;
		}

		&_user {
			flex: 0 0 48%;
			padding: 15rpx;
			border-radius: 10rpx;
			margin: 10rpx 1%;
			text-align: center;
		}
	}

	.close-circle_tip {
		position: absolute;
		right: 0;
		top: 0;
	}

	.select {
		&--name {
			margin: 25rpx 0;
			font-size: 33rpx;
			font-weight: bold;
			color: $global-color;
		}

		&--vs {
			display: flex;
			justify-content: center;
			margin: 20rpx 0;
		}
	}
</style>
