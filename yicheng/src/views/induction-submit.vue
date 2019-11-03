<template>
  <div :class="[isSubmit ? 'u-submit' : 'u-main']" >
    <div class="main-header">
      <span class="l">填写信息</span>
      <span class="m">上传图片</span>
      <span class="r">提交信息</span>
    </div>
    <!-- 中间图标 -->
    <div class="mian-icon"></div>
    <div class="main-showe"
         v-if="!isSubmit">
      <div class="main-h">免责声明:</div>
      <div class="main-text">
        <p class="yuan"></p>
        <p class="text">请确定此操作为在线签约人本人操作,若非本人操作请立即退出.</p>
      </div>
      <div class="main-text">
        <p class="yuan"></p>
        <p class="text">因盗用他人信息等非法手段注册的,本公司不承担相关责任,给公司客户造成损失的,公司保留追偿的权利,推荐人承担连带责任</p>
      </div>
      <!-- 中间白色内容区域 -->
      <div class="u-main-content">
        <div class="u-tt">
          <span class="yuann"></span>
          <p>
            <span class="l">请上传证件照和头像</span>
            <span class="r"> (证件要求白底: JPG格式, 大小10-200k, 像素210*270)</span>
          </p>
        </div>
        <!-- 上传证件 -->
        <div class="u-user">
          <div class="u-papers">
            <P class="u-papers-r">
              <span></span>
              <img src=""
                   alt="加载失败">
            </P>
            <P class="u-papers-r">
              <span></span>
              <img src=""
                   alt="加载失败">
            </P>
          </div>
          <div class="u-touxiang">
            <span>证件照</span>
            <span>头像</span>
          </div>
          <!-- 确认信息 -->
          <div class="u-que">
            <input type="checkbox">
            <p>我已阅读协议并同意<span>保险委托销售合同</span>的全部内容,并签字确认</p>
          </div>
          <!-- 签名 -->
          <div class="u-qian"
               @click="goSign">
            <span></span>
            <img src=""
                 alt="加载失败">
          </div>
        </div>
        <!-- 底部下一步按钮 -->
        <div class="u-user-btn"
             @click="next(a)">下一步</div>
      </div>
    </div>
    <!-- 提交成功后显示页面 -->
    <div class="main-submit"
         v-else>
      <p></p>
      <span>提交成功</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubmit: false,
    }

  },
  components: {
  },

  computed: {},

  mounted() {
  },

  methods: {
    goSign() {
      this.$router.push({
        name: 'remoteSignature'
      });
    }
  }
}
</script>
<style lang='less' scoped>
.u-main {
  width: 100%;
  height: 100%;
  background: #25293f;
  overflow: auto;
  position: relative;
}
.u-submit {
  width: 100%;
  height: 100%;
  background: #25293f;
  overflow: auto;
  position: relative;
  background-image: url("../assets/img/back.png");
  background-size: 375px 667px;;
  background-repeat:no-repeat;
  background-position: center;
}
.main-header {
  width: 100%;
  height: 47px;
  border-bottom: 1px solid #3f4356;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  margin-bottom: 30px;
  span {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
  }
  .l,
  .m {
    height: 16px;
    font-size: 16px;
    opacity: 0.28;
    color: rgba(255, 255, 255, 1);
  }
  .r {
    height: 16px;
    color: rgba(250, 215, 163, 1);
  }
  .m {
    flex: 1;
  }
}
.mian-icon {
  width: 36px;
  height: 4px;
  background: rgba(250, 215, 163, 1);
  border-radius: 2px;
  position: absolute;
  top: 45px;
  right: 22px;
}
.main-h {
  width: 100%;
  height: 23px;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  padding: 0 20px 0 10px;
  margin-bottom: 20px;
  color: rgba(254, 254, 254, 1);
}
// 文本信息
.main-text {
  width: 100%;
  // height: 48px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(229, 229, 229, 1);
  line-height: 30px;
  display: flex;
  padding: 0 20px 0 10px;
  margin-bottom: 20px;
  .yuan {
    width: 12px;
    height: 12px;
    margin-top: 10px;
    border-radius: 50%;
    background: #5e87f3;
    flex-shrink: 0;
  }
  .text {
    margin-left: 20px;
  }
}
// 中间白色区域内容
.u-main-content {
  width: 355px;
  height: 712px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 31px auto 22px;
  position: relative;
  overflow: auto;
  // 上传图片
  .u-tt {
    width: 100%;
    border-radius: 10px;
    display: flex;
    // align-items: center;
    margin-bottom: 20px;
    padding: 0 12px;
    .yuann {
      width: 8px;
      height: 17px;
      background: rgba(94, 135, 243, 1);
      border-radius: 4px;
      margin-top: 15px;
    }
    p {
      margin-left: 12px;
      .l {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-right: 10px;
      }
      .r {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #666666;
      }
    }
  }
  .u-user {
    width: 100%;
    padding: 0 10px;
  }
  // 上传证件

  .u-papers {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    .u-papers-r {
      width: 144px;
      height: 150px;
      background: rgba(246, 246, 246, 1);
      border: 1px solid rgba(220, 220, 220, 1);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 100%;
        height: 100%;
        background: url(../assets/img/zhaoxiang.png) no-repeat center;
      }
      img {
        width: 100%;
        height: 100%;
        display: none;
      }
    }
  }

  // 文字
  .u-touxiang {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    text-align: center;
    span {
      flex: 1;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  // 确认签名文字
  .u-que {
    height: 100px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    margin-top: 30px;
    line-height: 20px;
    color: rgba(51, 51, 51, 1);
    border-top: 1px solid #eeeeee;
    padding: 40px 4px 20px 4px;
    display: flex;
    span {
      text-decoration: underline;
      font-weight: 600;
    }
  }
  // 签名
  .u-qian {
    height: 178px;
    background: rgba(246, 246, 246, 1);
    border: 1px solid rgba(220, 220, 220, 1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: 100%;
      height: 100%;
      background: url(../assets/img/qianming.png) no-repeat center;
    }
    img {
      width: 100%;
      height: 100%;
      display: none;
    }
  }
  // 底部的下一步
  .u-user-btn {
    width: 336px;
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
}
// 提交成功后显示页面
.main-submit {
  width: 210px;
  height: 49px;
  position: absolute;
  top: 300px;
  left: 76px;
  display: flex;
  p {
    width: 49px;
    height: 49px;
    margin-right: 20px;
    background: #fad7a3;
    border-radius: 50%;
    background: url("../assets/img/true.png") no-repeat center;
  }
  span {
    // width: 138px;
    height: 50px;
    line-height: 50px;
    font-size: 35px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fad7a3;
  }
}
</style>