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
      <view class="card-item u-p-b-0">
        <view class="title text-bold">{{ schemeInfo.title }}</view>
        <view class="scheme-cover u-p-t-20" @click="showDetail">
          <image :src="schemeInfo.cover" mode="widthFix"></image>
        </view>
      </view>
    </view>
    
    <!--  map  -->
    <view class="card-box">
      <view class="card-item u-p-b-0">
        <view class="title text-bold">球馆位置</view>
        <view class="u-p-t-20">
          <map style="width: 100%; height: 300px;"
               @markertap="onClickMark"
               :latitude="latitude"
               :longitude="longitude"
               :markers="covers"
               :enable-buildin="true"
               :enable-3D="true"
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
import {qVenue} from '@/api/competition.js'

import config from '../../../config/index.js'
// 图片目录
const IMG_CDN = config.cdnDomain + '/web/common/static/stadium/'
import deepClone from "../../../uview-ui/libs/function/deepClone";

const latitude = 31.843374 // 31.850421
const longitude = 117.205406 // 117.211915

export default {
  data() {
    return {
      cards: [
        {
          title: '场馆环境',
          list: [
            {icon: 'icon5', name: '场内温度', value: 0, field: 'temperature'},
            {icon: 'icon6', name: '场内湿度', value: 0, field: 'humidity'},
            {icon: 'icon10', name: '含氧量', value: 0, field: 'oxygen'},
            {icon: 'icon8', name: 'pm2.5', value: 0, field: 'particulateMatter'}
          ]
        },
        {
          title: '园区能效',
          list: [
            {icon: 'gjd', name: '市电', value: 0, field: 'utilityPower'},
            {icon: 'gjx', name: '光伏发电', value: 0, field: 'photovoltaicPowerGeneration'},
            {icon: 'gld', name: '碳排放', value: 0, field: 'carbonEmission'},
            {icon: 'glx', name: '节约标煤', value: 0, field: 'emissionReduction'}
          ]
        }
      ],
      listBanner: [
        {imgUrl: `${IMG_CDN}1.jpeg`},
        {imgUrl: `${IMG_CDN}2.jpeg`},
        {imgUrl: `${IMG_CDN}3.jpeg`}
      ],
      schemeInfo: {
        title: '负碳场馆解决方案',
        cover: `${IMG_CDN}1-1.png`
      },
      latitude,
      longitude,
      covers: [{latitude, longitude}]
    }
  },
  components: {
    Card
  },
  methods: {
    onClickMark(evt) {
      uni.openLocation({
        latitude,
        longitude,
        name: '目的地'
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
    showDetail() {
      uni.navigateTo({
        url: `/package-events/views/stadium/detail`
      })
    },
    init() {
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
