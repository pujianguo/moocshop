<template>
  <nav class="home-nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item, index) in navs" :key="index">
        <a class="nav-link" :href="item.linkUrl">
          <img class="nav-img" :src="item.picUrl">
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { navItems } from './config'

export default {
  name: 'home-nav',
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
    this.navs = navItems
    // data中的数据会添加get和set方法，页面会监听数据的变化，对于不需要修改的数据，直接在create时放到this上即可，减少性能损耗
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import '~styles/mixins.less';

.home-nav{
  width: 100%;
  padding-top: 15px;
  background-color: #fff;
  .nav-list{
    display: flex;
    flex-wrap: wrap;
  }
  .nav-item{
    width: 20%;
    margin-bottom: 15px;
    .nav-link{
      .flex-center(column);
    }
    .nav-img{
      width: 60%;
      margin-bottom: 8px;
    }
  }
}
</style>
