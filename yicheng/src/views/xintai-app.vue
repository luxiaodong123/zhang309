<!--  -->
<template>
  <div class="u-app">
    <h2 class="u-name">请下载掌上信泰APP</h2>
    <div class="u-btn">
      <p class="ios" @click="goTo('ios')">掌上信泰-苹果</p>
      <p class="adr" @click="goTo('adr')">掌上信泰-安卓</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 分享控制
    this.$controlShare("hideOptionMenu");
  },

  methods: {
    goTo(type) {
      let url = type == 'ios' ? 'https://a.app.qq.com/o/simple.jsp?pkgname=com.xintai.appbasicframework' : 'https://fir.im/a9beta?openId=oGB0Cj-7roNR01IgVIEduJs7DQuM';
      window.location.href = url;
    }
  }
}

</script>
<style lang='less' scoped>
.u-name {
  font-family: PingFangSC-Medium;
  font-size: 22px;
  color: #333333;
  padding: 30px;
}
.u-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  p {
    width: 150px;
    height: 40px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
    color: #fff;
    text-align: center;
    line-height: 40px;
    background-image: linear-gradient(-90deg, #d29c23 0%, #f0f35c 100%);
    box-shadow: 0 2px 10px 0 rgba(15, 148, 230, 0.4);
    border-radius: 100px;
  }
}
</style>