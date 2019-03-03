<template>
  <me-navbar class="home-header" v-show="visible">
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
      visible: false
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
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
.home-header{
  background-color: transparent;
  transition: background-color .5s;
  &.header-transition{
    background-color: @header-bgc-translucent;
  }
  .iconfont{
    color: @icon-color-default;
    font-size: @icon-font-size;
  }
}
</style>
