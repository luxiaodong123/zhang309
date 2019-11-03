<template>
  <div class="signatureInfo-main">
    <div id="comment_dialog"
         v-show="sign38Flag=='true'">

      <div id="leftView">
        <p id="comment_title"></p>
        <div id="signImage"
             class="signImagecss"></div>

      </div>

      <div id="tmpcanvascss"
           class="tmpcanvascss"
           style="height: 260px">
        <div id="signTitle"
             style="width: 100%;"></div>
        <canvas id="comment_canvas"></canvas>
      </div>

      <div id="comment_btnContainerInner"
           class="comment_btncontainer">
        <!--<input id="comment_ok"  v-show="false" type="button" class="button orange" value="确 定">-->
        <input id="comment_back"
               v-show="true"
               type="button"
               class="button orange"
               value="后退">
        <input id="comment_cancel"
               v-show="false"
               type="button"
               class="button orange"
               value="取 消">
      </div>
      <div id="btnContainerOuter1">
        <div id="btnContainerInner1">
          <span class="sign-btn-submit"
                id="comment_ok">确定</span>
        </div>

      </div>
    </div>
    <div id="dialog"
         v-show="sign38Flag=='false'"
         :class="sign38Flag=='false'?'show':''">
      <!--<p class="close"><a href="#" onclick="closeBg();">关闭</a></p> -->
      <!-- 显示签名区域-->
      <div class="sign-name-div">
        <span class="signature">请<big>{{signNameTitle}}</big>签字</span>
        <span class="clear-span"
              @click="_clear_canvas">清除</span>
      </div>
      <div class="sign-tip-div">
        <span class="left-arrow"
              id="single_scrollbar_up"></span>
        <span class="center-arrow">请横向书写完成签名</span>
        <span class="right-arrow"
              id="single_scrollbar_down"></span>
      </div>
      <div id="anysign_title"
           style="color:#333333;"
           width="100%">请投保人
        <span style="font-size:20pt;"> 李 元 </span>签名</div>
      <div id="container"
           @touchmove.stop.prevent="drag($event)"
           @touchstart.stop.prevent="drag($event)"
           @touchend.stop.prevent="drag($event)"
           style="height: 300px;overflow: hidden">
        <canvas id="anysignCanvas"
                width="2">
        </canvas>
      </div>

      <div id="single_scrollbar"
           style="text-align: center;  vertical-align:middle; display: block">
        <!--<span id="single_scroll_text"> *滑动操作：</span>-->
        <!--<input id="single_scrollbar_up"-->
        <!--style="-->
        <!--background-image:linear-gradient(90deg, #62D5E8 0%, #2FA8FE 100%);-->
        <!--border-radius: 100px;-->
        <!--color:#fff"type="button" class="button" value="左移"/>-->
        <!--<input id="single_scrollbar_down"-->
        <!--style="-->
        <!--background-image:linear-gradient(90deg, #62D5E8 0%, #2FA8FE 100%);-->
        <!--border-radius: 100px;-->
        <!--color:#fff"type="button" class="button" value="右移"/>-->
      </div>

      <div id="btnContainerOuter">
        <div id="btnContainerInner">
          <!--<span style="font-size: 16px;-->
          <!--display: inline-block;-->
          <!--width: 120px;-->
          <!--height: 30px;-->
          <!--text-align: center;-->
          <!--line-height: 30px;-->
          <!--background: #F8F8F8;-->
          <!--border: 1px solid rgba(5,5,5,0.10);-->
          <!--border-radius: 100px;-->
          <!--font-family: PingFangSC-Regular;-->
          <!--color: #333333;" @click="_clear_canvas">清除</span>-->
          <span class="sign-btn-submit"
                @click="_sign_confirm">确定</span>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
let apiInstance = new AnySignApi()
let ocrCapture = new OCRCapture()
let sign_confirm = window.sign_confirm
let clear_canvas = window.clear_canvas
let cancelSign = window.cancelSign

export default {
  data() {
    return {
      btnFlag: true,
      DATA_CANNOT_PARSED: '10003', //输入数据项无法解析
      SERVICE_SYSTEM_EXCEPTION: '10011', //服务系统异常错误
      RECOGNITION_RESULT_EMPTY: '10100', //识别结果为空
      CONNECTION_SERVICE_TIMEOUT: '10101', //连接识别服务超时
      CONNECTION_RECOGNITION_EXCEPTION: '10102', //连接识别服务异常
      SUCCESS: '0', //识别成功
      RECOGNITION_FALSE: '-1',//识别错误
      orderNo: this.$route.query.orderNo || '291010020202022',
      uuid: this.$route.query.uuid || '4443434-34-3434-34-3-3-43-3',
      //name: this.$route.query.signName || '',
      signNameType: {
        '1': '投保人',
        '2': '被保人',
        '3': '投/被保人',
        '4': '被保人的法定监护人',
        '5': '代理人',
      },
      signDomId: {
        '20900': '20',
        '20901': '21',
        '20902': '22',
        '20903': '23',
        '20904': '24',
        '21020': '25',
        '21040': '26',
        '20905': '27',
        '21202': '28',
        '21200': '29'
      },
      keyWord: {
        '20900': '投保人签名',
        '20901': '被保险人签名',
        '20902': '代理人签名',
        '20903': '投保人签名:c',
        '20904': '(或其法定监护人)签名',
        '20905': '投保人签名:b',
        '21020': '投保人（签名）',
        '21040': '客户签名',
        '21200': '声明人(投保人)签字:',
        '21202': '(被保险人或其监护人)签字:',
      },
      // signInfo: JSON.parse(sessionStorage.getItem('sign_info')),
      signInfo: {
        signName: '易诚',
        signUserType: '1',
        signPaperType: '5',
        signNo: '20902',
        templateNo: '11011111111',
        caXml: "{}"
      },
      // sign38Info: JSON.parse(sessionStorage.getItem('sign38_info')),
      signNameTitle: '',
      sign38Flag: this.$route.query.sign38Flag || '',
    }
  },
  /*
  * 人身投保提示书模板号：1534306732004
  * 签名规则：投保人签名 20900

    电子保单模板号：1534306792749
    签名规则：
       投保人/被保险人(或其法定监护人)签名 ：20901
       代理人签名：20902
       投保签名:20903
       被保险人(或其法定监护人)签名：20904
  *
  * */
  mounted() {
    window.sessionStorage.setItem("bdInfoOpenFlag", false);
    let self = this;
    // 分享控制
    self.$controlShare("hideOptionMenu");
    this._testAnySign(30021412, this.signDomId[this.signInfo.signNo]);

    if (this.signInfo.signUserType == '4') {
      this.signNameTitle = '被保人的法定监护人';
    }
    else {
      this.signNameTitle = this.signInfo.signName;
    }
    self._clear_canvas();
  },
  methods: {
    //弹出批注签名框
    _testCommentDialog(context_id) {
      if (!apiInstance) {
        alert('信手书接口没有初始化')
        return
      }
      switch (apiInstance.showCommentDialog(context_id)) {
        case RESULT_OK:
          //document.getElementById('other').style.display = 'none'
          break
        case EC_API_NOT_INITED:
          alert('信手书接口没有初始化')
          break
        case EC_WRONG_CONTEXT_ID:
          alert('没有配置相应context_id的签字对象')
          break
        case EC_COMMENT_ALREADY_SHOW:
          alert('批注签名框已弹出，请勿重复操作！')
      }

    },
    _utf8_encode(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }
      return utftext;
    },
    _encode(input) {
      let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = this._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
    },
    //获取当前时间，格式YYYY-MM-DD
    _getNowFormatDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + '年' + month + '月' + strDate + '日';
      return currentdate;
    },
    drag() {
      return false;
    },
    setAlertTitle() {
      document.title = '返回结果'
    },
    _sign_confirm() {
      // if (this.btnFlag) {
      //   this.btnFlag = false;
      sign_confirm()
      // }

    },
    _clear_canvas() {
      clear_canvas()
    },
    _cancelSign() {
      cancelSign()
    },
    _testAddSignatureObj(objId) {
      let self = this;
      var context_id = objId;
      // let signName = ''
      // if (this.signInfo.signUserType == '4') {
      //   signName = '被保人的法定监护人';
      // }
      // else {
      //   signName = this.signInfo.signName;
      // }
      var signer = new Signer(this.signInfo.signName, '11011111111')

      /**
       * 根据坐标定位签名方式
       * @param left 签名图片最左边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param top 签名图片顶边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param right 签名图片最右边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param bottom 签名图片底边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param pageNo 签名在PDF中的页码，从1开始
       * @param unit 坐标系单位，目前支持"dp"和"pt"
       * @constructor
       */
      //var signerRule = new SignRule_XYZ(100.0, 150.1, 180.2, 50.3, 2, 'pt')

      /**
       * 关键字定位方式，寻找PDF中的关键字，根据关键字位置放置签名图片
       * @param keyword 关键字
       * @param keyWordAlignMethod 签字图片和关键字位置关系：等于1时，签字图片和关键字矩形重心重合
       *                            等于2时，签字图片位于关键字正下方，中心线对齐；等于3时，签字图片位于关键字正右方，中心线对齐；
       *                            等于4时，签字图片左上角和关键字右下角重合，可能额外附加偏移量，详见构造函数的offset参数
       * @param keyWordOffset 当keyWordAlignMethod非零时，额外附加的偏移量，单位pt
       * @param pageNo 寻找关键字的PDF起始页码
       * @param KWIndex KWIndex 第几个关键字
       * @constructor
       */
      var signerRule = new SignRule_KeyWord(self.keyWord[self.signInfo.signNo], 3, 3, 1, 1);
      //var signerRule = new SignRule_KeyWordV2("签名算法",50,0,1,1);

      /**
       *根据关键字定位签名位置
       * @param keyWord 关键字字面值
       * @param xOffset X轴偏移量，适配关键字和规则
       * @param yOffset Y轴偏移量，适配关键字和规则
       * @param pageNo 签名在PDF中的页码，第几页查找关键字，正数为正序，当是负数为倒序
       * @param KWIndex KWIndex 第几个关键字
       * @constructor
       */
      //                var signerRule = new SignRule_KeyWord("电子保单",100,100,1,1);

      /**
       * 关键字定位方式，寻找PDF中的关键字，根据关键字位置放置签名图片
       * @param keyword 关键字
       * @param keyWordAlignMethod 签字图片和关键字位置关系：等于0时，签字图片和关键字矩形重心重合
       *                            等于1时，签字图片位于关键字正下方，中心线对齐；等于2时，签字图片位于关键字正右方，中心线对齐；
       *                            等于3时，签字图片左上角和关键字右下角重合，可能额外附加偏移量，详见构造函数的offset参数
       * @param keyWordOffset 当keyWordAlignMethod非零时，额外附加的偏移量，单位pt
       * @param pageNo 寻找关键字的PDF起始页码
       * @param KWIndex KWIndex 第几个关键字
       * @constructor
       */
      //                var signerRule = new SignRule_KeyWordV2("电子保单", "0", 10, 1,1);

      var signatureConfig = new SignatureConfig(signer, signerRule)
      //                   1:时间在上、2：时间在下、3：时间在右
      var timeTag = new TimeTag(1, 'yyMMdd hh:mm;ss')
      //                signatureConfig.timeTag = timeTag;
      signatureConfig.singleWidth = 200
      signatureConfig.singleHeight = 200
      // let fdName = ''
      // if (this.signInfo.signUserType == '4') {
      //   fdName = '被保人的法定监护人';
      // }
      // else {
      //   fdName = this.signInfo.signName;
      // }
      signatureConfig.title = `请 ${this.signInfo.signName} 签字`;
      //signatureConfig.title = `请${this.signNameType[this.$route.query.signUserType]} ${this.name}签字`;
      signatureConfig.titleSpanFromOffset = 1
      signatureConfig.titleSpanToOffset = (signatureConfig.title.length - 3);
      signatureConfig.penColor = '#000'
      signatureConfig.isTSS = false//是否开始时间戳服务
      signatureConfig.signatureImgRatio = 3.0
      signatureConfig.nessesary = true
      signatureConfig.ocrCapture = ocrCapture
      var res = apiInstance.addSignatureObj(context_id, signatureConfig)
      if (res) {
        return res
      }
      else {
        alert('addSignatureObj ' + context_id + ' error')
        return res
      }
    },
    _setIdentifyCallBack(callback) {
      if (!apiInstance) {
        alert('信手书接口没有初始化')
        return
      }
      apiInstance.setIdentifyCallBack(callback)
    },
    //生成签名加密数据
    _setData(val) {
      let result = '';
      let self = this;
      try {
        result = apiInstance.getUploadDataGram();
      }
      catch (err) {
        alert(err)
      }

      //这里需要注意，如果在投保单内共用模板数据，需要设置业务数据是n
      //比如调查问卷，被保人
      let userType = (this.signInfo.signUserType == '1' ||
        this.signInfo.signUserType == '3') ? 'Y' : 'N';
      if (this.signInfo.signPaperType == '5') {
        userType = 'N';
      }
      let tempResult = JSON.parse(result);
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        url: `${this.$axios.defaults.cxBaseURL}longinsurance/h5/sign/${this.uuid}`,
        data: {
          'orderNo': this.orderNo,
          'caRequestDTO': {
            'hasBusinessData': userType,
            'imageType': 'jpg',
            'signData': result,
            'signImageBase64': val,
            'signNo': this.signInfo.signNo,
            'templateNo': this.signInfo.templateNo
          }
        },
        postConfig: true
      }).then((res) => {
        if (res.data.errCode == 0) {
          self.btnFlag = true;
          self.$router.back();
        }
        else {
          self.$vux.toast.text(res.data.errMsg, 'middle')
        }

      })
    },
    //添加批签签名框
    _testAddCommentObj(objId) {

      var context_id = objId
      var signer = new Signer('李明', '11011111111')

      /**
       * 根据坐标定位签名方式
       * @param left 签名图片最左边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param top 签名图片顶边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param right 签名图片最右边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param bottom 签名图片底边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
       * @param pageNo 签名在PDF中的页码，从1开始
       * @param unit 坐标系单位，目前支持"dp"和"pt"
       * @constructor
       */
      //var signerRule = new SignRule_XYZ(84.0, 523.0, 400.0, 477.0, 1, 'dp');
      var signerRule = new SignRule_KeyWord('asdo', 3, 3, 1, 1);

      /**
       * 关键字定位方式，寻找PDF中的关键字，根据关键字位置放置签名图片
       * @param keyword 关键字
       * @param keyWordAlignMethod 签字图片和关键字位置关系：等于1时，签字图片和关键字矩形重心重合
       *                           等于2时，签字图片位于关键字正下方，中心线对齐；等于3时，签字图片位于关键字正右方，中心线对齐；
       *                            等于4时，签字图片左上角和关键字右下角重合，可能额外附加偏移量，详见构造函数的offset参数
       * @param keyWordOffset 当keyWordAlignMethod非零时，额外附加的偏移量，单位pt
       * @param pageNo 寻找关键字的PDF起始页码
       * @param KWIndex KWIndex 第几个关键字
       * @constructor
       */
      //              var signerRule = new SignRule_KeyWord("默认",4,0,1,1);

      var commentConfig = new CommentConfig(signer, signerRule)
      //                   1:时间在上、2：时间在下、3：时间在右
      var timeTag = new TimeTag(1, 'yyMMdd hh:mm;ss')
      //                signatureConfig.timeTag = timeTag;
      commentConfig.isTSS = false//是否开始时间戳服务
      //              commentConfig.commitment = "本人已阅";
      commentConfig.commitment = '本人已阅读保险条款，产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。'
      commentConfig.commitmentTextSize = 20 + "px";
      commentConfig.mass_word_height = 30
      commentConfig.mass_word_width = 30
      commentConfig.mass_words_in_single_line = 21
      commentConfig.penColor = '#000'
      commentConfig.nessesary = false
      commentConfig.isdistinguish = false
      commentConfig.ocrCapture = ocrCapture
      var res = apiInstance.addCommentObj(context_id, commentConfig)
      if (res) {
        //alert('addCommentObj ' + context_id + ' success')
        return res
      }
      else {
        alert('addCommentObj ' + context_id + ' error')
        return res
      }
    },
    //demo总入口
    _testAnySign(channel, id) {
      let self = this
      var res
      //识别回调接口
      var identify_callback = function (errCode) {

        if (errCode == self.SUCCESS) {
          return
        }
        self.btnFlag = true;
        if (errCode == self.DATA_CANNOT_PARSED) {
          alert('输入数据项无法解析！')
        } else if (errCode == self.SERVICE_SYSTEM_EXCEPTION) {
          alert('服务系统异常错误！')
        } else if (errCode == self.RECOGNITION_RESULT_EMPTY) {
          alert('识别结果为空！')
        } else if (errCode == self.CONNECTION_SERVICE_TIMEOUT) {
          alert('连接识别服务超时！')
        } else if (errCode == self.CONNECTION_RECOGNITION_EXCEPTION) {
          alert('连接识别服务异常！')
        } else if (errCode == self.RECOGNITION_FALSE) {
          alert('书写错误！')
        } else {
          alert(errCode)
        }
      }

      var callback = function (context_id, context_type, val) {
        //alert(context_type);
        //document.getElementById('other').style.display = 'block'
        if (context_type == CALLBACK_TYPE_START_RECORDING || context_type == CALLBACK_TYPE_STOP_RECORDING) {
          return
        }

        if (context_type == CALLBACK_TYPE_SIGNATURE) {
          self._setData(val);
        }
        else if (context_type == CALLBACK_TYPE_COMMENTSIGN) {
          // self.sign38Flag = 'false';
          // self._testPopupDialog(self.signDomId[self.signInfo.signNo]);
        }
        else if (context_type == CALLBACK_TYPE_ON_PICTURE_TAKEN) {
          // document.getElementById('preview').src = 'data:image/png;base64,' + val
        } else if (context_type == CALLBACK_TYPE_ON_MEDIA_DATA) {
          // var audio = document.createElement('audio')
          // if (audio != null && audio.canPlayType && audio.canPlayType('audio/mpeg')) {
          //   audio.src = 'data:image/gif;base64,' + val
          //   audio.play()
          // }
        }
      }//测试回调，将回调数据显示
      EncAlgType.EncAlg = 'RSA'

      //var channel = "10010";//渠道号，由信手书提供，请咨询项目经理
      //初始化签名接口
      res = apiInstance.initAnySignApi(callback, channel)

      if (!res) {
        alert('init error')
      } else {

      }
      ////////////////////////////////////////////////

      //开启识别
      let signName = ''
      if (this.signInfo.signUserType == '4') {
        signName = '被保人的法定监护人';
      }
      else {
        signName = this.signInfo.signName;
      }
      ocrCapture.text = '123';
      ocrCapture.IPAdress = "http://192.168.126.32:11203/HWR/RecvServlet";
      //ocrCapture.IPAdress = 'https://ininprod.life.cntaiping.com/HWR/RecvServlet'
      ocrCapture.IPAdress = this.$axios.defaults.cxBaseURL + 'HWR/RecvServlet';
      //        ocrCapture.IPAdress = "http://60.247.77.116:11203/HWR/RecvServlet";
      ocrCapture.appID = '123'
      ocrCapture.count = 5
      ocrCapture.language = Language.CHS
      ocrCapture.resolution = 80
      ocrCapture.serviceID = '999999';
      //apiInstance.startOCR(ocrCapture);

      //this._setIdentifyCallBack(identify_callback)
      if (!apiInstance) {
        alert('信手书接口没有初始化')
        return
      }
      apiInstance.setIdentifyCallBack(identify_callback)

      ///////////////////////////////////////////////

      //注册单字签字对象20
      res = this._testAddSignatureObj(this.signDomId[this.signInfo.signNo])
      if (!res) {
        alert('testAddSignatureObj error')
      } else {

      }
      res = this._testAddCommentObj(30)
      if (!res) {
        alert('testAddCommentObj error')
        return
      } else {

      }

      //将配置提交
      res = apiInstance.commitConfig()

      if (res) {
        console.log('Init ALL 初始化成功')
      } else {
        console.log('Init ALL 初始化失败')
      }

      ////////////////////////////////////////////////
      self._testSetTemplateData();

      if (self.sign38Flag == 'true') {
        self._testCommentDialog(30);
      }
      else {
        self._testPopupDialog(self.signDomId[self.signInfo.signNo]);
      }

    },

    //配置模板数据
    _testSetTemplateData() {

      // var formData = "{\"bjcaxssrequest\":{\"submitinfo\":[{\"username\":\"测星雨\",\"identitycardnbr\":\"320902198901191012\"},{\"username\":\"测星雨123\",\"identitycardnbr\": \"320902198901191012\"}]}}";

      var formData = this._encode(this.signInfo.caXml);
      //var formData = "<?XML VERSION=\"1.0\" ENCODING=\"UTF-8\"?><REQUEST></REQUEST>";

      //文件数据
      //          var formData = fileData;
      // var businessId = this.$route.query.orderNo;//集成信手书业务的唯一标识
      var businessId = this.orderNo;//集成信手书业务的唯一标识

      var template_serial = this.signInfo.templateNo;//用于生成PDF的模板ID

      var res;

      //配置JSON格式签名原文
      /**
       * 设置表单数据，每次业务都需要set一次
       * @param template_type 签名所用的模板类型
       * @param contentUtf8Str 表单数据，类型为Utf8字符串
       * @param businessId 业务工单号
       * @param template_serial 模板序列号
       * @returns {*} 是否设置成功
       */
      res = apiInstance.setTemplate(TemplateType.XML, formData, businessId, template_serial)

      if (res) {
        //alert('setTemplateData success')
        return res
      }
      else {
        alert('setTemplateData error')
        return res
      }
    },
    //弹出签名框签名
    _testPopupDialog(context_id) {
      if (!apiInstance) {
        alert('信手书接口没有初始化')
        return
      }
      switch (apiInstance.showSignatureDialog(context_id)) {
        case RESULT_OK:
          //document.getElementById('other').style.display = 'none'
          break
        case EC_API_NOT_INITED:
          alert('信手书接口没有初始化')
          break
        case EC_WRONG_CONTEXT_ID:
          alert('没有配置相应context_id的签字对象')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.signatureInfo-main {
  #dialog.show {
    display: block;
  }
  #signImage {
    overflow: auto;
  }
  #btnContainerOuter1 {
    position: fixed;
    width: 100%;
    bottom: 5px;
    .sign-btn-submit {
      font-size: 16px;
      display: block;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-image: linear-gradient(
        90deg,
        rgb(98, 213, 232) 0%,
        rgb(47, 168, 254) 100%
      );
      border-radius: 100px;
      color: rgb(255, 255, 255);
      margin: 0 15px;
    }
  }
  #btnContainerOuter {
    margin: 0 0 0 0;
    text-align: center;
    vertical-align: middle;
    display: block;
    span + span {
      margin-left: 30px;
    }
  }
  #anysign_title {
    width: 100%;
    display: inherit;
    padding-top: 15px;
    font-size: 14px;
    height: 50px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #999999;
    display: none;
    .signature {
      color: #666666;
    }
    big {
      font-family: PingFangSC-Regular;
      font-size: 18px;
      font-size: 20px;
      color: #333333;
    }
  }
  .sign-name-div {
    padding: 25px 15px 15px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #999999;
      big {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333333;
        margin: 0 8px;
      }
    }
    span.clear-span {
      background: #f8f8f8;
      border: 1px solid rgba(5, 5, 5, 0.1);
      border-radius: 100px;
      width: 88px;
      display: inline-block;
      line-height: 30px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
      text-align: center;
    }
  }
  .sign-tip-div {
    margin: 30px 15px 10px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .left-arrow,
    .right-arrow {
      width: 43px;
      height: 43px;
      background: #f22;
      // background-size: contain;
    }
    .left-arrow {
      background: url("../assets/img/left.png") no-repeat center;
    }
    .right-arrow {
      background: url("../assets/img/right.png") no-repeat center;
    }

    // .left-arrow {
    //   width: 43px;
    //   height: 43px;
    //   background: #f22;
    //   background-image: url("../../assets/img/signature/left.png");
    //   background-size: contain;
    // }
    // .right-arrow {
    //   width: 43px;
    //   height: 43px;
    //   background: #f22;
    //   background-image: url("../../assets/img/signature/right.png");
    //   background-size: contain;
    // }
    .center-arrow {
      text-align: center;
      flex: 1;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #5e87f3;
    }
  }
  #container {
    border: none;
    border-bottom: 1px solid #efeff4 !important;
    box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.15);
    margin-left: 15px;
    position: relative;
    .test {
      position: absolute;
      width: 200%;
      height: 100%;
      z-index: 99;
      font-size: 100px;
      color: #ccc;
      text-align: center;
      line-height: 300px;
      letter-spacing: 80px;
    }
    canvas {
      background: #ffffff;
      border: 1px solid #efeff4;
      box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }
  }
  #btnContainerOuter {
    position: fixed;
    width: 100%;
    bottom: 100px;
    .sign-btn-submit {
      font-size: 18px;
      line-height: 32px;
      display: block;
      height: 32px;
      text-align: center;
      background: linear-gradient(
        0deg,
        rgba(201, 160, 99, 1) 0%,
        rgba(254, 220, 168, 1) 100%
      );
      // background-image: linear-gradient(
      //   90deg,
      //   rgb(98, 213, 232) 0%,
      //   rgb(47, 168, 254) 100%
      // );
      border-radius: 100px;
      color: #141E3E;
      margin: 0 15px;
    }
  }
}
</style>
