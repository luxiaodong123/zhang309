<template>
  <div class="u-main">
    <div class="u-main-header">
      <span class="l">填写信息</span>
      <span class="m">上传图片</span>
      <span class="r">提交信息</span>
    </div>
    <!-- 中间图标 -->
    <div class="u-mian-icon"></div>
    <div class="u-main-content">
      <!-- 上传图片 -->
      <div class="u-tt">
        <span></span>
        <p>上传图片</p>
      </div>
      <!-- 中间身份证  学历 -->
      <div class="u-user">
        <div class="u-user-upload"
             @click="wechatImg('1')">
          <img src="https://static.ycbrokers.com/resource/img/idcard_f.png"
               v-if="idFront == ''">
          <img :src="idFront"
               alt=""
               v-else>
          <span>身份证人像面</span>
        </div>
        <div class="u-user-upload"
             @click="wechatImg('1', 'B')">
          <img src="https://static.ycbrokers.com/resource/img/idcard_b.png"
               v-if="idBack == ''">
          <img :src="idBack"
               alt=""
               v-else>
          <span>身份证国徽面</span>
        </div>
        <div class="u-user-upload"
             @click="wechatImg('3')">
          <img src="https://static.ycbrokers.com/resource/img/education.png"
               v-if="educationImg == ''">
          <img :src="educationImg"
               alt=""
               v-else>
          <span>学历证</span>
        </div>
        <div class="u-user-upload"
             @click="wechatImg('2')">
          <img src="https://static.ycbrokers.com/resource/img/bank.png"
               v-if="bankImg == ''">
          <img :src="bankImg"
               alt=""
               v-else>
          <span>银行卡号面</span>
        </div>
      </div>
      <!-- 底部下一步按钮 -->
      <div class="u-user-btn"
           @click="next(a)">下一步</div>
    </div>
  </div>
</template>

<script>
import { wxImage } from '@js/wechat-control';
export default {
  data() {
    return {
      idFront: '', //身份证正面
      idBack: '', //身份证反面
      bankImg: '', //银行卡
      educationImg: '', //学历证书
    }

  },
  components: {
  },

  computed: {},

  mounted() {
    //初始化微信拍照
    wxImage(this);
  },

  methods: {
    /**
     * 微信拍照
     * @param {*} type 拍照类型 1是身份证 2是银行卡 3是学历
     * @param {*} side 正反面  F正面 B反面
     */
    wechatImg(type, side = 'F') {
      let self = this;
      wx.chooseImage({
        count: 1, // 默认9，这里每次只处理一张照片
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let localId = res.localIds[0].toString();//因为我们只取一张，所以只有将数组的第一项转字符串保存起来传给 getLocalImgData 方法即可
          wx.getLocalImgData({
            localId: localId, // 图片的localID
            success: function (res) {
              let u = navigator.userAgent,
                isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                imgSrc = isiOS ? res.localData : 'data:image/jpeg/png;base64,' + res.localData;
              //上传图片
              // self.sureSave();
              if (type == '1') {
                side == 'B' ? self.idBack = imgSrc : self.idFront = imgSrc;
              }
              if (type == '2') {
                self.bankImg = imgSrc;
              }
              if (type == '3') {
                self.educationImg = imgSrc;
              }
            }
          });
        }
      });
    },
    // 确认保存上传图片
    /**@augments {certiObj} 拍照的证件信息*/
    sureSave(img, certiObj) {
      let self = this;
      if (img == '') {
        self.$tip.info('请上传证件图片');
        return;
      }
      let param = new FormData(); //创建form对象
      param.append('file', self.dataURLtoBlob(img));//通过append向form对象添加数据
      param.append('certiSide', certiObj.certiSide);//身份证是需要传正反面certiSide
      param.append('certiType', parseInt(certiObj.certiType));//身份证是需要传正反面certiSide
      param.append('certiNo', certiObj.certiNo);
      certiObj.certiIndex && param.append('certiIndex', certiObj.certiIndex);//身故受益人需要传certiIndex序列号
      let url = self.$axios.defaults.csBaseURL + `/cs/upload-image`;
      self.$vux.loading.show({
        text: '上传中...'
      })
      $.ajax({
        url: url,
        async: true,
        data: param,
        xhrFields: { withCredentials: true },
        type: 'post',
        processData: false,
        contentType: false,
        success: function (res) {
          if (res.errCode == 0) {
            self.$vux.loading.hide();
            if (certiObj.photoType == '1') { //申请人照片
              let path = self.$axios.defaults.csBaseURL + `/cs/download-id-image?certiType=1&certiNo=${self.sqrCertiNo}&certiSide=${certiObj.certiSide}&t=` + new Date().getTime();
              certiObj.certiSide == 'F' && (self.photoBox.sqrFront = path);
              certiObj.certiSide == 'B' && (self.photoBox.sqrBack = path);
            }
          } else {
            self.$vux.loading.hide();
            // self.$vux.toast.show({ text: res.errMsg, type: 'text' });
          }
        },
        error: function (err) {
          // self.$vux.toast.show({ text: JSON.stringify(err), type: 'text' });
        }
      })
    },
    //base64 转二进制流
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
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
    color: rgba(255, 255, 255, 1);
  }
  .l,
  .r {
    opacity: 0.28;
  }
  .r {
    height: 16px;
    color: rgba(255, 255, 255, 1);
  }
  .m {
    flex: 1;
    color: rgba(250, 215, 163, 1);
  }
}
.u-mian-icon {
  width: 36px;
  height: 4px;
  background: rgba(250, 215, 163, 1);
  border-radius: 2px;
  position: absolute;
  top: 45px;
  left: 168px;
}
// 下面 白色内容区域
.u-main-content {
  width: 355px;
  height: 1311px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 31px auto 22px;
  position: relative;
  // 上传图片
  .u-tt {
    width: 100%;
    height: 59px;
    background: rgba(246, 246, 246, 1);
    border-radius: 10px;
    display: flex;
    align-items: center;
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
      margin-left: 7px;
      color: #5e87f3;
    }
  }
  // 下面上传图片
  .u-user {
    width: 100%;
    padding: 0 28px;
  }
  .u-user-upload {
    width: 100%;
    height: 280px;
    border-bottom: 1px solid #d2d2d2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 239px;
      height: 180px;
      margin-bottom: 10px;
    }
    span {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
  }
  // 底部按钮下一步
  .u-user-btn {
    width: 274px;
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
    margin: 0 40px;
    text-align: center;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #141e3e;
  }
}
</style>