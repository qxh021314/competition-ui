<template>
    <view>
        <view class="zit-scheme" v-for="(item, index) in listData" :key="index" @click="toDetails(item)">
            <view class="zit-scheme_img">
                <image :src="item[mainImg]" mode=""></image>
            </view>
            <view class="zit-scheme_status" v-if="showStatus">
                <text>{{$utils.getEnventStatus(item.status)}}</text>
            </view>
            <u-section v-if="sectionText" :show-line="false" title=" " sub-title="查看详情"></u-section>
            <u-section v-if="!sectionText" :show-line="false" title=" " sub-title="查看赛况"></u-section>
        </view>
    </view>
</template>

<script>
    import tyVideo from '@/components/ty-video/ty-video.vue'
    export default {
        name: "zit-scheme-card",
        components: {tyVideo},
        props: {
			mainImg: {
				type: String,
				default: "mainPic"
			},
            title: {
                type: Boolean,
                default: false
            },
            showStatus: {
                type: Boolean,
                default: false
            },
            sectionText: {
                type: Boolean,
                default: true
            },
            listData: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {

            };
        },
        methods: {
            toDetails(item) {
                this.$emit('change', item)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .zit-scheme {
        background-color: #FFFFFF;
        padding: 20rpx;
        margin: 20rpx 0;
        position: relative;
        &_title{
            font-weight: bold;
            font-size: 30rpx;
        }
        &_img{
            width: 100%;
            height: 300rpx;
            margin: 20rpx 0;
        }

        &_status{
            position: absolute;
            left: 0rpx;
            top: 15rpx;
            padding: 0 30rpx;
            color: #FFFFFF;
            background-color: $global-color;
            transform: rotate(-20deg);
        }
    }
</style>
