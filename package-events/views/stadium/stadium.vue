<template>
  <view class="container-stadium">
    <!-- banner -->
    <view class="banner">
      <u-swiper bgColor="" name="imgUrl" height="300" :list="listBanner" :effect3d="true"
                effect3d-previous-margin="10"></u-swiper>
    </view>
    
    <!-- card -->
    <card :list-data="cards"/>
    
    <!--  scheme  -->
    <view class="card-box">
      <view class="card-item">
        <view class="title text-bold">解决方案</view>
        <zit-scheme-card :list-data="schemeList"/>
      </view>
    </view>
    
    <!--  map  -->
    <view class="card-box">
      <view class="card-item u-p-b-0">
        <view class="title text-bold">球馆位置</view>
        <view>
          <map style="width: 100%; height: 300px;"
               :latitude="latitude"
               :longitude="longitude"
               :markers="covers"
               :min-scale="10"
               :max-scale="18">
          </map>
        </view>
      </view>
    </view>
  
  </view>
</template>

<script>

import Card from './card.vue'
import zitSchemeCard from '@/components/zit-scheme-card/zit-scheme-card.vue'
import {qVenue} from '@/api/competition.js'

import config from '../../../config/index.js'
// 图片目录
const IMG_CDN = config.cdnDomain + '/web/common/static/stadium/'
import deepClone from "../../../uview-ui/libs/function/deepClone";

export default {
  data() {
    const latitude = 31.850421
    const longitude = 117.211915
    return {
      cards: [
        {
          title: '场馆环境',
          list: [
            {icon: '', name: '场内温度', value: 0, field: 'temperature'},
            {icon: '', name: '场内湿度', value: 0, field: 'humidity'},
            {icon: '', name: '含氧量', value: 0, field: 'oxygen'},
            {icon: '', name: 'pm2.5', value: 0, field: 'particulateMatter'}
          ]
        },
        {
          title: '球馆能效',
          list: [
            {icon: '', name: '市电', value: 0, field: 'utilityPower'},
            {icon: '', name: '光伏发电', value: 0, field: 'photovoltaicPowerGeneration'},
            {icon: '', name: '碳排放', value: 0, field: 'carbonEmission'},
            {icon: '', name: '减碳量', value: 0, field: 'emissionReduction'}
          ]
        }
      ],
      listBanner: [
        {imgUrl: `${IMG_CDN}1.jpeg`},
        {imgUrl: `${IMG_CDN}2.jpeg`},
        {imgUrl: `${IMG_CDN}3.jpeg`}
      ],
      schemeList: [],
      latitude,
      longitude,
      covers: [{latitude, longitude, label: {content: '球馆'}}]
    }
  },
  components: {
    Card,
    zitSchemeCard
  },
  methods: {
    onClickBanner(id) {
      uni.navigateTo({
        url: `/package-events/views/scheme-details/index?id=${id}`
      })
    },
    applyDataField(data) {
      const arr = deepClone(this.cards)
      for (let i = 0; i < arr.length; i++) {
        const { list } = arr[i]
        for (const item of list) {
          item.value = data[item.field] || 0
        }
      }
      return arr
    },
    getVenue() {
      qVenue().then(res => {
        const {code, venue} = res
        if (code === 0 && venue) {
          this.cards = this.applyDataField(venue || {})
        }
      })
    },
    init() {
      this.schemeList = this.$store.state.scheme.list
      this.getVenue()
    }
  },
  onLoad() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "./stadium.scss";
</style>

<style lang="scss">
@import "./card.scss";

page {
  background: #e5e5e5;
}
</style>
