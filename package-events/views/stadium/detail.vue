<template>
  <view class="img-wrap">
    <image :src="imgUrl1" mode="widthFix"></image>
    <image :src="imgUrl2" mode="widthFix"></image>
    <image :src="imgUrl3" mode="widthFix"></image>
    <image :src="imgUrl4" mode="widthFix"></image>
    <image :src="imgUrl5" mode="widthFix"></image>
    <image :src="imgUrl6" mode="widthFix"></image>
  </view>
</template>

<script>

import config from '../../../config/index.js'
// 图片目录
const IMG_CDN = config.cdnDomain + '/web/common/static/stadium/'

export default {
  name: "detail",
  data() {
    return {
      imgUrl1: `${IMG_CDN}0-1.png`,
      imgUrl2: `${IMG_CDN}0-2.png`,
      imgUrl3: `${IMG_CDN}0-3.png`,
      imgUrl4: `${IMG_CDN}0-4.png`,
      imgUrl5: `${IMG_CDN}0-5.png`,
      imgUrl6: `${IMG_CDN}0-6.png`
    }
  }
}
</script>

<style scoped lang="scss">
.img-wrap {
  width: 100%;
  height: 100%;
  background: #b4dac2;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>