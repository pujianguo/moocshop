<template>
  <div class="home">
    <header class="g-header-container">
      <home-header></home-header>
    </header>
    <me-scroll>
      <home-slider :sliderList="sliders"></home-slider>
      <home-nav></home-nav>
      <home-recommend></home-recommend>
    </me-scroll>
    <div class="g-backtop-container"></div>
  </div>
</template>

<script>
import api from '@/api/api'
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import MeScroll from '@/base/scroll'
export default {
  name: 'home',
  props: {
  },
  components: {
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend,
    MeScroll
  },
  data () {
    return {
      sliders: [],
      sliderLoading: false
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getSlider () {
      this.sliderLoading = true
      api.listHomeSlider().then(res => {
        this.sliderLoading = false
        if (res.code === 0) {
          this.sliders = res.slider
        } else {
          this.sliders = []
          console.log('获取数据失败', res.message)
        }
      }).catch(() => {
        this.sliderLoading = false
        this.sliders = []
      })
    }
  },
  created () {
  },
  mounted () {
    this.getSlider()
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
