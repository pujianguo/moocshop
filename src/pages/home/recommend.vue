<template>
  <div class="home-recommend">
    {{recommendList}}
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'home-recommend',
  props: {
  },
  components: {
  },
  data () {
    return {
      currentPage: 1,
      totalPage: 1,
      recommendList: []
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
    api.getHomeRecommend(this.currentPage).then(res => {
      console.log('res', res)
      // 封装的方法中已经判断了，这里肯定有数据
      this.currentPage++
      this.totalPage = res.totalPage
      this.recommendList = this.recommendList.concat(res.itemList)
    }).catch(err => {
      console.log('err: ', err)
    })
  }
}
</script>

<style lang="less" scoped>
.home-recommend{
}
</style>
