<!--  -->
<template>
  <div class="u-prod-index">
    <!-- <div class="u-prod-type">
      <h2 class="u-tt">选择险种：</h2>
      <div class="u-type">
        <p class="type"
           :class="[typeIndex == index ? 'active' : ''] "
           v-for="(item, index) in prodType"
           :key="index"
           @click="chooseType(item, index)">
          <span class="icon"
                :class="item.class"></span>
          <span class="name">{{item.name}}</span>
        </p>
      </div>
    </div> -->
    <div class="u-prod-config">
      <div class="u-item">
        <p class="name">被保险人性别：</p>
        <div class="u-sex">
          <p class="sex"
             :class="[gender == item.value ? 'active' : '']"
             v-for="(item, index) in genderList"
             :key="index"
             @click="chooseGender(item)">
            <span :class="item.class"></span>
            <span class="n">{{item.text}}</span>
          </p>
        </div>
      </div>
      <!-- <div class="u-item">
        <p class="name">被保险人年龄：</p>
        <div class="u-choose"
             @click="insuredBirthStatus = true">
          <p class="value">{{insuredAge}}周岁</p>
          <span class="arrow"></span>
        </div>
      </div> -->
      <div class="u-item">
        <p class="name">被保险人年龄：</p>
        <!-- <div class="u-choose">
          <input type="number"
                 class="ipt"
                 v-model="insuredAge"
                 placeholder="请输入年龄">
          <span class="tip">周岁</span>
        </div> -->
        <div class="u-choose">
          <div class="u-birth"
               @click="insuredBirthStatus = true">
            <p class="value">{{insuredBirth}}</p>
            <span class="arrow"></span>
          </div>
          <div class="u-birth"
               @click="ageStatus = true">
            <p class="value">{{insuredAge}}岁</p>
            <span class="arrow"></span>
          </div>
        </div>
      </div>
      <div class="u-item">
        <p class="name">基本保额<span> (元)</span> ：</p>
        <div class="u-choose"
             @click="feeStatus = true">
          <p class="value">{{feeVal.text}}</p>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="u-item">
        <p class="name">交费期间：</p>
        <div class="u-choose"
             @click="yearStatus = true">
          <p class="value">{{yearVal.text}}</p>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="u-item">
        <p class="name">保障期间：</p>
        <div class="u-choose"
             @click="ensureStatus = true">
          <p class="value">{{ensureVal.text}}</p>
          <span class="arrow"></span>
        </div>
      </div>
      <!-- <div class="u-item">
        <p class="name">保障期限区间：</p>
        <div class="u-slider">
          <p class="tip">
            <span>{{bzRange[0]}}-{{sliderEnd1}}</span>
            <span>({{bzRange[0] + parseInt(insuredAge)}}周岁-{{sliderEnd2}})</span>
          </p>
          <vue-slider ref="yearSlider"
                      v-model="bzRange"
                      :min="0"
                      :max="71"
                      :enable-cross="false"
                      :tooltip="'none'"></vue-slider>
        </div>
      </div> -->
      <div class="u-btn"
           @click="nextStep">下一步</div>
    </div>
    <van-popup v-model="feeStatus"
               position="bottom">
      <van-picker :columns='feeList'
                  show-toolbar
                  @cancel="feeStatus = false"
                  @confirm="feeConfirm"></van-picker>
    </van-popup>
    <van-popup v-model="yearStatus"
               position="bottom">
      <van-picker :columns='yearList'
                  show-toolbar
                  @cancel="yearStatus = false"
                  @confirm="yearConfirm"></van-picker>
    </van-popup>
    <van-popup v-model="ensureStatus"
               position="bottom">
      <van-picker :columns='ensureList'
                  show-toolbar
                  @cancel="ensureStatus = false"
                  @confirm="ensureConfirm"></van-picker>
    </van-popup>
    <van-popup v-model="ageStatus"
               position="bottom">
      <van-picker :columns='ageList'
                  show-toolbar
                  @cancel="ageStatus = false"
                  @confirm="ageConfirm"></van-picker>
    </van-popup>
    <van-popup v-model="insuredBirthStatus"
               position="bottom">
      <van-datetime-picker v-model="currentData"
                           type="date"
                           :min-date="minDate"
                           :max-date="maxDate"
                           @confirm="dateConfirm"
                           @cancel="insuredBirthStatus = false"
                           @change="dateChange"
                           :formatter="formatterDate" />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker, DatetimePicker } from 'vant';
// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'
import { getAge, DateFormat } from '@js/filter';
import controlStorage from '@js/storage'
export default {
  data() {
    return {
      typeIndex: 0,
      insuranceType: 1,
      prodType: [
        {
          name: '寿险',
          class: 'sx',
          type: 1
        },
        {
          name: '重疾险',
          class: 'zj',
          type: 2
        },
        {
          name: '医疗险',
          class: 'ylx',
          type: 3
        },
        {
          name: '养老险',
          class: 'people',
          type: 4
        },
        {
          name: '更多',
          class: 'more',
          type: 5
        },
      ],
      gender: 1,
      genderList: [
        { text: '男', value: 1, class: 'male' },
        { text: '女', value: 0, class: 'female' },
      ],
      insuredBirthStatus: false,
      insuredBirth: '生日(选填)',
      insuredAge: 30, //被保人年龄，默认30周岁
      currentData: new Date(),
      dateSelectArr: [], //当前change的日期
      minDate: new Date(),
      maxDate: new Date(),
      // bzRange: [30, 70],
      feeStatus: false,
      feeVal: {
        text: '30万', value: 30000000
      },
      feeList: [ // 基本保额
        { text: '10万', value: 10000000 },
        { text: '20万', value: 20000000 },
        { text: '30万', value: 30000000 },
        { text: '40万', value: 40000000 },
        { text: '50万', value: 50000000 },
        { text: '60万', value: 60000000 },
        { text: '70万', value: 70000000 }
      ],
      yearStatus: false,
      yearVal: {
        text: '20年', value: 20
      },
      yearList: [ // 基本保额
        { text: '趸交', value: 0 },
        { text: '5年', value: 5 },
        { text: '10年', value: 10 },
        { text: '15年', value: 15 },
        { text: '20年', value: 20 },
        { text: '30年', value: 30 }
      ],
      ensureStatus: false,
      ensureVal: {
        text: '不限', value: 0
      },
      ensureList: [ // 基本保额
        { text: '不限', value: 0 },
        { text: '保20年', value: 20 },
        { text: '保30年', value: 30 },
        { text: '保至70周岁', value: 75 },
        { text: '终身', value: 100 }
      ],
      ageStatus: false,
      ageList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70] //可选年龄
    };
  },

  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    // VueSlider
  },

  computed: {
    // sliderEnd1() {
    //   let endVal = this.bzRange[1];
    //   return endVal == '71' ? '终身' : `${endVal}年`;
    // },
    // sliderEnd2() {
    //   let endVal = this.bzRange[1];
    //   return endVal == '71' ? '终身' : `${endVal + parseInt(this.insuredAge)}周岁`;
    // }
  },

  mounted() {
    // 分享控制
    this.$controlShare("hideOptionMenu");
    //获取缓存数据
    let storageProd = controlStorage('storageProd');
    if (!!storageProd) {
      this.ensureVal = storageProd.ensureVal;
      this.feeVal = storageProd.feeVal;
      this.gender = storageProd.gender;
      this.yearVal = storageProd.yearVal;
      this.insuredAge = storageProd.insuredAge;
      this.insuredBirth = storageProd.insuredBirth;
    }
    // 最大可选年龄为70周岁
    let nowDate = new Date(),
      nYear = nowDate.getFullYear(),
      nMonth = nowDate.getMonth(),
      nDay = nowDate.getDate();
    this.minDate = new Date(nYear - 71, nMonth, nDay + 1);
    this.currentData = new Date(nYear - 30, nMonth, nDay);
    // this.insuredBirth = DateFormat(this.currentData, 'yyyy-MM-dd');
  },

  methods: {
    chooseType(item, index) {
      this.insuranceType = item.type;
      this.typeIndex = index;
    },
    chooseGender(item) {
      this.gender = item.value;
    },
    formatterDate(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;
    },
    dateConfirm(value) {
      this.insuredBirth = DateFormat(this.currentData, 'yyyy-MM-dd');
      this.insuredAge = getAge(this.insuredBirth);
      this.insuredBirthStatus = false;
    },
    dateChange(value) {
      this.dateSelectArr = value.getValues();
    },
    feeConfirm(value) {
      this.feeVal = value;
      this.feeStatus = false;
    },
    yearConfirm(value) {
      this.yearVal = value;
      this.yearStatus = false;
    },
    ensureConfirm(value) {
      this.ensureVal = value;
      this.ensureStatus = false;
    },
    ageConfirm(value) {
      this.insuredAge = value;
      this.ageStatus = false;
    },
    nextStep() {
      let self = this,
        compareData = {
          insuranceType: self.insuranceType,
          gender: self.gender,
          age: self.insuredAge,
          amount: self.feeVal.value,
          payTime: self.yearVal.value,
          ensureTime: self.ensureVal.text
        },
        storageProd = {
          gender: self.gender,
          insuredAge: self.insuredAge,
          insuredBirth: self.insuredBirth,
          feeVal: self.feeVal,
          yearVal: self.yearVal,
          ensureVal: self.ensureVal
        };
      controlStorage('storageProd', 'set', storageProd);
      self.$router.push({
        name: 'prodChoose',
        query: {
          compareData: JSON.stringify(compareData)
        }
      });
    }
  }
}

