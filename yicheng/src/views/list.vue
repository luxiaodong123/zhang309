<!--  -->
<template>
  <div class="list">
    加载中...
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {
    //www.yc.com/index/?code=123456&state=123456 code和state是微信授权登录后回调到这个页面时携带的参数，用于判断用户是否绑定
    // 是微信分享后正确跳转的地址
    let self = this,
      urlData = window.location.href.indexOf('?') > -1 ? qs.parse(window.location.href.split('?')[1]) : '',
      wxCode = !!urlData.code ? urlData.code : '',
      wxState = !!urlData.state ? urlData.state : '';
    //微信授权后回跳的页面
    if (!!wxCode && !!wxState) {
      self.$axios.get(`/wechat/userinfo`, {
        params: {
          code: wxCode
        }
      }).then(res => {
        if (res.data.errCode == 0) {
          //已经绑定 跳转正确页面
          switch (key) {
            case value:
              
              break;
          
            default:
              break;
          }
        } else if (res.data.errCode == 10007) {
          //w未绑定 跳登录页面 把state带过去
        } else {
          self.$toast(res.data.errMsg);
        }
      }).catch(err => {
        self.$toast(JSON.stringify(err));
      })
    }
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.list {
  font-size: 16px;
  color: #666;
}
</style>