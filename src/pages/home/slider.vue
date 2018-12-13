<template>
  <div class="home-slider">
    <me-slider
      :direction="direction"
      :interval="interval"
      :loop="loop"
      :pagination="pagination"
      v-if="sliderList.length"
    >
      <swiper-slide v-for="item in sliderList" :key="item.picUrl">
        <a class="slider-link" :href="item.linkUrl">
          <img class="slider-img" :src="item.picUrl" alt="">
        </a>
      </swiper-slide>
    </me-slider>
    <me-loading v-else></me-loading>
  </div>
</template>

<script>
import { swiperSlide } from 'vue-awesome-swiper'
import MeSlider from '@/base/slider'
import MeLoading from '@/base/loading'
import { sliderOptions } from './config'
export default {
  name: 'home-slider',
  props: {
    sliderList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    MeSlider,
    MeLoading,
    swiperSlide
  },
  data () {
    return {
      direction: sliderOptions.direction,
      interval: sliderOptions.interval,
      loop: sliderOptions.loop,
      pagination: sliderOptions.pagination
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
.home-slider{
  overflow: hidden;
  width: 100%;
  // 为了能使loading样式居中显示，这里需要给容器设定高度，会带来很多问题，如：宽度变化时，高度固定。
  height: 183px;
  // height: 0;
  // padding-bottom: 48.8%;
  background: #eee;
  .slider-link{
    display: block;
  }
  .slider-link, .slider-img{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .swiper-pagination-bullet-active{
    background: #fff;
  }
}
</style>
