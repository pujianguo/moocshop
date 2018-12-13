<template>
  <div :class="['mine-loading', {'mine-loading-inline': inline}]">
    <span class="mine-loading-indicator" v-if="indicator">
      <slot><img src="./loading.gif" alt="loading"></slot>
    </span>
    <span class="mine-loading-text" v-if="text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'mine-loading',
  props: {
    indicator: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: '加载中...'
    },
    inline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~styles/mixins.less';

.mine-loading{
  overflow: hidden;
  width: 100%;
  height: 100%;
  .flex-center(column);
  &.mine-loading-indicator{
    flex-direction: row;
    .mine-loading-indicator ~ .mine-loading-text{
      margin-top: 0;
      margin-left: 6px;
    }
  }
  .mine-loading-indicator ~ .mine-loading-text{
    margin-top: 6px;
  }
}
</style>
