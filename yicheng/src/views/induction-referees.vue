<!--在线入职  推荐人  -->
<template>
  <div class="u-main">
    <div class="u-main-header">
      <span class="l">填写信息</span>
      <span class="m">上传图片</span>
      <span class="r">提交信息</span>
    </div>
    <div class="u-mian-icon"></div>
    <div class="u-main-content">
      <div class="u-tt">
        <span></span>
        <p>推荐人信息</p>
      </div>
      <div class="u-user">
        <div class="u-user-u">
          <span>推荐人姓名</span>
          <input class="ipt"
                 type='text'
                 v-model="agentInfo.recommendName"
                 placeholder="请输入推荐人姓名">
        </div>
        <div class="u-user-u">
          <span>推荐人工号</span>
          <input class="ipt"
                 type='number'
                 v-model="agentInfo.recommendJobNum"
                 placeholder="请输入推荐人工号">
        </div>
        <div class="u-user-u">
          <span>是否有异地辅导人</span>
          <div class="u-check">
            <p class="check"
               :class="[agentInfo.checkVal == item.val ? 'active' :'']"
               v-for="(item, index) in isDifPlaceInstructor"
               :key="index"
               @click="crtlCheck(item)">
              <span class="i"></span>
              <span class="v">{{item.text}}</span>
            </p>
          </div>
        </div>
        <div class="mentor"
             v-if="agentInfo.checkVal == 1">
          <div class="u-user-u">
            <span>辅导人姓名</span>
            <input class="ipt"
                   type='text'
                   v-model="agentInfo.instructorName"
                   placeholder="请输入辅导人姓名(必填)">
          </div>
          <div class="u-user-u">
            <span>辅导人工号</span>
            <input class="ipt"
                   type='number'
                   v-model="agentInfo.instructorJobNum"
                   placeholder="请输入辅导人工号(必填)">
          </div>
        </div>

      </div>
      <!-- 下面分享下一步 -->
      <div class="u-user-btn"
           @click="next()">下一步</div>
      <!-- <div class="u-user-btn">
        <button class="share">返回</button>
        <button class="next"
                @click="next()">下一步</button>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      checkVal: 0,
      isDifPlaceInstructor: [{
        text: '是',
        val: 1
      }, {
        text: '否',
        val: 0
      }]
    }
  },

  components: {},
  computed: {
    // 第一个页面vuex
    ...mapGetters({
      agentInfo: 'getAgentInfo'
    })
  },

  mounted() {
  },

  methods: {
    crtlCheck(item) {
      this.agentInfo.checkVal = item.val;
      //如果为否 清空辅导人信息
      if (item.val == 0) {
        this.agentInfo.instructorName = '';
        this.agentInfo.instructorJobNum = '';
      }
    },
    next() {
      console.log("1111111111")
      let self = this;
      if (!self.agentInfo.recommendName) {
        self.$toast('请输入推荐人姓名');
        return;
      }
      if (!self.agentInfo.recommendJobNum) {
        self.$toast('请输入推荐人工号');
        return;
      }
      if (self.agentInfo.checkVal == '1') {
        if (!self.agentInfo.instructorName) {
          self.$toast('请输入辅导人姓名');
          return;
        }
        if (!self.agentInfo.instructorJobNum) {
          self.$toast('请输入辅导人工号');
          return;
        }
      }
      // 验证通过后获取推荐人信息并存到 vueX
      self.$store.commit('SET_AGENT_INFO', self.agentInfo);
      //登录成功后 跳转到正确的页面
      self.$router.push({
        name: 'inductionAgent',
      })

    }
  }
}

</script>
<style lang='less' scoped>
.u-main {
  width: 100%;
  height: 100%;
  background: #25293f;
  overflow: hidden;
  // position: relative;
}
.u-main-header {
  width: 100%;
  height: 47px;
  border-bottom: 1px solid #3f4356;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  span {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
  }
  .l {
    height: 16px;
    font-size: 16px;
    color: rgba(250, 215, 163, 1);
  }
  .m,
  .r {
    color: rgba(255, 255, 255, 1);
    opacity: 0.28;
  }
  .r {
    height: 16px;
  }
  .m {
    flex: 1;
  }
}
.u-mian-icon {
  width: 36px;
  height: 4px;
  background: rgba(250, 215, 163, 1);
  border-radius: 2px;
  position: absolute;
  top: 45px;
  left: 20px;
}
.u-main-content {
  width: 355px;
  height: 551px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 31px auto 22px;
  position: relative;
  .u-tt {
    width: 355px;
    height: 59px;
    background: rgba(246, 246, 246, 1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 23px;
    span {
      width: 4px;
      height: 17px;
      background: rgba(94, 135, 243, 1);
      border-radius: 2px;
    }
    p {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      margin-left: 7px;
      color: rgba(51, 51, 51, 1);
    }
  }
  .u-user {
    width: 355px;
    padding: 0 18px;
  }
  .u-user-u {
    display: flex;
    height: 54px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid rgba(210, 210, 210, 1);
    .ipt {
      width: 180px;
      padding: 5px;
      line-height: 20px;
      text-align: right;
      color: #333;
      background-color: transparent;
      &::placeholder {
        color: #999;
      }
    }
  }
  .u-check {
    display: flex;
    width: 35%;
    justify-content: space-between;
    align-items: center;
    span {
      display: inline-block;
    }
    .i {
      width: 10px;
      height: 10px;
      background: rgba(153, 153, 153, 1);
      border-radius: 50%;
      margin-right: 8px;
      border: 1px solid rgba(153, 153, 153, 1);
    }
    .v {
      font-size: 12px;
      color: #999;
      font-family: PingFang-SC-Medium;
    }
    .active {
      .i {
        background: #5e87f3;
        border: 1px solid #5e87f3;
      }
      .v {
        color: #333;
      }
    }
  }
  .mentor {
    width: 326px;
    padding: 0 2px 0 2px;
    background: rgba(246, 246, 246, 1);
  }
  // 底部 下一步按钮
  .u-user-btn {
    width: 333px;
    height: 32px;
    line-height: 32px;
    background: linear-gradient(
      0deg,
      rgba(201, 160, 99, 1) 0%,
      rgba(254, 220, 168, 1) 100%
    );
    border-radius: 16px;
    position: absolute;
    bottom: 30px;
    margin: 0 10px;
    text-align: center;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #141e3e;
  }
  // // 底部下一步  上一步按钮
  // .u-user-btn {
  //   width: 355px;
  //   height: 32px;
  //   position: absolute;
  //   bottom: 30px;
  //   padding: 0 10px;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   font-size: 18px;
  //   font-family: PingFang SC;
  //   font-weight: bold;
  //   color: rgba(20, 30, 62, 1);
  //   button {
  //     width: 152px;
  //     height: 32px;
  //     border-radius: 16px;
  //   }
  //   .share {
  //     border: 1px solid #cfa76a;
  //     background: rgba(255, 255, 255, 1);
  //     color: #cfa76a;
  //   }
  //   .next {
  //     background: linear-gradient(
  //       0deg,
  //       rgba(201, 160, 99, 1) 0%,
  //       rgba(254, 220, 168, 1) 100%
  //     );
  //   }
  // }
}
</style>