<template>
	<view class="sign-up">

		<view class="sign-up_form">
			<u-form :model="form" ref="uForm" label-width="180" :label-style="labelStyle">
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="团队名称" prop="teamName">
					<u-input input-align="right" v-model="form.teamName" placeholder="请输入团队名称(不超过8个字)" maxlength="8" />
				</u-form-item>
			</u-form>
		</view>

		<view class="sign-up_form" v-for="(item, indexparent) in form.athleteList" :key="indexparent">
			<u-form :model="item" ref="uForm" label-width="180" :label-style="labelStyle">
				<u-form-item :required="true" :leftIconStyle="leftIconStyle"
					:label="item.teamRole == '1' ? '队长姓名' : '队员姓名'" prop="name">
					<u-input input-align="right" v-model="item.name" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="身份证" prop="idCard">
					<u-input input-align="right" v-model="item.idCard" placeholder="请输入身份证号码"
						@blur="blurIdCard(item)" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="性别" prop="sex">
					<view class="sign-up_sex">
						<u-radio-group v-model="item.sex" @change="radioGroupChange">
							<u-radio v-for="(itemChild, index) in sexList" :key="index" :name="itemChild.value"
								@change="radioChange" :disabled="itemChild.disabled">
								{{itemChild.name}}
							</u-radio>
						</u-radio-group>
					</view>
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="年龄" prop="age">
					<u-input input-align="right" v-model="item.age" placeholder="请输入年龄" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="生日" prop="birthDay">
					<u-input input-align="right" v-model="item.birthDay" placeholder="请选择日期" type="select"
						@click="showSelect(indexparent)" />
				</u-form-item>
				<u-form-item label="学校单位" prop="schoolUnit">
					<u-input input-align="right" v-model="item.schoolUnit" placeholder="请输入学校单位" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="手机号" prop="phoneNo">
					<u-input input-align="right" v-model="item.phoneNo" placeholder="请输入手机号码" maxlength="11" />
				</u-form-item>
				<u-form-item v-if="indexparent !== 0 && triggerStatus">
					<view class="sign-delete">
						<u-button type="error" size="mini" @click="deleteSign(item, indexparent)">删除</u-button>
					</view>
				</u-form-item>
			</u-form>
		</view>


		<u-picker :end-year="endYear" v-model="show" mode="time" @confirm="confirm"></u-picker>
		<!-- <u-calendar v-model="show" :mode="mode" @change="changeCal"></u-calendar> -->

		<view class="sign-up_prompt">
			<view class="sign-up_prompt_til">温馨提示：</view>
			<view class="sign-up_prompt_msg">填写完毕后，请再次检查所填信息，确认无误后，再点击提交按钮。</view>
		</view>

		<view class="" v-if="triggerStatus">
			<view class="sign-up_btn" style="background-color: #FFFFFF;color: #000000;" @click="addPlayers()">
				<text>添加队员</text>
			</view>

			<view class="sign-up_btn" style="background-color: #FFFFFF;color: #000000;" @click="savePlayers()">
				<text>保存</text>
			</view>

			<view class="sign-up_btn" @click="insertAppUserCourse()"><text>提交</text></view>
		</view>

		<!-- 授权弹窗 -->
		<user-oauth></user-oauth>
	</view>
</template>