</script>
<style lang='less' scoped>
.u-prod-index {
  width: 100%;
  min-height: 100%;
  padding: 0 10px;
  background: #191d2e;
}
.u-prod-type {
  padding: 20px 0 0 0;
  .u-tt {
    padding-bottom: 10px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
  }
  .u-type {
    display: flex;
    justify-content: space-between;
    .type {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .icon {
      width: 23px;
      height: 23px;
      margin-bottom: 5px;
    }
    .sx {
      background: url(../assets/img/sx.png);
      background-size: cover;
    }
    .zj {
      background: url(../assets/img/zj.png);
      background-size: cover;
    }
    .ylx {
      width: 25px;
      height: 22px;
      background: url(../assets/img/ylx.png);
      background-size: cover;
    }
    .people {
      background: url(../assets/img/people.png);
      background-size: cover;
    }
    .more {
      background: url(../assets/img/more.png);
      background-size: cover;
    }
    .name {
      font-size: 12px;
      font-family: PingFang SC;
      color: #868790;
    }
    .active {
      .sx {
        background: url(../assets/img/sx-a.png);
        background-size: cover;
      }
      .zj {
        background: url(../assets/img/zj-a.png);
        background-size: cover;
      }
      .ylx {
        background: url(../assets/img/ylx-a.png);
        background-size: cover;
      }
      .people {
        background: url(../assets/img/people-a.png);
        background-size: cover;
      }
      .more {
        background: url(../assets/img/more-a.png);
        background-size: cover;
      }
      .name {
        color: #fff;
      }
    }
  }
}
.u-prod-config {
  .u-item {
    height: 68px;
    border-bottom: 1px solid #303449;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      flex-shrink: 0;
      font-size: 17px;
      font-family: PingFang-SC-Bold;
      color: #fff;
      span {
        font-size: 10px;
      }
    }
  }
  .u-sex {
    display: flex;
    width: 30%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    .sex {
      display: flex;
      height: 100%;
      align-items: center;
      .male,
      .female {
        margin-right: 10px;
      }
      .n {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        color: #868790;
      }
      .male {
        width: 16px;
        height: 16px;
        background: url(../assets/img/male.png);
        background-size: cover;
      }
      .female {
        width: 12px;
        height: 18px;
        background: url(../assets/img/female.png);
        background-size: cover;
      }
    }
    .active {
      .male {
        background: url(../assets/img/male-a.png);
        background-size: cover;
      }
      .female {
        background: url(../assets/img/female-a.png);
        background-size: cover;
      }
      .n {
        color: #fff;
      }
    }
  }
  .u-choose {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    .value,
    .tip {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      color: #fff;
    }
    .ipt {
      width: 80%;
      // margin-right: 5px;
      line-height: 32px;
      font-size: 15px;
      font-family: PingFang SC;
      color: #fff;
      border: 0 none;
      text-align: right;
      background-color: transparent;
      &::placeholder {
        color: #d3d3d3;
      }
    }
    .arrow {
      width: 8px;
      height: 8px;
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
      transform: rotate(45deg);
      margin-left: 10px;
    }
  }
  .u-birth {
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 5px;
    border: 1px solid #fad7a3;
    border-radius: 3px;
    .value {
      color: #fad7a3;
    }
    &:first-child {
      opacity: 0.33;
      margin-right: 10px;
    }
  }
  .u-slider {
    width: 55%;
    margin-right: 10px;
    .tip {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      color: #fff;
      margin-bottom: 5px;
    }
  }
  .u-btn {
    width: 100%;
    height: 32px;
    margin-top: 40px;
    background: linear-gradient(0deg, #c9a063 0%, #fedca8 100%);
    border-radius: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    color: #141e3e;
    // &:focus {
    //   background: linear-gradient(0deg, #c9a063 0%, #fedca8 100%);
    //   color: #141e3e;
    // }
  }
}
</style>