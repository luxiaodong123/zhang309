<!--  -->
<template>
  <div class="u-income-body">
    <div class="u-head">
      <p class="income">
        <span class="t">保费合计：</span>
        <span class="m">{{totalFee}}</span>
        <span class="u">元</span>
      </p>
      <p class="income">
        <span class="t">佣金合计：</span>
        <span class="m">{{orderInfo.commissionSnyj}}</span>
        <span class="u">元</span>
      </p>
    </div>
    <div class="u-cont">
      <h2 class="u-tt">保单明细：</h2>
      <div class="u-detail"
           v-for="(item, index) in orderData"
           :key="index">
        <div class="prod">
          <p class="tt">
            <span class="l"></span>
            <span>保单产品名称</span>
          </p>
          <p class="n">{{item.productName}}</p>
        </div>
        <div class="detail">
          <p class="info">
            <span>保单号：</span>
            <span>{{item.policyCode}}</span>
          </p>
          <p class="info">
            <span>投保人：{{item.insureName}}</span>
            <span>被保人：{{item.insuredName}}</span>
          </p>
          <p class="info">
            <span>承保日期：{{item.insuranceDate}}</span>
            <span>缴费期：{{item.chargeYear}}年</span>
          </p>
          <p class="info">
            <span>规模保费：{{item.scalePremium}}元</span>
            <span>标准保费：{{item.standardPremium}}元</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderInfo: JSON.parse(this.$route.query.orderInfo),
      totalFee: 0,
      orderData: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 分享控制
    this.$controlShare("hideOptionMenu");
    !!this.orderInfo && this.getOrder();
  },

  methods: {
    getOrder() {
      let self = this;
      self.$axios.get(`/yc-wechat/commission/query-monthly-detail`, {
        params: {
          agentId: self.orderInfo.agentId,
          month: self.orderInfo.month
        }
      }).then(res => {
        if (res.data.errCode == 0) {
          let resData = res.data.data;
          resData.forEach(element => {
            self.totalFee += element.scalePremium;
          });
          self.orderData = resData;
        } else {
          self.$toast(res.data.errMsg);
        }
      }).catch(err => {
        self.$toast(JSON.stringify(err));
      })
    },
  }
}

</script>
<style lang='less' scoped>
.u-income-body {
  width: 100%;
  min-height: 100%;
  background: #191d2e;
}
.u-head {
  height: 110px;
  padding-left: 10px;
  padding-top: 15px;
  border-bottom: 1px solid #2f2d2d;
  .income {
    display: flex;
    align-items: baseline;
    &:first-child {
      margin-bottom: 15px;
    }
  }
  .t {
    font-size: 17px;
    color: #5e87f3;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
  }
  .m {
    font-size: 24px;
    color: #fad7a3;
    font-family: DINPro-Bold;
  }
  .u {
    font-size: 12px;
    color: #fad7a3;
    font-family: PingFang-SC-Medium;
  }
}
.u-cont {
  padding: 10px;
  .u-tt {
    height: 55px;
    line-height: 55px;
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    color: #fff;
  }
}
.u-detail {
  margin-bottom: 32px;
  .prod {
    // height: 30px;
    padding: 5px 10px 5px 0;
    margin-bottom: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 15px;
      color: #fff;
    }
    .tt {
      display: flex;
      align-items: center;
      font-family: PingFang-SC-Medium;
      flex-shrink: 0;
      .l {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        background: url(../assets/img/prod.png);
        background-size: cover;
      }
    }
    .n {
      line-height: 20px;
      font-family: PingFang-SC-Heavy;
      max-width: 55%;
    }
  }
  .detail {
    padding: 10px;
    background: url(../assets/img/income-mask.png);
    background-size: cover;
    border-radius: 10px;
  }
  .info {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      max-width: 50%;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #e5e5e5;
      line-height: 13px;
    }
  }
}
</style>