<script>
	import {
		getMyApplyInfo,
		athleteSave,
		athleteSaveBefore
	} from '@/api/competition.js'
	export default {
		data() {
			return {
				labelStyle: {
					padding: '0'
				},
				leftIconStyle: {
					color: '#ff0000',
					fontSize: '32rpx'
				},
				triggerStatus: true,
				noneOauth: false,
				userInfoObj: null,
				wxCode: '',
				sexValue: '男',
				sexList: [{
						value: 1,
						name: '男',
						disabled: false
					},
					{
						value: 2,
						name: '女',
						disabled: false
					}
				],
				selectType: '',
				birthDayIndex: 0,
				list: [],
				form: {
					"teamName": '',
					"matchId": '',
					"openId": '',
					"applyId": '',
					"teamId": '',
					"subjectId": '',
					"athleteList": [{
						"name": "",
						"idCard": "",
						"sex": 1,
						"age": '',
						"birthDay": "",
						"schoolUnit": "",
						"phoneNo": "",
						"teamRole": 1
					}]
				},
				athleteObj: {
					"name": "",
					"idCard": "",
					"sex": 1,
					"age": '',
					"birthDay": "",
					"schoolUnit": "",
					"phoneNo": "",
					"teamRole": 0
				},
				show: false,
				mode: "date",
				rules: {
					name: [{
						message: '请输入姓名'
						// 可以单个或者同时写两个触发验证方式 
					}],
					phoneNo: [{
							message: '请输入手机号'
						},
						{
							// 自定义验证函数，见上说明
							validator: (value) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$utils.isPhone(value);
							},
							message: '手机号码不正确'
						}
					],
					age: [{
						message: '请输入年龄'
					}],
					birthDay: [{
						message: '请输入出生日期'
					}]
				}
			}
		},
		computed: {
			endYear() {
				var date = new Date()
				return date.getFullYear()
			}
		},
		onLoad(option) {
			this.form.matchId = option.matchId
			this.form.applyId = option.applyId
			this.form.teamId = option.teamId
			this.form.subjectId = option.subjectId
			console.log(this.form);
			if (option.status && option.status == '001') {
				this.getMyApplyInfo()
				this.triggerStatus = false
			}
			if (option.type && option.type == 'update') {
				this.triggerStatus = true
			}
			this.form.openId = this.$userService.getOpenId()
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {},
		methods: {
			showSelect(index) {
				this.birthDayIndex = index
				this.show = true
			},
			confirm(e) {
				console.log(e);
				this.form.athleteList[this.birthDayIndex].birthDay = e.year + '-' + e.month + '-' + e.day
			},

			blurIdCard(e) {
				if (this.$utils.isNotBlank(e.idCard)) {
					if (this.$utils.identityCodeValid(e.idCard)) {
						e.birthDay = this.$utils.getBirthdayFromIdCard(e.idCard)
						e.age = parseInt(this.endYear) - parseInt(e.birthDay.substring(0, 4))
					} else {
						this.$utils.toast('身份证号码有误')
					}
				}
			},

			changeCal(e) {
				console.log(e);
				this.form.athleteList[this.birthDayIndex].birthDay = e.result
			},

			// 进行编辑时获取的数据
			getMyApplyInfo() {
				getMyApplyInfo({
					matchId: this.form.matchId,
					subjectId: this.form.subjectId,
					id: this.form.applyId,
					teamId: this.form.teamId,
					openId: this.$userService.getOpenId()
				}).then((res) => {
					this.form = res.record
				})
			},
			// 添加队员
			addPlayers() {
				this.$utils.verify(this.form.athleteList, this.rules).then((valid) => {
					if (valid) {
						this.athleteObj.name = ''
						this.form.athleteList.push(JSON.parse(JSON.stringify(this.athleteObj)))
					}
				})
			},
			// 保存
			savePlayers() {
				if (!this.$utils.isNotBlank(this.form.teamName)) {
					this.$utils.toast('请输入团队名称!')
					return
				}
				this.form.openId = this.$userService.getOpenId()
				this.$utils.verify(this.form.athleteList, this.rules).then((valid) => {
					if (valid) {
						athleteSaveBefore(this.form).then((res) => {
							this.$utils.toast('您保存成功！')
							uni.navigateTo({
								url: `/package-events/views/activity-details/view-enrollment-options?matchId=${this.form.matchId}`
							})
						})
					}
				})
			},
			// 删除队员
			deleteSign(item, index) {
				this.form.athleteList.splice(index, 1)
			},
			// 性别选择
			radioGroupChange(e) {},

			radioChange(e) {},
			// 立即报名
			insertAppUserCourse() {
				if (!this.$utils.isNotBlank(this.form.teamName)) {
					this.$utils.toast('请输入团队名称!')
					return
				}
				this.form.openId = this.$userService.getOpenId()
				this.$utils.modal('提示', '确认好相关信息可点击提交!', true, (res) => {
					if (res) {
						this.$utils.verify(this.form.athleteList, this.rules).then((valid) => {
							if (valid) {
								athleteSave(this.form).then((res) => {
									this.$utils.toast('您报名成功！')
									setTimeout(() => {
										uni.navigateTo({
											url: `/package-events/views/activity-details/view-enrollment-options?matchId=${this.form.matchId}`
										})
									}, 1000)
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign-up {
		&_hint {
			padding: 10rpx;
			font-size: 20rpx;
			background-color: #ececec;
		}

		&_form {
			background-color: #ffffff;
			margin-bottom: 20rpx;
			padding: 0 30rpx;
		}

		&_prompt {
			margin: 10rpx 0rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx;

			&_msg {
				color: #707070;
			}
		}

		&_btn {
			display: flex;
			justify-content: center;
			padding: 20rpx 30rpx;
			margin: 20rpx 0;
			border-radius: 20rpx;
			background-color: $global-color;
			color: #FFFFFF;
		}

		&_sex {
			flex: 1;
			display: flex;
			justify-content: flex-end;
		}
	}

	.oauth {
		&--title {
			text-align: center;
			font-weight: bold;
			font-size: 34rpx;
			padding: 35rpx 0;
		}

		&--content {
			margin: 50rpx 20rpx;

			&_tips {
				margin: 20rpx 0;
				font-size: 35rpx;
				letter-spacing: 3rpx;
			}

			&_text {
				letter-spacing: 3rpx;
			}
		}

		&--option {
			display: flex;

			&_btn {
				flex: 1;

				/* #ifndef MP-WEIXIN */
				uni-button {
					border-radius: 0;
					background-color: #FFFFFF;
				}

				uni-button:after {
					border-radius: 0;
					border: none;
				}

				/* #endif */
				/* #ifdef MP-WEIXIN */
				button {
					border-radius: 0;
					background-color: #FFFFFF;
				}

				button:after {
					border-radius: 0;
					border: none;
				}

				/* #endif */
			}

			&_confirm {

				/* #ifdef MP-WEIXIN */
				button {
					background-color: #09BB07;
					color: #FFFFFF;
				}

				/* #endif */

				/* #ifndef MP-WEIXIN */
				uni-button {
					background-color: #09BB07;
					color: #FFFFFF;
				}

				/* #endif */
			}
		}
	}

	.sign-delete {
		width: 100%;
		text-align: right;
	}
</style>
