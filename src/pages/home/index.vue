<template>
  <div class="home">
    <header class="g-header-container">
      <home-header :class="{'header-transition': isHeaderTransition}" ref="header"></home-header>
    </header>
    <me-scroll ref="scroll" :data="recommends" pullDown pullUp
      @pull-down="pullToRefresh"
      @pull-down-transition-end="pullDownTransitionDown"
      @pull-up="pullToLoadMore"
      @scroll="scroll"
      @scroll-end="scrollEnd"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend ref="recommend" @loaded="getRecommends"></home-recommend>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBackTopVisible" @backtop="scrollToTop"></me-backtop>
    </div>
  </div>
</template>

<script>
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import MeScroll from '@/base/scroll'
import MeBacktop from '@/base/backtop'
import { HEADER_TRANSITION_HEIGHT } from './config'

export default {
  name: 'home',
  props: {
  },
  components: {
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend,
    MeScroll,
    MeBacktop
  },
  data () {
    return {
      recommends: [],
      isBackTopVisible: false,
      isHeaderTransition: false
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    pullToRefresh (end) {
      // setTimeout(() => {
      //   console.log('loading end')
      //   end()
      // }, 1000)
      this.$refs.slider.update().then(end).catch(err => {
        if (err) {
          conosle.log(err)
        }
        end()
        // 处理没有更多数据的情况
        // 禁止继续加载更多数据
        // 替换上拉时的loading: 没有更多数据了
      })
    },
    pullToLoadMore (end) {
      // setTimeout(() => {
      //   console.log('loading  上拉')
      //   end()
      // }, 1000)
      this.$refs.recommend.update().then(end)
    },
    scrollEnd (translate, scroll, pulling) {
      console.log('scroll-end')
      if (!pulling) {
        this.changeHeaderStatus(translate)
      }
      this.isBackTopVisible = translate < 0 && -translate > scroll.height
    },
    pullDownTransitionDown () {
      this.$refs.header.show()
    },
    scrollToTop () {
      this.$refs.scroll && this.$refs.scroll.scrollToTop()
    },

    scroll (translate) {
      this.changeHeaderStatus(translate)
    },

    changeHeaderStatus (translate) {
      if (translate > 0) {
        this.$refs.header.hide()
        return
      }
      this.$refs.header.show()
      this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT
    },

    getRecommends (recommends) {
      this.recommends = recommends
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import '~styles/mixins.less';

.home{
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: @bgc-theme;
}
</style>
