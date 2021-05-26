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
			<u-section title="选中名单" :right="false"></u-section>
			<view class="players-list_flex">

				<view class="players-list_user u-border" v-for="(itemchild, indexchild) in pramsList" :key="indexchild"
					v-show="itemchild.stageId == paramsObj.stageId && itemchild.arrangeId == paramsObj.arrangeId">
					<text>{{itemchild.name}}</text>
					<u-icon name="close-circle" size="40" class="close-circle_tip" color="#ff0000" v-if="teamRole == '1'"
						@click="deleteCircle(itemchild, indexchild)"></u-icon>
				</view>

			</view>
		</view>

		<view class="group-btn" @click="toSave()" v-if="teamRole == '1'">
			<text class="">确认分组</text>
		</view>

	</view>
</template>

<script>
	import {
		listAthleteByTeam,
		arrangeList,
		arrangeSave,
		stageListAll
	} from '@/api/competition.js'
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
					"name": ""
				},
				subjectId: '',
				teamId: '',
				current: 0,
				teamRole: '',
				titleColor: this.$utils.themeColor
			}
		},

		onLoad(option) {
			this.subjectId = option.subjectId
			this.teamId = option.teamId
			this.paramsObj.teamId = option.teamId
			this.teamRole = option.teamRole
			this.getStageListAll()
			this.getListAthleteByTeam()
		},

		methods: {
			change(e) {
				this.current = e
				this.paramsObj.arrangeId = this.listTab[e].id
				this.paramsObj.subjectId = this.listTab[e].subjectId
				this.paramsObj.matchId = this.listTab[e].matchId
			},
			// 分组2
			selectArrange(e, index) {
				this.current = index
				this.paramsObj.arrangeId = e.id
				this.paramsObj.subjectId = e.subjectId
				this.paramsObj.matchId = e.matchId
				this.paramsObj.arrangeName = e.arrangeName
			},
			toSave() {
				this.saveList = []
				this.saveList.push(...this.pramsList)
				arrangeSave(this.saveList).then((res) => {
					console.log(res);
					this.$utils.toast('您已分组成功！')
				})
			},
			// 切换组1
			selectTabs(e, index) {
				this.current = index
				this.paramsObj.stageId = e.id
				this.paramsObj.stageName = e.stageName
				this.getArrangeList(e.id)
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
					this.getArrangeList(res.list[0].id)
				})
			},

			getArrangeList(stageId) {
				arrangeList({
					subjectId: this.subjectId,
					teamId: this.teamId,
					stageId: stageId
				}).then((res) => {
					this.listTab = res.list
					this.paramsObj.arrangeId = this.listTab[0].id
					this.paramsObj.subjectId = this.listTab[0].subjectId
					this.paramsObj.matchId = this.listTab[0].matchId
					this.paramsObj.arrangeName = this.listTab[0].arrangeName
				})
			},
			getListAthleteByTeam() {
				listAthleteByTeam({
					teamId: this.teamId
				}).then((res) => {
					this.listData = res.list
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

			// 删除
			deleteCircle(item, index) {
				this.pramsList.splice(index, 1)
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
	}

	.group-btn {
		display: flex;
		justify-content: center;
		background-color: $global-color;
		border-radius: 10rpx;
		padding: 18rpx 0;
		margin: 100rpx 20rpx;

		text {
			color: #FFFFFF;
			letter-spacing: 10rpx;
			font-size: 34rpx;
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
</style>
