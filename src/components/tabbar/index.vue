<template>
  <div class="g-tabbar">
    <router-link class="g-tabbar-item" to="/home">
      <i class="icon iconfont icon-meiriyicai"></i>
      <span>首页</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/category">
      <i class="icon iconfont icon-classifi"></i>
      <span>分类</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/cart">
      <i class="icon iconfont icon-qicheqianlian-"></i>
      <span>购物车</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/personal">
      <i class="icon iconfont icon-gerenzhongxin"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CTabbar',
  props: {
  },
  components: {
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

.g-tabbar{
  display: flex;
  width: 100%;
  height: @tabbar-height;
  background: #fff;
  &-item{
    flex: 1;
    .flex-center(column);
    .iconfont{
      margin-bottom: 4px;
      font-size: @icon-font-size;
    }
  }
  .router-link-active{
    color: @link-active-color;
  }
}
</style>
