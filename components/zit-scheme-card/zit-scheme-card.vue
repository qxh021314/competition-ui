<template>
  <view class="list-wrap">
    <template v-if="listData && listData.length > 0">
      <u-card  v-for="item in listData" :key="item.id" :show-head="false"
               :border="false"
               :show-foot="false" padding="20" class="card-wrap">
        <view class="card-bd" slot="body">
          <u-row @click="entry(item)">
            <u-col span="4">
              <image :lazy-load="true" :src="item.images[0]" mode="aspectFill"></image>
            </u-col>
            <u-col span="8">
              <view class="card-bd--title u-line-1">{{ item.title }}</view>
              <view class="card-bd--content u-line-2">{{ item.intro }}</view>
              <view class="card-bd--time u-p-10">{{ item.createTime }}</view>
            </u-col>
          </u-row>
        </view>
      </u-card>
    </template>
    <no-data v-else></no-data>
    
<!--    <u-loadmore v-if="listData && listData.length > 0" :status="status" :icon-type="iconType"-->
<!--                :load-text="contentText" />-->
  </view>
</template>

<script>

export default {
  props: {
    listData: Array,
    default: () => []
  },
  data() {
    return {
      // contentText: {
      //   loadmore: '上拉显示更多',
      //   loading: '努力加载中',
      //   nomore: '没有更多了'
      // },
      // iconType: 'flower',
      // status: 'loading',
      // listData: [],
      // queryParams: {
      //   "pageNum": 1,
      //   "pageSize": 10
      // }
    }
  },
  methods: {
    // 进入详情
    entry(item) {
      uni.navigateTo({
        url: `/package-events/views/scheme-details/index?id=${item.id}`
      })
      console.log(item)
    }
  }
}
</script>

<style scoped lang="scss">
.list-wrap {
  padding: 0;
}


.card-wrap {}

.card-bd {
  color: #333;
  
  image {
    width: 100%;
    height: 180rpx;
    border-radius: 6rpx;
    background: #eee;
  }
  
  &--content {
    padding: 5rpx 0;
    font-size: 32rpx;
    color: #666;
  }
  
  &--title {
    font-weight: bolder;
    font-size: 36rpx;
  }
  
  &--time {
    font-size: 30rpx;
    color: #666;
  }
  
}
</style>
