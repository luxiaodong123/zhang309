<!--  -->
<template>
  <div class="u-prod-choose">
    <h1 class="u-tt">请选择任意两款产品</h1>
    <div class="u-prod-box"
         v-for="(item, index) in prodList"
         :key="index"
         @click="chooseProd(item, index)">
      <p class="u-prod"
         :class="[item.isChoose ? 'active' : '']">
        <span class="name">{{item.insureProductName}}</span>
        <span class="price"
              v-if="item.amount != -1"><i>￥</i>{{item.amount / 100}}</span>
        <template v-else>
          <span class="error"
                v-show="!item.isChoose">!</span>
        </template>
      </p>
      <div class="u-info"
           v-show="item.isChoose">
        <p class="error"
           v-if="item.amount == -1">
          <span class="i">!</span>
          <span class="e">年龄或交费期间不符合投保规则，请重新选择！</span>
        </p>
        <p class="info">
          <span class="l">适合人群：</span>
          <span class="r">{{item.insurableAge}}</span>
        </p>
        <p class="info">
          <span class="l">产品特征：</span>
          <span class="r">{{item.productFeature}}</span>
        </p>
        <span class="icon"></span>
      </div>
    </div>
    <div class="u-btn"
         @click="nextStep">开始比价</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compareData: JSON.parse(this.$route.query.compareData),
      prodList: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 分享控制
    this.$controlShare("hideOptionMenu");
    this.getData();
  },

  methods: {
    getData() {
      let self = this;
      self.$axios.post(`/yc-wechat/product/query-product`, self.compareData).then(res => {
        if (res.data.errCode == 0) {
          let resData = res.data.data;
          resData.forEach(element => {
            element.isChoose = false;
          });
          self.prodList = [...resData];
        } else {
          self.$toast(res.data.errMsg);
        }
      }).catch(err => {
        self.$toast(JSON.stringify(err));
      })
    },
    chooseProd(item, index) {
      let prod = this.prodList[index];
      Object.assign(prod, {
        isChoose: !prod.isChoose
      });
      this.prodList.splice(index, 1, prod);
    },
    nextStep() {
      let self = this,
        prodId = [],
        compareProd = {};
      self.prodList.forEach(element => {
        element.isChoose && prodId.push(element.productId);
      });
      if (prodId.length != 2) {
        self.$toast('请选择两款产品进行对比');
        return;
      }
      Object.assign(compareProd, self.compareData, {
        productIds: prodId
      });
      self.$router.push({
        name: 'prodCompare',
        query: {
          compareProd: JSON.stringify(compareProd)
        }
      });
    }
  }
}

</script>
<style lang='less' scoped>
.u-prod-choose {
  width: 100%;
  min-height: 100%;
  padding: 0 10px 20px;
  background: #191d2e;
  .u-tt {
    padding: 30px 0;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    color: #fff;
  }
}
.u-prod-box {
  width: 100%;
  height: auto;
  padding: 0 30px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
  .u-prod {
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    i {
      font-family: MicrosoftYaHei-Bold;
      font-size: 13px;
    }
    &.active {
      color: #5e87f3;
    }
    .error {
      border: 1px solid #fd6691;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      text-align: center;
      line-height: 13px;
      color: #fd6691;
      font-size: 12px;
      font-family: PingFang SC;
    }
  }
  .u-info {
    padding: 18px 0 10px;
    border-top: 1px solid #d2d2d2;
    .error {
      display: flex;
      height: 16px;
      align-items: center;
      font-size: 12px;
      font-family: PingFang SC;
      color: #fd6691;
      .i {
        width: 11px;
        height: 11px;
        margin-right: 5px;
        border: 01px solid #fd6691;
        border-radius: 50%;
        text-align: center;
        line-height: 9px;
        color: #fd6691;
        font-size: 8px;
        font-family: PingFang SC;
      }
    }
    .info {
      display: flex;
      line-height: 30px;
      font-size: 15px;
      font-family: PingFang SC;
      color: #666;
    }
    .l {
      flex-shrink: 0;
    }
    .icon {
      width: 26px;
      height: 23px;
      position: absolute;
      right: 0;
      bottom: 0;
      background: url(../assets/img/choose.png);
      background-size: cover;
    }
  }
}
.u-btn {
  width: 100%;
  height: 32px;
  margin-top: 40px;
  background: linear-gradient(
    0deg,
    rgba(201, 160, 99, 1) 0%,
    rgba(254, 220, 168, 1) 100%
  );
  border-radius: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 17px;
  font-family: PingFang-SC-Bold;
  color: #141e3e;
}
</style>