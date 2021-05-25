<template>
	<view>
		<view class="z-tabs">
			<u-tabs name="subjectName" :list="listTab" :active-color="titleColor" bar-width="120" :is-scroll="true"
				:current="current" @change="change"></u-tabs>
		</view>

		<view class="group-tabs">
			<select-tabs name="groupName" :isCancel="true" v-if="grouplist && grouplist.length > 0" :list="grouplist" @change="changeGroup"></select-tabs>
		</view>

		<view class="" v-if="recordList && recordList.length > 0">
			<view class="players-list" v-for="(item, index) in recordList" :key="index">
				<u-card :title="item.teamName" :sub-title="item.groupName" title-size="40" sub-title-size="40"
					:title-color="titleColor" margin="20rpx 0">
					<view class="players-list_flex" slot="body">
						<view class="players-list_user u-border" v-for="(itemchild, indexchild) in item.athleteList"
							:key="indexchild">
							<u-icon v-if="itemchild.sex == 1" :label="itemchild.name" margin-left="30" name="man"
								:color="titleColor" size="35"></u-icon>
							<u-icon v-if="itemchild.sex == 0" :label="itemchild.name" margin-left="30" name="woman"
								color="#ff0000" size="35"></u-icon>
						</view>
					</view>
				</u-card>
			</view>
		</view>
		
		<view v-else>
			<u-empty text="数据为空" mode="list"></u-empty>

		</view>

	</view>
</template>

<script>
	import {
		listAthlete,
		groupList,
		getApplyInfo
	} from '@/api/competition.js'
	import SelectTabs from '../../components/select-tabs.vue'
	export default {
		components: {
			SelectTabs
		},
		data() {
			return {
				titleColor: this.$utils.themeColor,
				matchId: '',
				groupId: '',
				subjectId: '',
				current: 0,
				grouplist: [],
				matchInfo: {},
				recordList: [],
				listTab: []
			}
		},
		onLoad(options) {
			this.matchId = options.id
			this.getApplyInfo()
		},
		methods: {
			getApplyInfo() {
				getApplyInfo({
					matchId: this.matchId
				}).then((res) => {
					this.matchInfo = res.matchInfo
					this.listTab = res.list
					this.getListAthlete(this.listTab[this.current].id)
					this.getGroupList(this.listTab[this.current].id)
				})
			},
			// 获取组
			getGroupList(subjectId) {
				groupList({
					subjectId: subjectId
				}).then((res) => {
					this.grouplist = res.list
				})
			},
			// 选择组别
			changeGroup(e) {
				this.groupId = e.id
				this.getListAthlete(this.listTab[this.current].id)
			},
			getListAthlete(subjectId) {
				listAthlete({
					matchId: this.matchId,
					groupId: this.groupId,
					subjectId: subjectId
				}).then((res) => {
					console.log(res);
					this.recordList = res.record
				})
			},
			change(e) {
				this.grouplist = []
				this.groupId = ''
				this.current = e
				this.getListAthlete(this.listTab[this.current].id)
				this.getGroupList(this.listTab[this.current].id)
			}
		}
	}
</script>

<style lang="scss">
	.players-list {
		&_flex {
			display: flex;
			flex-wrap: wrap;
		}

		&_teamname {
			font-size: 40rpx;
		}

		&_user {
			flex: 0 0 48%;
			padding: 15rpx;
			border-radius: 10rpx;
			margin: 10rpx 1%;
			text-align: center;
		}
	}

	.group-tabs {
		margin: 30rpx 0;

		&_card {}
	}
</style>
