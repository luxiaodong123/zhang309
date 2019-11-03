<!--  -->
<template>
  <div class="u-prod-compare">
    <div class="u-compare-head">
      <div class="u-check">
        <van-checkbox v-model="checked"
                      shape="square"></van-checkbox>
        <span>隐藏相同</span>
      </div>
      <div class="u-prod"
           v-for="(item, index) in prodAll"
           :key="index">
        <img :src="item.imageUrl"
             alt=""
             class="logo">
        <p class="name">{{item.insureProductName}}</p>
      </div>
    </div>
    <div class="u-compare-cont">
      <h2 class="u-tt">对比一览</h2>
      <div class="u-cont">
        <template v-for="(item, index) in compareInfo">
          <div class="u-item"
               :key="index"
               v-if="item.allSame">
            <p class="title"
               v-show="!checked"><span>{{item.title}}</span></p>
            <div class="u-info"
                 v-show="!checked">
              <p class="info"
                 v-for="(info, idx) in item.detail"
                 :key="idx">
                <span class="n">{{info.name}}</span>
                <span class="v">{{info.valA}}</span>
                <span class="v">{{info.valB}}</span>
              </p>
            </div>
          </div>
          <div class="u-item"
               :key="index"
               v-else>
            <p class="title"><span>{{item.title}}</span></p>
            <div class="u-info">
              <template v-for="(info, idx) in item.detail">
                <p class="info"
                   :key="idx"
                   v-if="!info.isSame">
                  <span class="n">{{info.name}}</span>
                  <span class="v">{{info.valA}}</span>
                  <span class="v">{{info.valB}}</span>
                </p>
                <template v-else>
                  <p class="info"
                     :key="idx"
                     v-if="!checked">
                    <span class="n">{{info.name}}</span>
                    <span class="v">{{info.valA}}</span>
                    <span class="v">{{info.valB}}</span>
                  </p>
                </template>
              </template>
            </div>
          </div>
        </template>
      </div>
      <p class="u-tip">*以上信息仅供参考，请以保险产品条款为准</p>
    </div>
  </div>
</template>

