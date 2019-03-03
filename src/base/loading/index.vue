<template>
  <div :class="['mine-loading', {'mine-loading-inline': inline}]">
    <span class="mine-loading-indicator" v-if="indicator">
      <slot><img src="./loading.gif" alt="loading"></slot>
    </span>
    <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
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
  },
  data () {
    return {
      loadingText: this.text
    }
  },
  watch: {
    text (text) {
      this.loadingText = text
    }
  },
  methods: {
    setText (text) {
      this.loadingText = text
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
  &.mine-loading-inline{
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
