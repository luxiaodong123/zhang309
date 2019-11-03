<!--在线入职  经纪人  -->
<template>
  <div class="u-main">
    <div class="u-main-header">
      <span class="l">填写信息</span>
      <span class="m">上传图片</span>
      <span class="r">提交信息</span>
    </div>
    <!-- 中间图标 -->
    <div class="u-mian-icon"></div>
    <!-- 主体结构中间内容区域 -->
    <div class="u-main-content">
      <div class="u-tt">
        <span></span>
        <p>经纪人信息</p>
      </div>
      <!-- 中下input框 -->
      <!-- 第一个页面 -->
      <div class="u-user" v-if="pageIndex == 1">
        <div class="u-user-u">
          <span>姓名</span>
          <input class="ipt" type="text" v-model="agentInfo.agentName" placeholder="请输入你的姓名" />
        </div>
        <div class="u-user-u">
          <span>证件类型</span>
          <p class="inputt">
            <span class="one">{{agentInfo.documentType.text}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <!-- 证件号码 -->
        <div class="u-user-u">
          <span>证件号码</span>
          <p class="inputt">
            <input class="ipt" type="number" v-model="agentInfo.idCardNum" placeholder="请扫描证件号码" />
            <span class="zjhm"></span>
          </p>
        </div>
        <!-- 证件有效期 -->
        <div class="u-user-u">
          <span>证件有效期</span>
          <p class="inputt" @click="choosePop('2')">
            <!-- <span class="one">{{agentInfo.certiVali.text}}{{agentInfo.certiVali1}}</span> -->
            <span class="one">{{agentInfo.certiVali.text}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <!-- 出生日期 -->
        <div class="u-user-u">
          <span>出生日期</span>
          <p class="inputt" @click="angentStatus = true">
            <span class="one">{{agentInfo.birthday}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <!-- 性别 -->
        <div class="u-user-u">
          <span>性别</span>
          <div class="u-check">
            <p
              class="check"
              :class="[agentInfo.gender == item.val ? 'active' :'']"
              v-for="(item, index) in checkArr"
              :key="index"
              @click="crtlCheck(item)"
            >
              <span class="i"></span>
              <span class="v">{{item.text}}</span>
            </p>
          </div>
        </div>
        <!-- 民族 -->
        <div class="u-user-u">
          <span>民族</span>
          <input class="ipt" type="text" v-model="agentInfo.nation" placeholder="请输入你的民族" />
        </div>
        <!-- 第一个页面底部的下一步按钮 -->
        <div class="u-user-btn" @click="nextOne(pageIndex)">下一步</div>
      </div>
      <!-- 第二个页面 -->
      <!-- 学历 -->
      <div class="u-user" v-if="pageIndex == 2">
        <div class="u-user-u">
          <span>学历</span>
          <p class="inputt" @click="choosePop('4')">
            <span class="one">{{agentInfo.education.text}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <!-- 政治面貌 -->
        <div class="u-user-u">
          <span>政治面貌</span>
          <p class="inputt" @click="choosePop('5')">
            <span class="one">{{agentInfo.politicsFace.text}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <!-- 婚姻状况 -->
        <div class="u-user-u">
          <span>婚姻状况</span>
          <p class="inputt" @click="choosePop('6')">
            <span class="one">{{agentInfo.marriageState.text}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <!-- 家庭住址 -->
        <div class="u-user-u" id="u-user-none">
          <span>家庭住址</span>
          <p class="inputt" @click="cityStatus = true">
            <span class="where">{{agentInfo.province}}-{{agentInfo.city}}-{{agentInfo.area}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <div class="u-user-mn">
          <textarea v-model="agentInfo.address" placeholder="请输入家庭住址"></textarea>
        </div>

        <!-- 职级 -->
        <div class="u-user-u">
          <span>职级</span>
          <p class="inputt" @click="choosePop('7')">
            <span class="one">{{agentInfo.rank.text}}</span>
            <span class="icon"></span>
          </p>
        </div>
        <!-- 底部第二个页面  返回  下一步功能 -->
        <div class="u-user-btn2">
          <button class="back" @click="goBack(pageIndex)">上一步</button>
          <button class="next" @click="nextTwo(pageIndex)">下一步</button>
        </div>
      </div>
      <!-- 第三个页面 -->
      <div class="u-user" v-if="pageIndex == 3">
        <!-- 银行账号 -->
        <div class="u-user-u">
          <span>银行账号</span>
          <p class="inputt">
            <input class="ipt" type="number" v-model="agentInfo.bankAmount" placeholder="请扫描银行账号" />
            <span class="zjhm"></span>
          </p>
        </div>
        <!-- 开户行 -->
        <div class="u-user-u">
          <span>开户行</span>
          <input class="ipt" type="text" v-model="agentInfo.openBank" placeholder="请输入开户行" />
        </div>
        <!-- 手机号码 -->
        <div class="u-user-u">
          <span>手机号码</span>
          <input
            class="ipt"
            type="number"
            maxlength="11"
            v-model="agentInfo.phoneNum"
            placeholder="请输入你的手机号码"
          />
        </div>
        <!-- 发送验证码 -->
        <!-- 自己写的 -->
        <!-- <div class="u-user-u">
          <span>验证码</span>
          <span class="yanzheng">发送验证码</span>
        </div>-->
        <!-- 复制老大的 -->
        <div class="u-user-u">
          <span class="yanzheng">验证码</span>
          <input
            class="iptyan"
            type="text"
            v-model="verifyCode"
            maxlength="6"
            @blur="fixScroll"
            placeholder="请输入验证码"
          />
          <button
            class="btn"
            :disabled="verifiState"
            :class="[verifiState ? 'grey' : '']"
            @click="sendVerifi"
          >{{sendMsgText}}</button>
        </div>

        <!-- 底部第3个页面  返回  下一步功能 -->
        <div class="u-user-btn3">
          <button class="back" @click="goBack(pageIndex)">上一步</button>
          <button class="next" @click="nextThree(pageIndex)">下一步</button>
        </div>
      </div>
    </div>
    <!-- 下面写所有的弹框 -->
    <!-- 三个页面公共的下拉弹框组件 证件类型  有效期  学历 -->
    <van-popup v-model="popStatus" position="bottom">
      <van-picker :columns="popList" show-toolbar @cancel="popStatus = false" @confirm="popConfirm"></van-picker>
    </van-popup>
    <!-- 第二个页面 省市区三级联动 -->
    <van-popup v-model="cityStatus" position="bottom">
      <van-area :area-list="areaList" @cancel="cityStatus = false" @confirm="cityConfirm" />
    </van-popup>
    <!-- 第一个页面 -->
    <!-- 时间的组件 -->
    <!-- 出生日期 -->
    <van-popup v-model="angentStatus" position="bottom">
      <van-datetime-picker
        v-model="currentData"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="angentStatus = false"
      />
    </van-popup>

    <!-- 有效期至 -->
    <van-popup v-model="periodStatus" position="bottom">
      <van-datetime-picker
        v-model="currentPeriod"
        type="date"
        :min-date="minPeriod"
        :max-date="maxPeriod"
        @confirm="periodConfirm"
        @cancel="periodStatus = false"
      />
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { Area } from "vant";
import { Popup, Picker, DatetimePicker } from "vant";
// Vue.use(Area);
import { DateFormat } from "@js/filter";
import controlStorage from "@js/storage";
import city from "../assets/js/city";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 获取验证码
      regPhone: /^1\d{10}$/i,
      verifyCode: "",
      phoneNum: "",
      sendMsgText: "获取验证码",
      verifiState: false,
      // 省市区三级联动
      cityStatus: false,
      // province: "河南省",
      // city: "三门峡",
      // area: "灵宝",
      areaList: [],
      // address: "",
      // 出生日期
      angentStatus: false,
      // birthday: "请选择生日",
      currentData: new Date(),
      dateSelectArr: [], //当前change的日期
      minDate: new Date(),
      maxDate: new Date(),
      pageIndex: 1,
      popList: [],
      popStatus: false,
      popType: "1",
      // gender: 1,
      checkArr: [
        {
          text: "男",
          val: 1
        },
        {
          text: "女",
          val: 0
        }
      ],
      // 第一个页面
      // 证件类型
      // certificateVal: {
      //   text: "身份证",
      //   value: 1
      // },
      // certificateList: [
      //   { text: "身份证", value: 1 },
      //   { text: "驾驶证", value: 2 },
      //   { text: "户口本", value: 3 },
      //   { text: "护照", value: 4 },
      //   { text: "社保卡", value: 5 }
      // ],
      // 证件有效期
      periodStatus: false,
      minPeriod: new Date(),
      maxPeriod: new Date(),
      currentPeriod: new Date(),
      certidataList: [
        { text: "长期有效", value: "1" },
        { text: "有效期至...", value: "2" }
      ],
      // 第二个页面
      // 学历education

      educationList: [
        { text: "高中以下", value: 1 },
        { text: "高中", value: 2 },
        { text: "大专", value: 3 },
        { text: "本科", value: 4 },
        { text: "硕士", value: 5 },
        { text: "博士", value: 6 },
        { text: "博士后", value: 7 }
      ],
      // 政治面貌politics
      politicsList: [{ text: "党员", value: 1 }, { text: "群众", value: 2 }],
      // 婚姻状况marriage

      marriageList: [{ text: "已婚", value: 1 }, { text: "未婚", value: 2 }],
      // 职级rank
      rankList: [
        { text: "业务总监", value: 1 },
        { text: "资深业务部经理", value: 2 },
        { text: "高级业务部经理", value: 3 },
        { text: "业务部经理", value: 4 },
        { text: "业务经理", value: 5 }
      ]
    };
  },
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Area.name]: Area
  },

  computed: {
    ...mapGetters({
      agentInfo: "getAgentInfo"
    })
  },

  mounted() {
    this.$controlShare("hideOptionMenu");
    // 最大可选年龄为70周岁
    let nowDate = new Date(),
      nYear = nowDate.getFullYear(),
      nMonth = nowDate.getMonth(),
      nDay = nowDate.getDate();
    this.minDate = new Date(nYear - 71, nMonth, nDay + 1);
    this.minPeriod = new Date(nYear, nMonth, nDay + 1);
    this.maxPeriod = new Date(nYear + 50, nMonth, nDay);
    this.currentPeriod = new Date(nYear, nMonth, nDay + 1);
    this.areaList = city.mm.areaList;
  },

  methods: {
    // 第二个页面
    // 省市区三级联动
    cityConfirm(value) {
      console.log(value);
      this.agentInfo.province = value[0].name;
      this.agentInfo.city = value[1].name;
      this.agentInfo.area = value[2].name;
      this.cityStatus = false;
    },
    // 出生日期
    dateConfirm(value) {
      this.agentInfo.birthday = DateFormat(this.currentData, "yyyy-MM-dd");
      console.log(this.birthday + "111665");
      this.angentStatus = false;
    },
    // 有效期至
    periodConfirm() {
      this.certiVali1 = DateFormat(this.currentPeriod, "yyyy-MM-dd");
      this.periodStatus = false;
    },
    // 选择性别
    crtlCheck(item) {
      this.agentInfo.gender = item.val;
    },
    // 下一页
    nextOne(pageIndex) {
      // 第一个页面判断
      let self = this;
      if (!self.agentInfo.agentName) {
        self.$toast("请输入经纪人姓名");
        return;
      }
      if (!self.agentInfo.idCardNum) {
        self.$toast("请输入证件号码");
        return;
      }
      if (self.agentInfo.certiVali == "请选择有效期") {
        self.$toast("请输入证件有效期");
        return;
      }
      if (self.agentInfo.birthday == "请选择生日") {
        self.$toast("请输入出生日期");
        return;
      }

      // certificateVal
      if (!self.agentInfo.nation) {
        self.$toast("请输入民族");
        return;
      }
      // 第二个页面 1提交状态 vuex
      self.$store.commit("SET_AGENT_INFO", self.agentInfo);

      self.pageIndex = 2;
    },
    // 第二个页面判断正则
    nextTwo(pageIndex) {
      let self = this;
      if (self.agentInfo.politicsFace.text == "请选择政治面貌") {
        self.$toast("请选择政治面貌");
        return;
      }
      if (self.agentInfo.marriageState.text == "请选择婚姻状况") {
        self.$toast("请选择婚姻状况");
        return;
      }
      if (!self.agentInfo.address) {
        self.$toast("请选择家庭住址");
        return;
      }

      if (self.agentInfo.rank.text == "请选择职级") {
        self.$toast("请选择职级");
        return;
      }
      self.pageIndex = 3;
    },
    // 第三个页面判断正则  下一页
    nextThree() {
      let self = this;
      if (!self.agentInfo.bankAmount) {
        self.$toast("请输入银行卡号");
        return;
      }
      if (!self.agentInfo.openBank) {
        self.$toast("请输入开户行");
        return;
      }
      // if (!self.agentInfo.phoneNum) {
      //   self.$toast("请输入手机号码");
      //   return;
      // }
      self.$router.push({
        name: "inductionImg"
      });
    },
    // 上一页
    goBack(pageIndex) {
      this.pageIndex = pageIndex - 1;
      if (pageIndex <= 1) {
        this.apageIndex = 1;
      }
    },
    // 第三个页面的验证码js
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
      if (!self.agentInfo.phoneNum) {
        self.$toast("请输入手机号");
        return;
      }
      if (!self.regPhone.test(self.agentInfo.phoneNum)) {
        self.$toast("请输入正确的手机号");
        return;
      }
      let timer = null;
      clearInterval(timer);
      let second = 60;
      self.verifiState = true;
      self.$axios
        .get(`${self.$axios.defaults.baseYcURL}/wechat/send-verify-code`, {
          params: {
            phone: self.agentInfo.phoneNum
          }
        })
        .then(res => {
          console.log("22222222222222222222222222222222222222222222222222222222")
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
            self.$toast(88888888);
          }
        })
        .catch(err => {
          self.verifiState = false;
          self.$toast(JSON.stringify(err));
        });
    },


    
    // 三个页面的弹窗组件 开始
    choosePop(value) {
      //1证件类型 2证件有效期  3民族 4学历 5政治面貌 6婚姻状况 7职称
      console.log(value);
      this.popType = value;
      console.log(this.popType);
      switch (this.popType) {
        case "1":
          this.popList = this.certificateList;
          break;
        case "2":
          this.popList = this.certidataList;
          break;
        case "3":
          this.popList = this.nationalList;
          break;
        case "4":
          this.popList = this.educationList;
          break;
        case "5":
          this.popList = this.politicsList;
          break;
        case "6":
          this.popList = this.marriageList;
          break;
        case "7":
          this.popList = this.rankList;
          break;
      }
      this.popStatus = true;
    },
    popConfirm(value) {
      console.log("qqqqqqqq");
      switch (this.popType) {
        case "1":
          this.certificateVal = value;
          break;
        case "2":
          this.agentInfo.certiVali.text = value.text;
          if( value.value == "2" && (this.periodStatus = true)){
            this.agentInfo.certiVali.text = this.certiVali1
          }
         
          break;
        case "3":
          this.nationalVal = value;
          break;
        case "4":
          this.agentInfo.education = value;
          // this.e ducationValue = value.value;
          break;
        case "5":
          this.agentInfo.politicsFace = value;
          // this.politicsFaceue = value.value;
          break;
        case "6":
          this.agentInfo.marriageState = value;
          // this.marriageStateue = value.value;
          break;
        case "7":
          this.agentInfo.rank = value;
          // this.rankue = value.value;
          break;
      }
      this.popStatus = false;
    }
  }
  // 三个页面的弹窗组件 结束
};
</script>
<style lang='less' scoped>
.u-main {
  width: 100%;
  height: 100%;
  background: #25293f;
  overflow: hidden;
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
// 中间内容区域
.u-main-content {
  width: 355px;
  height: 551px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 31px auto 22px;
  position: relative;
  // 经纪人
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
    position: relative;
    // height: 511px;

    // 底部按钮下一步第一个页面
    .u-user-btn {
      width: 320px;
      height: 32px;
      line-height: 32px;
      background: linear-gradient(
        0deg,
        rgba(201, 160, 99, 1) 0%,
        rgba(254, 220, 168, 1) 100%
      );
      border-radius: 16px;
      position: absolute;
      bottom: -64px;
      text-align: center;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #141e3e;
    }
    // 底部下面第二 三个页面 的下一步 上一不个按钮
    .u-user-btn2,
    .u-user-btn3 {
      width: 320px;
      height: 32px;
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(20, 30, 62, 1);
      button {
        width: 152px;
        height: 32px;
        border-radius: 16px;
      }
      .back {
        border: 1px solid #cfa76a;
        color: #cfa76a;
        background-color: transparent;
      }
      .next {
        background: linear-gradient(
          0deg,
          rgba(201, 160, 99, 1) 0%,
          rgba(254, 220, 168, 1) 100%
        );
      }
    }
    .u-user-btn2 {
      bottom: -124px;
    }
    .u-user-btn3 {
      bottom: -224px;
    }
  }
  .u-user-u {
    display: flex;
    height: 54px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid rgba(210, 210, 210, 1);
    position: relative;
    .inputt {
      display: flex;
      justify-content: center;
      align-items: center;
      .one {
        color: #333333;
        margin-right: 4px;
      }
    }
    .icon {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-left: 1px solid #999999;
      border-bottom: 1px solid #999999;
      transform: rotate(-45deg);
    }
    .zjhm {
      width: 18px;
      height: 16px;
      display: inline-block;
      // border: 1px solid #5E87F3;
      background: url(../assets/img/m.png);
      vertical-align: middle;
    }
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
  // 性别男女
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
}

// 第二个页面
.u-user-mn {
  width: 100%;
  height: 40px;
  // line-height: 40px;
  color: #999999;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  textarea {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-top: 5px;
    background: #f6f6f6;
    color: black;
  }
}
.where {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
#u-user-none {
  border: none;
}
// 第三个页面
.u-main-content {
  .u-user-u {
    .yanzheng {
      width: 111px;
      height: 25px;
      border-radius: 13px;
      text-align: left;
      line-height: 25px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: black;
    }
    .iptyan {
      width: 100px;
      padding: 5px;
      line-height: 20px;
      margin-right: 20px;
      text-align: right;
      color: #333;
      background-color: transparent;
      &::placeholder {
        color: #999;
      }
    }
    // 发送验证码
    .btn {
      width: 180px;
      height: 32px;
      border-radius: 16px;
      line-height: 32px;
      font-size: 15px;
      text-align: center;
      font-family: PingFang SC;
      color: #ffffff;
      background: #5e87f3;
      // padding-left: 10px;
    }
    &.grey {
      color: #a0a0a0;
    }
  }
}
</style>