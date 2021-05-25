<template>
	<view>
		<view class="z-tabs">
			<u-tabs name="arrangeName" :list="listTab" :active-color="titleColor" bar-width="120" :is-scroll="true"
				:current="current" @change="change"></u-tabs>
		</view>

		<select-tabs name="groupName" :isCancel="false" v-if="group1list && group1list.length > 0" :list="group1list"></select-tabs>
		<select-tabs name="groupName" :isCancel="false" v-if="group1list && group1list.length > 0" :list="group1list"></select-tabs>

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
				<view class="players-list_user u-border" v-for="(itemchild, indexchild) in pramsList['list' + current]"
					:key="indexchild">
					<text>{{itemchild.name}}</text>
					<u-icon name="close-circle" size="40" class="close-circle_tip" color="#ff0000"
						@click="deleteCircle(itemchild, indexchild)"></u-icon>
				</view>
			</view>
		</view>

		<view class="group-btn" @click="toSave()">
			<text class="">确认分组</text>
		</view>

	</view>
</template>

<script>
	import {
		listAthleteByTeam,
		arrangeList,
		arrangeSave
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
				pramsList: {},
				saveList: [],
				group1list: [{
						groupName: '组1'
					},
					{
						groupName: '组2'
					},
					{
						groupName: '组3'
					}
				], // 
				paramsObj: {
					"id": "",
					"arrangeId": "",
					"subjectId": "",
					"matchId": "",
					"teamId": "",
					"name": ""
				},
				subjectId: '',
				teamId: '',
				current: 0,
				titleColor: this.$utils.themeColor
			}
		},

		onLoad(option) {
			this.subjectId = option.subjectId
			this.teamId = option.teamId
			this.paramsObj.teamId = option.teamId
			this.getArrangeList()
			this.getListAthleteByTeam()
		},

		methods: {
			change(e) {
				this.current = e
				this.paramsObj.arrangeId = this.listTab[e].id
				this.paramsObj.subjectId = this.listTab[e].subjectId
				this.paramsObj.matchId = this.listTab[e].matchId
			},
			toSave() {
				this.saveList = []
				for (var i = 0; i < this.listTab.length; i++) {
					console.log(this.pramsList['list' + i]);
					this.saveList.push(...this.pramsList['list' + i])
				}
				arrangeSave(this.saveList).then((res) => {
					console.log(res);
					this.$utils.toast('您已分组成功！')
				})
			},
			getArrangeList() {
				arrangeList({
					subjectId: this.subjectId
				}).then((res) => {
					this.listTab = res.list
					for (var i = 0; i < res.list.length; i++) {
						let key = 'list' + i
						this.$set(this.pramsList, key, [])
					}
					this.paramsObj.arrangeId = this.listTab[0].id
					this.paramsObj.subjectId = this.listTab[0].subjectId
					this.paramsObj.matchId = this.listTab[0].matchId
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
				this.paramsObj.id = e.id
				this.paramsObj.name = e.name
				if (this.pramsList['list' + this.current] && this.pramsList['list' + this.current].length < 2) {
					this.pramsList['list' + this.current].push(JSON.parse(JSON.stringify(this.paramsObj)))
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
				this.pramsList['list' + this.current].splice(index, 1)
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
