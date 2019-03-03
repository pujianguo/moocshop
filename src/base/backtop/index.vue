<template>
  <transition name="mine-backtop">
    <div class="mine-backtop" v-show="visible" @click="backToTop">
      <i class="iconfont icon-tubiaozhizuomoban"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'mine-backtop',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    backToTop () {
      this.$emit('backtop')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~styles/mixins.less';

.mine-backtop{
  overflow: hidden;
  .flex-center();
  width: 45px;
  height: 45px;
  background-color: rgba(0, 0, 0, .6);
  border: none;
  border-radius: 50%;
  .iconfont{
    color: #fff;
    font-size: 38px;
  }
}
.mine-backtop{
  &-enter-active, &-leave-active{
    transition: opacity .5s;
  }
  &-enter, &-leave-to{
    opacity: 0;
  }
}
</style>
