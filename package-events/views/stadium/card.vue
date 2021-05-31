<template>
  <view class="card-box">
    <view class="card-item" v-for="(card, idx) in listData" :key="idx">
      <view class="title text-bold">{{ card.title }}</view>
      <u-row>
        <u-col span="6" v-for="item in card.list" :key="item.name">
          <view class="u-flex px-10 py-15">
            <u-circle-progress :type="typeClass(item.value)" width="120" border-width="12" :percent="formatPercent(item.value)">
              <!--<view></view>-->
            </u-circle-progress>
            <view class="u-p-l-10">
              <view class="u-font-xl s-title">{{ item.name }}</view>
              <view class="u-font-xl text-bold u-p-t-10">{{ item.value }}</view>
            </view>
          </view>
        </u-col>
      </u-row>
    </view>
  </view>
</template>

<script>
export default {
  name: "card",
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    typeClass(n) {
      const m = parseFloat(n)
      if (m < 0) return 'error'
      
      return 'success'
    },
    formatPercent(n) {
      const m = parseFloat(n)
      const flag = m > 0 ? 1 : -1
      
      if (Math.abs(m) > 100) {
        return Math.abs(m % 100) || (flag * 100)
      }
      
      return Math.abs(m)
    }
  }
}
</script>