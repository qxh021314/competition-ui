<template>
  <view class="img-wrap">
    <image :src="imgUrl1" mode="widthFix"></image>
    <image :src="imgUrl2" mode="widthFix"></image>
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
      imgUrl1: `${IMG_CDN}1-3.png`,
      imgUrl2: `${IMG_CDN}1-2.png`
    }
  }
}
</script>

<style scoped lang="scss">
.img-wrap {
  width: 100%;
  height: 100%;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>