<script>
import { Checkbox } from 'vant';
export default {
  data() {
    return {
      checked: false,
      compareProd: JSON.parse(this.$route.query.compareProd),
      prodAll: [],
      compareInfo: [],
      genderList: {
        '1': '男',
        '0': '女'
      },
      payList: {
        '0': '趸交',
        '5': '5年',
        '10': '10年',
        '15': '15年',
        '20': '20年',
        '30': '30年'
      },
    };
  },

  components: {
    [Checkbox.name]: Checkbox
  },

  computed: {},

  mounted() {
    // 分享控制
    this.$controlShare("hideOptionMenu");
    this.getData();
  },

  methods: {
    getData() {
      let self = this;
      self.$axios.post(`/yc-wechat/product/compare-product`, self.compareProd).then(res => {
        if (res.data.errCode == 0) {
          let resData = res.data.data,
            prodA = resData[0],
            prodB = resData[1],
            compareInfo = [];
          self.prodAll = [...resData];
          //寿险分类
          if (self.compareProd.insuranceType == 1) {
            let detailPZ = [];
            detailPZ.push({
              name: '保额',
              valA: `${self.compareProd.amount / 1000000}万`,
              valB: `${self.compareProd.amount / 1000000}万`,
              isSame: true
            });
            detailPZ.push({
              name: '年交保费',
              valA: prodA.yearPayAmount == -1 ? '/' : `${prodA.yearPayAmount / 100}元`,
              valB: prodB.yearPayAmount == -1 ? '/' : `${prodB.yearPayAmount / 100}元`,
              isSame: prodA.yearPayAmount == prodB.yearPayAmount
            });
            detailPZ.push({
              name: '投保性别',
              valA: `${self.genderList[self.compareProd.gender]}`,
              valB: `${self.genderList[self.compareProd.gender]}`,
              isSame: true
            });
            detailPZ.push({
              name: '投保年龄',
              valA: `${self.compareProd.age}周岁`,
              valB: `${self.compareProd.age}周岁`,
              isSame: true
            });
            detailPZ.push({
              name: '交费期间',
              valA: `${self.payList[self.compareProd.payTime]}`,
              valB: `${self.payList[self.compareProd.payTime]}`,
              isSame: true
            });
            detailPZ.push({
              name: '保障期间',
              valA: `${self.compareProd.ensureTime}`,
              valB: `${self.compareProd.ensureTime}`,
              isSame: true
            });
            compareInfo.push({
              title: '保险配置',
              allSame: prodA.yearPayAmount == prodB.yearPayAmount,
              detail: detailPZ
            });
            let detailZJ = [],
              zjCount = 0;
            detailZJ.push({
              name: '重疾种类',
              valA: `${prodA.highDiseaseNum}种`,
              valB: `${prodB.highDiseaseNum}种`,
              isSame: prodA.highDiseaseNum == prodB.highDiseaseNum
            });
            detailZJ.push({
              name: '重疾赔付',
              valA: `${prodA.greatDiseaseDuty}`,
              valB: `${prodB.greatDiseaseDuty}`,
              isSame: prodA.greatDiseaseDuty == prodB.greatDiseaseDuty
            });
            detailZJ.push({
              name: '赔付次数',
              valA: `${prodA.highDiseasePayNum}次`,
              valB: `${prodB.highDiseasePayNum}次`,
              isSame: prodA.highDiseasePayNum == prodB.highDiseasePayNum
            });
            detailZJ.forEach(element => {
              element.isSame && (zjCount += 1);
            });
            compareInfo.push({
              title: '重疾保障',
              allSame: zjCount == detailZJ.length,
              detail: detailZJ
            });
            let detailZZ = [],
              zzCount = 0;
            detailZZ.push({
              name: '中症种类',
              valA: `${prodA.mediumDiseaseNum}种`,
              valB: `${prodB.mediumDiseaseNum}种`,
              isSame: prodA.mediumDiseaseNum == prodB.mediumDiseaseNum
            });
            detailZZ.push({
              name: '中症赔付',
              valA: `${prodA.mediumDiseaseDuty}`,
              valB: `${prodB.mediumDiseaseDuty}`,
              isSame: prodA.mediumDiseaseDuty == prodB.mediumDiseaseDuty
            });
            detailZZ.push({
              name: '赔付次数',
              valA: `${prodA.mediumDiseasePayNum}次`,
              valB: `${prodB.mediumDiseasePayNum}次`,
              isSame: prodA.mediumDiseasePayNum == prodB.mediumDiseasePayNum
            });
            detailZZ.forEach(element => {
              element.isSame && (zzCount += 1);
            });
            compareInfo.push({
              title: '中症保障',
              allSame: zzCount == detailZZ.length,
              detail: detailZZ
            });
            let detailQZ = [],
              qzCount = 0;
            detailQZ.push({
              name: '轻症种类',
              valA: `${prodA.lowDiseaseNum}种`,
              valB: `${prodB.lowDiseaseNum}种`,
              isSame: prodA.lowDiseaseNum == prodB.lowDiseaseNum
            });
            detailQZ.push({
              name: '轻症赔付',
              valA: `${prodA.lowDiseaseDuty}`,
              valB: `${prodB.lowDiseaseDuty}`,
              isSame: prodA.lowDiseaseDuty == prodB.lowDiseaseDuty
            });
            detailQZ.push({
              name: '赔付次数',
              valA: `${prodA.lowDiseasePayNum}次`,
              valB: `${prodB.lowDiseasePayNum}次`,
              isSame: prodA.lowDiseasePayNum == prodB.lowDiseasePayNum
            });
            detailQZ.forEach(element => {
              element.isSame && (qzCount += 1);
            });
            compareInfo.push({
              title: '轻症保障',
              allSame: qzCount == detailQZ.length,
              detail: detailQZ
            });
            let detailQT = [],
              qtCount = 0;
            detailQT.push({
              name: '疾病终末期责任',
              valA: `${prodA.endDiseaseDuty}`,
              valB: `${prodB.endDiseaseDuty}`,
              isSame: prodA.endDiseaseDuty == prodB.endDiseaseDuty
            });
            detailQT.push({
              name: '原位癌责任',
              valA: `${prodA.normalCanaerDuty}`,
              valB: `${prodB.normalCanaerDuty}`,
              isSame: prodA.normalCanaerDuty == prodB.normalCanaerDuty
            });
            detailQT.push({
              name: '身故保障',
              valA: `${prodA.deathDuty}`,
              valB: `${prodB.deathDuty}`,
              isSame: prodA.deathDuty == prodB.deathDuty
            });
            detailQT.push({
              name: '残疾责任',
              valA: `${prodA.disabilityDuty}`,
              valB: `${prodB.disabilityDuty}`,
              isSame: prodA.disabilityDuty == prodB.disabilityDuty
            });
            detailQT.push({
              name: '保费豁免责任',
              valA: `${prodA.premiumExemptDuty}`,
              valB: `${prodB.premiumExemptDuty}`,
              isSame: prodA.premiumExemptDuty == prodB.premiumExemptDuty
            });
            detailQT.forEach(element => {
              element.isSame && (qtCount += 1);
            });
            compareInfo.push({
              title: '其他保障',
              allSame: qtCount == detailQT.length,
              detail: detailQT
            });
            let detailGZ = [],
              gzCount = 0;
            detailGZ.push({
              name: '等待期',
              valA: `${prodA.waitDate}天`,
              valB: `${prodB.waitDate}天`,
              isSame: prodA.waitDate == prodB.waitDate
            });
            detailGZ.push({
              name: '可投保年龄',
              valA: `${prodA.insurableAge}`,
              valB: `${prodB.insurableAge}`,
              isSame: prodA.insurableAge == prodB.insurableAge
            });
            detailGZ.push({
              name: '投保方式',
              valA: `${prodA.insureWay}`,
              valB: `${prodB.insureWay}`,
              isSame: prodA.insureWay == prodB.insureWay
            });
            detailGZ.push({
              name: '可缴费年限',
              valA: `${prodA.payableTime}`,
              valB: `${prodB.payableTime}`,
              isSame: prodA.payableTime == prodB.payableTime
            });
            detailGZ.push({
              name: '可保障期限',
              valA: `${prodA.ensureableTime}`,
              valB: `${prodB.ensureableTime}`,
              isSame: prodA.ensureableTime == prodB.ensureableTime
            });
            detailGZ.forEach(element => {
              element.isSame && (gzCount += 1);
            });
            compareInfo.push({
              title: '投保规则',
              allSame: gzCount == detailGZ.length,
              detail: detailGZ
            });
            let detailGS = [],
              gsCount = 0;
            detailGS.push({
              name: '公司名称',
              valA: `${prodA.companyName}`,
              valB: `${prodB.companyName}`,
              isSame: prodA.companyName == prodB.companyName
            });
            detailGS.push({
              name: '公司偿付级别',
              valA: `${prodA.companyPayLevel}`,
              valB: `${prodB.companyPayLevel}`,
              isSame: prodA.companyPayLevel == prodB.companyPayLevel
            });
            detailGS.push({
              name: '公司服务评级',
              valA: `${prodA.companyServerLevel}`,
              valB: `${prodB.companyServerLevel}`,
              isSame: prodA.companyServerLevel == prodB.companyServerLevel
            });
            detailGS.forEach(element => {
              element.isSame && (gsCount += 1);
            });
            compareInfo.push({
              title: '保险公司',
              allSame: gsCount == detailGS.length,
              detail: detailGS
            });
            self.compareInfo = [...compareInfo];
          }
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
.u-prod-compare {
  width: 100%;
  min-height: 100%;
  padding: 0 10px 10px;
  background: #191d2e;
}
.u-compare-head {
  width: 100%;
  height: auto;
  padding: 20px 0;
  display: flex;
  align-items: center;
  .u-check {
    width: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      font-family: PingFang SC;
      color: #fff;
      margin-top: 10px;
    }
  }
  .u-prod {
    width: 110px;
    padding: 0 10px;
    border-left: 1px solid #4a4d5e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
    .name {
      font-size: 17px;
      font-family: PingFang SC;
      color: #fad7a3;
      line-height: 22px;
    }
  }
}
.u-compare-cont {
  width: 100%;
  padding: 20px 10px;
  background: #fff;
  .u-tt {
    font-size: 17px;
    font-family: PingFang SC;
    color: #333;
    font-weight: bold;
  }
  .u-cont {
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #d2d2d2;
    border-left: 1px solid #d2d2d2;
    border-radius: 5px;
  }
  .u-item {
    display: flex;
    &:first-child {
      padding-top: 1px;
    }
    .title {
      width: 10%;
      height: auto;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 5px;
      background: #f6f6f6;
      font-size: 15px;
      font-family: PingFang SC;
      color: #5e87f3;
      font-weight: bold;
      border-right: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;
    }
  }
  .u-info {
    width: 90%;
    display: flex;
    flex-direction: column;
    .info {
      display: flex;
      // flex: 1;
      // width: 100%;
      // height: auto;
      font-size: 15px;
      font-family: PingFang SC;
      &:first-child {
        flex: 1;
      }
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 22px;
        padding: 10px 5px;
        border-right: 1px solid #d2d2d2;
        border-bottom: 1px solid #d2d2d2;
      }
      .n {
        width: 30%;
        background: #f6f6f6;
        font-weight: bold;
        color: #333;
        text-align: center;
      }
      .v {
        width: 35%;
        color: #666;
      }
    }
  }
  .u-tip {
    line-height: 20px;
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  }
}
</style>