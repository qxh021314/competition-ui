<template>
	<view>

		<view class="zit-banner">
			<u-swiper bgColor="" name="imgUrl" height="300" :list="listBanner" :effect3d="true"
				effect3d-previous-margin="10" @click="bannerToDetails"></u-swiper>
		</view>

		<!-- 		 热销产品       -->
		<view class="zit-product">
			<u-section font-size="33" title="热销产品" :right="false"></u-section>
		</view>
		<view class="zit-product_content">
      <list-card :list-data="listData"/>
		</view>

<!--		&lt;!&ndash; 		 推荐产品       &ndash;&gt;-->
<!--		<view class="zit-product">-->
<!--			<u-section font-size="33" title="推荐产品" :right="false"></u-section>-->
<!--		</view>-->
<!--		<view class="zit-product_content">-->
<!--      <list-card :list-data="[]"/>-->
<!--		</view>-->
	</view>
</template>

<script>
	import ListCard from './list.vue'
	export default {
		components: {
      ListCard
		},
		data() {
			return {
			  limit: 3, // banner数量限制
				listBanner: [],
        listData: []
			}
		},
		methods: {
      bannerToDetails(n) {
        const id = this.listBanner[n].id
        uni.navigateTo({
          url: `/package-events/views/product/detail?id=${id}`
        })
      },
      fetchData() {
        this.listData = this.$store.state.product.list
        this.listBanner = this.listData.map(item => {
          return {
            id: item.id,
            imgUrl: item.images[0]
          }
        }).reverse().slice(0, this.limit)
      }
		},
    onLoad() {
		  this.fetchData()
    }
	}
</script>

<style lang="scss" scoped>
	.zit-product {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx 10rpx;
		&_content {
			background-color: #ffffff;
		}
	}
</style>
