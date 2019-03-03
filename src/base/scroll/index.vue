<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MeLoading from '@/base/loading'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_Up_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END,
  PULL_UP_TEXT_INIT
} from './config'

export default {
  name: 'me-scroll',
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
    data () {
      this.update()
    }
  },
  methods: {
    init () {
      this.pulling = false
      this.pullDownText = PULL_DOWN_TEXT_INIT
      this.pullUpText = PULL_Up_TEXT_INIT
      this.swiperOption = {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        setWrapperSize: true,
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true
        },
        on: {
          sliderMove: this.scroll,
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd
        }
      }
    },

    // 数据变化时，触发滚动组件更新，否则高度不会重新计算
    update () {
      this.$refs.swiper && this.$refs.swiper.swiper.update()
    },

    // API
    // 滚动到顶部
    scrollToTop (speed, runCallbacks) {
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks)
    },

    // 滚动
    scroll () {
      if (this.pulling) {
        return
      }
      const swiper = this.$refs.swiper.swiper
      this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper)

      if (swiper.translate > 0) { // 下拉
        if (!this.pullDown) {
          return
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          // 这里直接修改pullDownText会导致页面有一个闪动的bug
          // this.pullDownText = '111'
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      } else if (swiper.isEnd) {
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'))
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight

        if (isPullUp) { // 上拉
          if (!this.pullUp) {
            return
          }
          this.pulling = true
          swiper.allowTouchMove = false // 禁止触摸
          swiper.setTransition(swiper.params.speed)
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height))
          swiper.params.virtualTranslate = true // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING)
          this.$emit('pull-up', this.pullUpEnd)
        }
      }
    },
    scrollEnd () {
      this.$emit('scroll-end', this.$refs.swiper.swiper.translate, this.$refs.swiper.swiper, this.pulling)
    },
    touchEnd () {
      if (this.pulling) {
        return
      }
      const swiper = this.$refs.swiper.swiper
      if (swiper.translate > PULL_DOWN_HEIGHT) {
        if (!this.pullDown) {
          return
        }
        this.pulling = true
        swiper.allowTouchMove = false // 禁止触摸
        swiper.setTransition(swiper.params.speed) // 设置速度
        swiper.setTranslate(PULL_DOWN_HEIGHT) // 定位到允许刷新的最小高度
        swiper.params.virtualTranslate = true // 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)
        // 触发数据更新是在父组件中执行的，这里触发父组件中的方法即可，但是更新完数据之后需要设置一下样式，直接传递一个函数即可
        this.$emit('pull-down', this.pullDownEnd)
      }
    },
    pullDownEnd () {
      const swiper = this.$refs.swiper.swiper
      this.pulling = false
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
      swiper.allowTouchMove = true
      swiper.params.virtualTranslate = false
      swiper.setTransition(swiper.params.speed)
      swiper.setTranslate(0)
      setTimeout(() => {
        this.$emit('pull-down-transition-end')
      }, swiper.params.speed)
    },
    pullUpEnd () {
      const swiper = this.$refs.swiper.swiper
      this.pulling = false
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
    }
  },
  created () {
    this.init()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.swiper-container{
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.swiper-slide{
  height: auto;
}
.mine-scroll-pull-down{
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 100%;
  height: 80px;
}
.mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>
