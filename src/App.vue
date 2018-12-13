<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
      <router-view/>
    </div>
    <div class="g-footer-container">
      <c-tabbar></c-tabbar>
    </div>
  </div>
</template>

<script>
import CTabbar from 'components/tabbar'
export default {
  components: {
    CTabbar
  }
}
</script>

<style lang="less">
@import '~styles/mixins.less';

.g-container{
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 640px;
  min-width: 320px;
  height: 100%;
  margin: 0 auto;
  .g-view-container{
    height: 100%;
    padding-bottom: @tabbar-height;
  }
  .g-header-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: @navbar-z-index;
    width: 100%;
  }
  .g-footer-container{
    // 不设高度，让内容自动撑开
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: @tabbar-z-index;
    box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);
  }
  .g-backtop-container {
    position: absolute;
    z-index: @backtop-z-index;
    right: 10px;
    bottom: @tabbar-height + 10px;
  }
}

</style>
