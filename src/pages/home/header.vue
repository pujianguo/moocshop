<template>
  <me-navbar class="home-header" title="">
    <i class="iconfont icon-saoma" slot="left"></i>
    <div slot="center">搜索</div>
    <i class="iconfont icon-xiaoxi" slot="right"></i>
  </me-navbar>

</template>

<script>
import MeNavbar from '@/base/navbar'

export default {
  name: 'home-header',
  props: {
  },
  components: {
    MeNavbar
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import '~styles/mixins.less';
.home-header{
  background-color: transparent;
  transition: background-color 0.5s;
  .iconfont{
    color: @icon-color-default;
    font-size: @icon-font-size;
  }
}
</style>
