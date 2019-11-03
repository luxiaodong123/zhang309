<!--  -->
<template>
  <div class="u-income-body">
    <div class="u-income-head">
      <div class="u-info">
        <img class="pic"
             src="../assets/img/person.png"
             alt=""
             srcset="">
        <p class="info">
          <span class="name">{{agentInfo.agentName}}</span>
          <span class="id">ID:{{agentInfo.agentId}}</span>
          <!-- <span class="title">职级:{{agentInfo.agnetLevel}}</span> -->
        </p>
      </div>
      <!-- <div class="u-month"
           @click="dateStatus = true"> -->
      <div class="u-month">
        <span class="month">{{commissionMonth}}</span>
        <!-- <span class="arrow"></span> -->
      </div>
    </div>
    <div class="u-income-cont">
      <div class="u-income-box"
           v-if="hasCommission">
        <h1 class="u-income">
          <span>税后实发：</span>
          <span class="income">{{commissionInfo.commissionSfyj | moneyFormat()}}</span>
        </h1>
        <div class="u-detail">
          <p class="tt">佣金及奖金</p>
          <div class="detail">
            <p class="info"
               @click="goTo">
              <span class="t">首年佣金</span>
              <span class="m">{{commissionInfo.commissionSnyj  | moneyFormat()}}</span>
              <span class="arrow"></span>
            </p>
            <p class="info">
              <span class="t">绩效奖金</span>
              <span class="m">{{commissionInfo.commissionJxjj  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">推荐奖</span>
              <span class="m">{{commissionInfo.commissionTjj  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">引才奖</span>
              <span class="m">{{commissionInfo.commissionYcj  | moneyFormat()}}</span>
            </p>
          </div>
        </div>
        <div class="u-detail">
          <p class="tt">津贴</p>
          <div class="detail">
            <p class="info">
              <span class="t">管理津贴</span>
              <span class="m">{{commissionInfo.commissionGljt  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">平阶育成</span>
              <span class="m">{{commissionInfo.commissionPjyc  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">总监育成</span>
              <span class="m">{{commissionInfo.commissionZjyc  | moneyFormat()}}</span>
            </p>
          </div>
        </div>
        <div class="u-detail">
          <p class="tt">专项奖</p>
          <div class="detail">
            <p class="info">
              <span class="t">销售专案</span>
              <span class="m">{{commissionInfo.commissionXsza  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">组织专案</span>
              <span class="m">{{commissionInfo.commissionZzza  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">企划方案</span>
              <span class="m">{{commissionInfo.commissionQhfa  | moneyFormat()}}</span>
            </p>
          </div>
        </div>
        <div class="u-detail">
          <p class="tt">税款及其他</p>
          <div class="detail">
            <p class="info">
              <span class="t">加扣款</span>
              <span class="m">{{commissionInfo.commissionJkk  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">合并计税</span>
              <span class="m">{{commissionInfo.commissionHbjs  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">个人所得税</span>
              <span class="m">{{commissionInfo.commissionGrsds  | moneyFormat()}}</span>
            </p>
            <p class="info">
              <span class="t">增值税及附加</span>
              <span class="m">{{commissionInfo.commissionZzfjs  | moneyFormat()}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="u-income-no"
           v-else>
        <p class="no">
          <img src="../assets/img/no_money.jpg"
               alt=""
               srcset="">
        </p>
      </div>
    </div>
    <van-popup v-model="dateStatus"
               position="bottom">
      <van-datetime-picker v-model="currentData"
                           type="year-month"
                           :min-date="minDate"
                           :max-date="maxDate"
                           @confirm="dateConfirm"
                           @cancel="dateStatus = false"
                           @change="dateChange"
                           :formatter="formatterDate"
                           title="" />
    </van-popup>
  </div>
</template>

<script>
import { Popup, DatetimePicker } from 'vant';
import { isEmptyObject } from '@js/filter';
export default {
  data() {
    return {
      agentInfo: JSON.parse(this.$route.query.agentInfo), //代理人信息数据
      commissionInfo: {}, //具体的佣金数据
      hasCommission: false, //是否有佣金
      commissionMonth: '', // 当前月份
      dateSelectArr: [], //当前change的月份
      dateStatus: false,
      currentData: new Date(),
      minDate: new Date(2019, 1, 1),
      maxDate: new Date()
    };
  },

  components: {
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
  },

  computed: {},

  mounted() {
    // 分享控制
    this.$controlShare("hideOptionMenu");
    this.getCurrentDate();
    !!this.agentInfo && this.getCommission();
  },

  filters: {
    moneyFormat(money) {
      return (money == null || money == 0) ? '0.00' : money;
    }
  },

  methods: {
    //获取当前月份 默认显示前一个月
    getCurrentDate() {
      let year = this.currentData.getFullYear(),
        month = this.currentData.getMonth(),
        day = this.currentData.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      this.commissionMonth = `${year}年${month}月`;
      //获取当月佣金数据

    },
    getCommission() {
      let self = this;
      self.$axios.get(`/yc-wechat/commission/monthly-query`, {
        params: {
          agentId: self.agentInfo.agentId,
          month: ''
        }
      }).then(res => {
        if (res.data.errCode == 0) {
          let resData = res.data.data;
          if (!!resData) {
            self.commissionInfo = resData;
            self.hasCommission = true;
          }
        } else {
          self.$toast(res.data.errMsg);
        }
      }).catch(err => {
        self.$toast(JSON.stringify(err));
      })
    },
    goTo() {
      let orderInfo = {
        agentId: this.agentInfo.agentId,
        month: '',
        commissionSnyj: this.commissionInfo.commissionSnyj
      }
      this.$router.push({
        name: 'incomeDetail',
        query: {
          orderInfo: JSON.stringify(orderInfo)
        }
      })
    },
    formatterDate(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    dateConfirm(value) {
      this.commissionMonth = this.dateSelectArr.join('');
      this.dateStatus = false;
    },
    dateChange(value) {
      this.dateSelectArr = value.getValues();
    }
  }
}

</script>
<style lang='less' scoped>
.u-income-body {
  width: 100%;
  min-height: 100%;
  background: #191d2e;
}
.u-income-head {
  width: 100%;
  height: 105px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url(../assets/img/head.jpg);
  background-size: cover;
  .u-info {
    height: 55px;
    display: flex;
    align-items: center;
    .pic {
      width: 55px;
      height: 55px;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        font-family: PingFang SC;
      }
      .name {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
      }
      .id {
        font-size: 12px;
        color: #e5e5e5;
        margin-bottom: 5px;
      }
      .title {
        font-size: 12px;
        color: #e5e5e5;
      }
    }
  }
  .u-month {
    width: 110px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(-360deg, #c9a063 0%, #fedca8 100%);
    box-shadow: 0 2px 10px 0 rgba(15, 148, 230, 0.4);
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
    span {
      font-family: PingFang-SC-Bold;
      color: #141e3e;
      font-size: 13px;
      font-weight: bold;
    }
    .arrow {
      width: 10px;
      height: 10px;
      margin-left: 5px;
      margin-bottom: 3px;
      border-right: 1px solid #141e3e;
      border-bottom: 1px solid #141e3e;
      transform: rotate(45deg);
    }
  }
}
.u-income-cont {
  width: 100%;
  height: 100%;
  padding: 0 10px 10px;
}
.u-income-box {
  padding: 0 30px;
  background-color: #192e6d;
  border-radius: 10px;
  .u-income {
    height: 85px;
    display: flex;
    align-items: center;
    line-height: 30px;
    font-size: 18px;
    font-family: PingFang SC;
    color: #e5e5e5;
    .income {
      font-size: 36px;
      font-family: DINPro-Bold;
      color: #fd6691;
    }
  }
  .u-detail {
    padding-bottom: 25px;
    .tt {
      height: 20px;
      margin-bottom: 5px;
      line-height: 20px;
      font-size: 15px;
      font-family: PingFang SC;
      color: #fff;
    }
    .detail {
      padding: 10px 0;
      background: url(../assets/img/income-mask.png);
      background-size: cover;
      border-radius: 10px;
    }
    .info {
      padding: 0 50px;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .t {
        font-size: 14px;
        font-family: PingFang SC;
        color: #e5e5e5;
      }
      .m {
        font-size: 15px;
        font-family: DINPro-Bold;
        color: #fad7a3;
      }
      .arrow {
        width: 10px;
        height: 10px;
        border-right: 1px solid #fff;
        border-top: 1px solid #fff;
        transform: rotate(45deg);
        position: absolute;
        right: 20px;
      }
    }
  }
}
.u-income-no {
  height: 100%;
  padding: 100px 30px;
  background-color: #192e6d;
  border-radius: 10px;
  .no {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>