<!--  -->
<template>
  <div class="u-login-body22222">
    <div>222222222222222222222222222</div>
    <div>222222222222222222222222222</div>
    <div>222222222222222222222222222</div>
    <div class="u-l-main">
      <div class="u-item">
        <input class="ipt"
               type='text'
               v-model="agentName"
               maxlength="26"
               @blur="fixScroll"
               placeholder="请输入姓名">
      </div>
      <div class="u-item">
        <input class="ipt"
               type='text'
               v-model="agentPhone"
               maxlength="11"
               @blur="fixScroll"
               placeholder="请输入手机号">
      </div>
      <div class="u-item">
        <input class="ipt"
               type='text'
               v-model="verifyCode"
               maxlength="6"
               @blur="fixScroll"
               placeholder="请输入验证码">
        <button class="btn"
                :disabled="verifiState"
                :class="[verifiState ? 'grey' : '']"
                @click="sendVerifi">{{sendMsgText}}</button>
      </div>
      <p class="u-btn"
         @click="sureClick">登录</p>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import controlStorage from '@js/storage'
// import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      pageTo: '', //登录后要跳转的页面
      agentName: '',
      agentPhone: '',
      verifyCode: '',
      sendMsgText: "获取验证码",
      verifiState: false,
      regPhone: /^1\d{10}$/i
    };
  },

  components: {},

  computed: {
    // ...mapGetters({
    //   isLogin: 'getLoginStatus'
    // })
  },

  created() {
    // //产品比较和资料图不需要重复登录
    // if (this.isLogin == 1 && (this.pageFrom == 'compare' || this.pageFrom == 'resource')) {
    //   let toName = this.pageFrom == 'compare' ? 'prodConfig' : 'resourceIndex';
    //   this.$router.push({
    //     name: toName
    //   });
    // }
  },

  mounted() {
    let urlData = window.location.href.indexOf('?') > -1 ? qs.parse(window.location.href.split('?')[1]) : '';
    this.pageTo = !!urlData.state ? urlData.state : '';
    // 分享控制
    this.$controlShare("hideOptionMenu");
    // this.$controlShare('showOptionMenu');
    controlStorage('storageProd', 'remove');
  },

  methods: {
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0, 0);
      }
    },
    sendVerifi() {
      //发送验证码
      let self = this;
      if (!self.agentPhone) {
        self.$toast('请输入手机号');
        return;
      }
      if (!self.regPhone.test(self.agentPhone)) {
        self.$toast('请输入正确的手机号');
        return;
      }
      let timer = null;
      clearInterval(timer);
      let second = 60;
      self.verifiState = true;
      self.$axios.get(`/wechat/send-verify-code`, {
        params: {
          phone: self.agentPhone
        }
      }).then(res => {
        if (res.data.errCode == 0) {
          timer = setInterval(() => {
            second--;
            if (second < 1) {
              self.verifiState = false;
              self.sendMsgText = "获取验证码";
              clearInterval(timer);
            } else {
              self.sendMsgText = "重新发送(" + second + ")";
            }
          }, 1000);
        } else {
          self.verifiState = false;
          self.$toast(res.data.errMsg);
        }
      }).catch(err => {
        self.verifiState = false;
        self.$toast(JSON.stringify(err));
      });
    },
    sureClick() {
      let self = this;
      if (!self.agentName) {
        self.$toast('请输入姓名');
        return;
      }
      if (!self.agentPhone) {
        self.$toast('请输入手机号');
        return;
      }
      if (!self.regPhone.test(self.agentPhone)) {
        self.$toast('请输入正确的手机号');
        return;
      }
      if (!self.verifyCode) {
        self.$toast('请输入验证码');
        return;
      }
      self.$axios.get(`/wechat/verify-bind`, {
        params: {
          name: self.agentName,
          phone: self.agentPhone,
          code: self.verifyCode
        }
      }).then(res => {
        if (res.data.errCode == 0) {
          let resData = res.data.data;
          //登录成功后将登录标识保存。
          // self.$store.commit('SET_LOGIN_STATUS', 1);
          //登录成功后 跳转到正确的页面
          window.location.replace(`${window.location.href.split('#')[0]}#${self.pageTo}`);
        } else {
          self.$toast(res.data.errMsg);
        }
      }).catch(err => {
        self.$toast(JSON.stringify(err));
      })
    }
  }
}

</script>
<style lang='less' scoped>
.u-login-body {
  width: 100%;
  height: 100%;
  background: #141e3e;
  overflow: hidden;
}
.u-l-main {
  width: 100%;
  height: 667px;
  padding: 160px 36px 0;
  background: url(../assets/img/login-mask.png);
  background-size: contain;
  .u-item {
    height: 60px;
    padding: 14px 0 14px 10px;
    border-bottom: 1px solid #636262;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ipt {
      width: 60%;
      line-height: 32px;
      font-size: 15px;
      font-family: PingFang SC;
      color: #fff;
      border: 0 none;
      background-color: transparent;
      &::placeholder {
        color: #d3d3d3;
      }
    }
    .btn {
      width: 100px;
      height: 32px;
      line-height: 32px;
      font-size: 15px;
      font-family: PingFang SC;
      color: #d3d3d3;
      padding-left: 10px;
      border-left: 1px solid #636262;
      background-color: transparent;
      &.grey {
        color: #a0a0a0;
      }
    }
  }
  .u-btn {
    height: 32px;
    margin-top: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #141e3e;
    background-image: linear-gradient(-360deg, #c9a063 0%, #fedca8 100%);
    box-shadow: 0 2px 10px 0 rgba(15, 148, 230, 0.4);
    border-radius: 32px;
  }
}
</style>