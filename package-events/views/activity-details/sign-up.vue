<template>
	<view class="sign-up">
		<view class="sign-up_form">
			<u-form :rules="rules" :model="form" ref="uForm" label-width="150" :label-style="labelStyle">
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="团队名称" prop="userName">
					<u-input input-align="right" v-model="form.userName" placeholder="请输入团队名称(不超过8个字)" />
				</u-form-item>

			</u-form>
		</view>

		<view class="sign-up_form">
			<u-form :model="form" ref="uForm" label-width="150" :label-style="labelStyle">
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="队长姓名" prop="mobile">
					<u-input input-align="right" v-model="form.mobile" placeholder="请输入队长姓名" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="身份证" prop="companyName">
					<u-input input-align="right" v-model="form.companyName" placeholder="请输入身份证号码" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="性别" prop="companyName">
					<view class="u-flex-1 u-text-right">
						<u-radio-group v-model="sexValue" @change="radioGroupChange">
							<u-radio v-for="(item, index) in sexList" :key="index" :name="item.name"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="年龄" prop="mobile">
					<u-input input-align="right" v-model="form.mobile" placeholder="请输入年龄" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="生日" prop="companyScaleName">
					<u-input input-align="right" v-model="form.companyScaleName" placeholder="请选择日期" type="select"
						@click="showSelect()" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="学校单位" prop="mobile">
					<u-input input-align="right" v-model="form.mobile" placeholder="请输入学校单位" />
				</u-form-item>
				<u-form-item :required="true" :leftIconStyle="leftIconStyle" label="手机号" prop="companyName">
					<u-input input-align="right" v-model="form.companyName" placeholder="请输入手机号码" />
				</u-form-item>
			</u-form>
		</view>


		<u-calendar v-model="show" :mode="mode"></u-calendar>

		<view class="sign-up_prompt">
			<view class="sign-up_prompt_til">温馨提示：</view>
			<view class="sign-up_prompt_msg">填写完毕后，请再次检查所填信息，确认无误后，再点击提交按钮。</view>
		</view>
		<view class="sign-up_btn" @click="insertAppUserCourse()"><text>提交</text></view>
	</view>
</template>

<script>
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
				sexValue: '男',
				sexList: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				selectType: '',
				list: [],
				form: {
					"userName": "",
					"mobile": "",
					"companyName": "",
					"companyScale": "",
					"companyScaleName": "",
					"city": "",
					"cityName": '',
					"industry": "",
					industryName: '',
					"budget": "",
					"remark": "",
					"courseImportId": ""
				},
				show: false,
				mode: "date"
			}
		},
		onLoad(option) {
			this.form.courseImportId = option.courseImportId
		},
		methods: {
			showSelect(type) {
				this.show = true
			},
			// 性别选择
			radioGroupChange() {},
			// 立即报名
			insertAppUserCourse() {

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
	}
</style>
