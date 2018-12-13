<template>
  <div class="mine-navbar">
    <div class="mine-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="mine-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="mine-navbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <h1 class="mine-navbar-title" v-if="title">
      <span class="mine-navbar-title-text" v-text="title"></span>
    </h1>
  </div>
</template>
<script>
export default {
  name: 'mine-navbar',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~styles/mixins.less';

.mine-navbar{
  position: relative;
  .flex-between();
  height: 50px;
  background-color: #fff;
  &-left{
    margin-left: 10px;

    // ~表示兄弟节点，这里的优先级高于后面直接设置的属性，所有有left时，会取消绝对定位。center也是同理。
    ~ .mine-navbar-right{
      position: static;
    }
  }
  &-center{
    flex: 1;
    margin: 0 10px;

    ~ .mine-navbar-right{
      position: static;
    }
  }
  &-right{
    margin-right: 10px;

    // 没有left或center时，会使用绝对定位
    position: absolute;
    right: 0;
    .flex-center();
    height: 100%;
  }
  &-title{ // title居中显示
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20%;
    right: 20%;
    .flex-center();
    text-align: center;
    &-text{
      font-size: 18px;
      width: 100%;
      line-height: 1.5;
      .ellipsis();
    }
  }

}
</style>
