<template>
    <view>
        <view class="z-tabs">
            <u-tabs :list="list" bar-width="100" :is-scroll="true" :current="current" @change="change"></u-tabs>
        </view>
        <view class="z-select">
            <view class="z-select_btn z-select_pre">小组赛</view>
            <view class="z-select_btn z-select_aft">前四名淘汰附加赛</view>
        </view>

        <!-- 比赛表格 -->
        <scroll-view scroll-x="true" style="width: 100%;overflow:hidden;background-color: #FFFFFF;"
                     :show-scrollbar="true">
            <u-table bg-color="#FFFFFF">
                <u-tr>
                    <u-th v-for="index in 5" :key="index">
                        <!-- #ifdef H5 -->
                        <view class="zit-td" v-if="index == 1">
                            <view class="diagonal" :style="{'width': grpWidth}"></view>
                        </view>
                        <!-- #endif -->
                        <!-- #ifndef H5 -->
                        <view class="zit-td" v-if="index == 0">
                            <view class="diagonal" :style="{'width': grpWidth}"></view>
                        </view>
                        <!-- #endif -->

                        <view class="zit-td" v-else>
                            {{index}}A大学
                        </view>
                    </u-th>
                </u-tr>
                <u-tr v-for="index in 4" :key="index">
                    <u-td v-for="indexchild in 5" :key="indexchild">
                        <view class="zit-td" v-if="(index + 1) == indexchild"></view>
                        <view class="zit-td" v-else>
                            {{index + 1}}A大学
                        </view>
                    </u-td>
                </u-tr>
            </u-table>
        </scroll-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: [{
                    name: '甲组男团'
                }, {
                    name: '甲组女团'
                }, {
                    name: '丙组男团'
                }, {
                    name: '丙组男团'
                }, {
                    name: '甲组女团'
                }, {
                    name: '丙组男团'
                }, {
                    name: '丙组男团'
                }],
                current: 0,
                listData: []
            }
        },
        computed: {
            grpWidth() {
                let width = Math.pow((180 + 12) * 5, 2) + Math.pow((100 + 20) * 5, 2)
                return Math.sqrt(width) + 'rpx'
            }
        },
        onLoad() {
        },
        methods: {
            change() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .z-select {
        display: flex;
        justify-content: space-between;
        margin: 20rpx;

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
        height: 100rpx;
        width: 180rpx;
        font-size: 30rpx;
    }

    .diagonal {
        position: absolute;
        top: 0;
        left: 0;
        height: 1rpx;
        background-color: black;
        transform-origin: left;
        transform: rotate(31.8deg);
    }
</style>
