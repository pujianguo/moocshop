<template>
  <div class="me-slider" :key="keyId">
    <!-- <swiper :options="swiperOption">
      <swiper-slide v-for="item in sliderList" :key="item.picUrl">
        <img class="swiper-img" :src="item.picUrl" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->
    <swiper :options="swiperOption">
      <slot></slot>
      <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper } from 'vue-awesome-swiper'
export default {
  name: 'me-slider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return ['horizontal', 'vertical'].includes(value)
      }
    },
    interval: { // 自动轮播时间，为0时关闭
      type: Number,
      default: 3000,
      validator (value) {
        return value >= 0
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    // 是否显示分页器
    pagination: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    swiper
  },
  data () {
    return {
      keyId: Math.random()
    }
  },
  watch: {
    data (newData) {
      if (newData.length === 0) {
        return
      }
      this.swiperOption.loop = newData.length <= 1 ? false : this.loop
      this.keyId = Math.random()
    }
  },
  methods: {
    init () {
      this.swiperOption = {
        watchOverflow: true, // 当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
        direction: this.direction,
        autoplay: this.interval ? {
          delay: this.interval
        } : false,
        loop: this.data.length <= 1 ? false : this.loop, // 一张图片时关闭
        pagination: {
          el: this.pagination ? '.swiper-pagination' : null
        }
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>
