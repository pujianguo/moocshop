<template>
  <div class="home-recommend">
    <h3 class="recommend-title">热卖推荐</h3>
    <div class="loading-container" v-if="!recommendList.length">
      <me-loading inline></me-loading>
    </div>
    <ul class="recommend-list" v-else>
      <li class="recommend-item" v-for="(item, index) in recommendList" :key="index">
        <router-link class="recommend-link" :to="{name: 'home', params: {id: item.itemId}}">
          <!-- <p class="recommend-pic"><img class="recommend-img" v-lazy="item.baseinfo.picUrlNew"></p> -->
          <p class="recommend-pic"><img class="recommend-img" v-lazy="item.baseinfo.picUrlNew"></p>
          <p class="recommend-name">{{item.name.shortName}}</p>
          <p class="recommend-origPrice"><del>¥{{item.price.origPrice}}</del></p>
          <p class="recommend-info">
            <span class="recommend-price">¥<strong class="recommend-price-num">{{item.price.actPrice}}</strong></span>
            <span class="recommend-count">{{item.remind.soldCount}}件已售</span>
          </p>
        </router-link>
      </li>
    </ul>
    <!-- {{recommendList}} -->
  </div>
</template>

<script>
import api from '@/api/api'
import MeLoading from '@/base/loading'

export default {
  name: 'home-recommend',
  props: {
  },
  components: {
    MeLoading
  },
  data () {
    return {
      currentPage: 1,
      totalPage: 3,
      recommendList: []
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // API
    update () { // 返回Promise，父组件中需要判断在then后执行一些东西
      return this.getRecommend()
    },

    getRecommend () {
      if (this.currentPage > this.totalPage) {
        return Promise.reject(new Error('没有更多数据了'))
      }
      return api.getHomeRecommend(this.currentPage).then(res => {
        // 封装的方法中已经判断了，这里肯定有数据
        this.currentPage++
        // this.totalPage = res.totalPage
        this.recommendList = this.recommendList.concat(res.itemList)
        // this.recommendList = []
        this.$emit('loaded', this.recommendList)
      }).catch(err => {
        console.log('err: ', err)
      })
    }
  },
  created () {
  },
  mounted () {
    this.getRecommend()
  }
}
</script>

<style lang="less" scoped>
@import '~styles/mixins.less';

.home-recommend{
  .loading-container{
    padding-top: 100px;
  }
  .recommend-title{
    position: relative;
    width: 100%;
    padding: 10px 0;
    font-size: @font-size-l;
    text-align: center;
    &:before, &:after{
      content: '';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background-color: #ddd;
    }
    &:before{
      left: 0;
    }
    &:after{
      right: 0;
    }
  }

  .recommend-list{
    .flex-between();
    flex-wrap: wrap;
    .recommend-item{
      width: 49%;
      background-color: #fff;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .12);
      margin-bottom: 8px;
      .recommend-link{
        display: block;
        .recommend-pic{
          position: relative;
          width: 100%;
          padding-top: 100%;
          margin-bottom: 5px;
          .recommend-img{
            position: absolute;
            top: 0;
            width: 0;
            height: 100%;
            width: 100%;
          }
        }
        .recommend-name{
          height: 36px;
          padding: 0 5px;
          margin-bottom: 8px;
          line-height: 1.5;
          .multiline-ellipsis();
        }
        .recommend-origPrice{
          padding: 0 5px;
          margin-bottom: 8px;
          color: #ccc;
        }
        .recommend-info{
          .flex-between();
          padding: 0 5px;
          margin-bottom: 8px;
          .recommend-price{
            color: #e61414;
            &-num{
              font-size: 20px;
            }
          }
          .recommend-count{
            color: #999;
          }
        }
      }

    }
  }
}
</style>
