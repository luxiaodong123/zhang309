<!--  -->
<template>
  <div class="u-res-idx">
    <div class="u-head">
      <img src="https://static.ycbrokers.com/resource/img/res-head.png"
           alt="">
    </div>
    <div class="u-res">
      <p class="res"
         v-for="(item, index) in resInfo"
         :key="index"
         @click="goTo(item)">
        <img :src="item.src"
             alt=""
             srcset="">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resInfo: [
        // {
        //   name: '电投操作',
        //   type: 'act',
        //   src: 'https://static.ycbrokers.com/resource/img/act.png'
        // },
        {
          name: '保险产品',
          type: 'prod',
          src: 'https://static.ycbrokers.com/resource/img/prod.png'
        },
        {
          name: '保险经纪',
          type: 'broker',
          src: 'https://static.ycbrokers.com/resource/img/broker.png'
        },
        {
          name: '销售知识',
          type: 'sale',
          src: 'https://static.ycbrokers.com/resource/img/sale.png'
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    goTo(item) {
      //跳转自己的页面
      this.$router.push({
        name: 'resourceInfo',
        query: {
          resourceType: item.type
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
.u-res-idx {
  width: 100%;
  height: 100%;
  background-color: #25293f;
}
.u-head {
  height: 250px;
  img {
    width: 100%;
    height: 100%;
  }
}
.u-res {
  padding: 60px 19px 0;
  display: flex;
  flex-wrap: wrap;
  .res {
    width: 157px;
    height: 94px;
    margin-bottom: 48px;
    &:nth-child(2n + 1) {
      margin-right: 22px;
    }
  }
}
</style>