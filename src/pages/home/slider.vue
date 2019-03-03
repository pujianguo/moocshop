<template>
  <div class="home-slider">
    <me-slider
      :data="sliderList"
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
    <me-loading class="me-loading" v-else></me-loading>
  </div>
</template>

<script>
import api from '@/api/api'
import { swiperSlide } from 'vue-awesome-swiper'
import MeSlider from '@/base/slider'
import MeLoading from '@/base/loading'
import { sliderOptions } from './config'

// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length
  let i = arrLength
  let rndNum

  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]]
    }
  }

  return arr
}

export default {
  name: 'home-slider',
  props: {
  },
  components: {
    MeSlider,
    MeLoading,
    swiperSlide
  },
  data () {
    return {
      sliderLoading: false,
      sliderList: [],

      direction: sliderOptions.direction,
      interval: sliderOptions.interval,
      loop: sliderOptions.loop,
      pagination: sliderOptions.pagination
    }
  },
  methods: {
    // API
    update () { // 返回Promise，父组件中需要判断在then后执行一些东西
      return this.getSlider()
    },

    getSlider () {
      this.sliderLoading = true
      return api.listHomeSlider().then(res => {
        this.sliderLoading = false
        if (res.code === 0) {
          // 随机获取数组，模拟刷新效果
          let sliders = res.slider
          // 随机取一张
          const slider = [sliders[Math.floor(Math.random()) * sliders.length]]
          sliders = shuffle(sliders.filter(() => Math.random() >= 0.5))
          if (sliders.length === 0) {
            sliders = slider
          }
          this.sliderList = sliders
        } else {
          this.sliderList = []
          console.log('获取数据失败', res.message)
        }
      }).catch(() => {
        this.sliderLoading = false
        this.sliderList = []
      })
    }
  },
  mounted () {
    this.getSlider()
  }
}
</script>
<style lang="less">
.home-slider{
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 48.8%;
  background: #eee;
  // 高度为0，里面的内容会在padding-bottom上显示，一般里面的是图片，宽高比例和padding-bottom计算的比例相同。但是有些text要想居中显示，不知道高度没法计算。
  // 解决方法：这里添加相对定位，子元素添加绝对定位，并且 `width: 100%; height: 100%;`  此时子元素就填满了整个padding-bottom
  position: relative;
  .me-loading{
    position: absolute;
  }
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
