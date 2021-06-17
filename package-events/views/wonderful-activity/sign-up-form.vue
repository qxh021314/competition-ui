<template>
	<view class="course-import">
		<!-- 提示信息 -->
		<view class="course-import_form">
			<u-form :rules="rules" :model="form" ref="uForm" label-width="150" :label-style="labelStyle">
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="姓名" prop="userName">
					<u-input input-align="right" v-model="form.userName" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="手机号" prop="mobile">
					<u-input input-align="right" v-model="form.mobile" placeholder="请输入手机号码" maxlength="11" />
				</u-form-item>
				<u-form-item label="直属部门" prop="userUnit">
					<u-input input-align="right" v-model="form.userUnit" placeholder="请输入直属部门" />
				</u-form-item>
				<u-form-item label="标准岗位" prop="userPosition">
					<u-input input-align="right" v-model="form.userPosition" placeholder="请输入标准岗位" />
				</u-form-item>
			</u-form>
		</view>
		<view class="course-import_btn" @click="insertAppUserCourse()"><text>提交</text></view>
	</view>
</template>

<script>
	import {
		signUpForm
	} from '@/api/activity.js'
	export default {
		data() {
			return {
				labelStyle: {
					padding: '0 10rpx'
				},
				leftIconStyle: {
					color: '#ff0000',
					fontSize: '32rpx'
				},
				showFirm: false,
				showCity: false,
				showIndustry: false,
				selectType: '',
				list: [],
				firmList: [], // 企业规模
				cityList: [], // 城市
				industryList: [], // 行业
				form: {
					"activityId": '',
					"userName": "",
					"mobile": "",
					"userUnit": "",
					"userPosition": ""
				},
				rules: {
					userName: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur']
					}],
					mobile: [{
							required: true,
							message: '请输入手机号',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur']
						},
						{
							// 自定义验证函数，见上说明
							validator: (value) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$utils.isPhone(value)
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					]
				},
				mode: 'mutil-column-auto' // 多列： mutil-column / 多列联动： mutil-column-auto

			}
		},
		onLoad(option) {
			this.form.activityId = option.activityId
		},
		methods: {
			// 立即报名
			insertAppUserCourse() {
				let lock = true
				let keysList = ['userName', 'mobile']
				keysList.reverse().map(key => {
					if (this.$utils.isEmpty(this.form[key])) {
						this.$utils.toast(this.rules[key][0].message)
						lock = false
					}
				})
				if (!this.$utils.isPhone(this.form.mobile)) {
					this.$utils.toast('手机号码不正确')
					lock = false
				}
				if (lock) {
					signUpForm(this.form).then((res) => {
						uni.navigateBack({
							delta: 2
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.course-import {
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
			position: fixed;
			bottom: 0;
			left: 10rpx;
			right: 10rpx;
			display: flex;
			justify-content: center;
			padding: 20rpx 30rpx;
			margin: 20rpx 0;
			border-radius: 20rpx;
			background-color: $global-color;
			color: #FFFFFF;
		}
	}
</style>
