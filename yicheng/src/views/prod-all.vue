<!--  -->
<template>
  <div class="u-prod-main">
    <div class="u-prod-tab">
      <p v-for="(item, index) in prodInfo"
         :key="index"
         @click="ctrlTab(index)"
         class="tab"
         :class="[index == currentIndex ? 'active' : '']">{{item.companyName}}</p>
    </div>
    <div class="u-prod-cont"
         :style="styleObj">
      <div class="u-prod-box"
           v-for="(item, index) in prodInfo[currentIndex].prodList"
           :key="index"
           @click="goTo(item)">
        <p class="u-prod">
          <img :src="logoList[item.type]"
               alt=""
               srcset=""
               class="logo">
          <span class="name">{{item.name}}</span>
          <span class="hot"
                v-if="!!item.isHot"></span>
          <span class="arrow"></span>
        </p>
        <div class="u-intro">
          <template v-for="(intro, idx) in item.intro">
            <p class="intro"
               v-if="idx < 1"
               :key="idx"
               v-html="intro"></p>
            <template v-else>
              <p class="intro"
                 :key="idx"
                 v-show="item.isShowMore"
                 v-html="intro"></p>
            </template>
          </template>
          <div v-if="item.intro.length > 1"
               @click.stop="ctrlMore(item)"
               class="act">
            <template v-if="!item.isShowMore"><span>展开</span><span class="down"></span></template>
            <template v-else><span>收起</span><span class="up"></span></template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      styleObj: 'max-height: 667px',
      prodInfo: [
        {
          companyName: '中华人寿',
          prodList: [
            {
              name: '中华福终身重大疾病保险',
              type: 'zj',
              isLink: true,
              isHot: true,
              link: 'http://prospectus.thjinrong.com/planBook/trial/F0018D',
              isShowMore: false,
              intro: [
                '<strong>100种重疾：</strong>不分组365天间隔，最多给付2次，每次100%保额',
                '<strong>20种中症：</strong>不分组90天间隔，最多给付2次，每次50%保额',
                '<strong>40种早期危重疾病：</strong>不分组90天间隔，最多给付3次，每次30%保额',
                '<strong>恶性肿瘤：</strong>80岁前，额外给付20%保额',
                '<strong>疾病终末期：</strong>18岁前2倍已交保费，18岁后100%保额',
                '<strong>身故或全残：</strong>18岁前2倍已交保费，18岁后100%保额',
                '<strong>保费豁免：</strong>被保人初次确诊早期危重疾病、中症或重疾，免交后续保费'
              ]
            }
          ]
        },
        {
          companyName: '信泰人寿',
          prodList: [
            {
              name: '如意享养老年金保险',
              type: 'nj',
              isHot: true,
              isShowMore: false,
              isLink: false,
              link: 'xintaiApp',
              intro: [
                '<strong>养老年金：</strong>每年领取100%保额或每月领取8.5%保额',
                '<strong>身故保险金：</strong>首个领取日之前身故，按已交保险费与合同现金价值的较大者给付;',
                '领取日起的25年内身故，年领按现金价值和（25-已付次数）*基本保额较大者给付，月领按现金价值和（300-已付次数）*8.5%*基本保额较大者给付;',
                '领取日25年后身故，按现金价值给付'
              ]
            },
            {
              name: '百万守护重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: false,
              link: 'xintaiApp',
              intro: [
                '<strong>106种重疾：</strong>最多给付6次，首次主险保费、保额、主险现金价值三者取大，后续为110%，120%，130%，140%，150%',
                '<strong>20种中症：</strong>最多给付2次，每次按保额60%',
                '<strong>35种轻症：</strong>最多给付4次，每次按保额45% ',
                '<strong>二次轻症疾病保险金：</strong>第二次确诊极早期恶性肿瘤，额外赔付保额45%',
                '<strong>住院关爱津贴保险金：</strong>未发生重疾，60岁后住院，赔付保额0.1%',
                '<strong>恶性肿瘤二次给付：</strong>首次重疾为恶性肿瘤，3年后复发新增按100%保额赔付',
                '<strong>疾病终末期：</strong>18岁前给付2倍已交保费，18岁后主险保费、保额、主险现金价值三者取大',
                '<strong>身故或全残：</strong>18岁前给付2倍已交保费，18岁后主险保费、保额、主险现金价值三者取大',
                '<strong>保费豁免：</strong>被保险人初次确诊轻症、重疾或身故全残，豁免后续保费'
              ]
            }
          ]
        },
        {
          companyName: '百年人寿',
          prodList: [
            {
              name: '康多保终身重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: true,
              link: 'https://bnjy.aeonlife.com.cn/bnjy-wap/jsp/proposalGenerate.html?uuid=e19ae3aaaa3d48f68ddd2933b27d62d5',
              intro: [
                '<strong>100种重疾：</strong>分5组180天间隔，每组仅给付1次，最多给付5次，每次100%保额',
                '<strong>20种中症：</strong>不分组无间隔，最多给付2次，每次60%保额',
                '<strong>35种轻症：</strong>不分组无间隔，最多给付3次，依次按保额35%/40%/45%',
                '<strong>疾病终末期：</strong>18岁前3倍已交保费，18岁后100%保额',
                '<strong>身故或全残：</strong>18岁前3倍已交保费，18岁后100%保额',
                '<strong>保费豁免：</strong>被保人初次确诊轻症、中症、重疾，免交后续保费'
              ]
            },
            {
              name: '康盛保终身重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: true,
              link: 'https://bnjy.aeonlife.com.cn/bnjy-wap/jsp/proposalGenerate.html?uuid=59161bae174b418d84e29e7219d73sfg',
              intro: [
                '<strong>100种重疾：</strong>分5组180天间隔，每组仅给付1次，最多给付5次，每次100%保额',
                '<strong>20种中症：</strong>不分组无间隔，最多给付2次，每次60%保额',
                '<strong>35种轻症：</strong>不分组无间隔，最多给付3次，依次按保额35%/40%/45%',
                '<strong>第二、三次癌症：</strong>每次100%保额，确诊时间间隔5年',
                '<strong>重疾特定关爱金：</strong>前10个保单周年（51岁前），额外给付35%保额',
                '<strong>身故或全残：</strong>18岁前3倍已交保费，18岁后100%保额',
                '<strong>保费豁免：</strong>被保人初次确诊轻症、中症、重疾，免交后续保费'
              ]
            }
          ]
        },
        {
          companyName: '天安人寿',
          prodList: [
            {
              name: '健康源（2019）增强版终身重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: true,
              link: 'http://jys.tianan-life.com/tiananClient/JianKangYuan2019ZQB/index.html#/ausTreeAdd/',
              intro: [
                '<strong>100种重疾：</strong>分6组180天间隔，每组1次，最多给付6次，按保额100%依次递增10%，最高到150%',
                '<strong>20种中症：</strong>不分组无间隔，最多给付2次，每次60%保额',
                '<strong>35种轻症：</strong>不分组无间隔，最多给付4次，每次45%保额',
                '<strong>住院关爱津贴：</strong>满60周岁未患重疾，住院每天可预支0.1%保额，每年90天',
                '<strong>重疾特别关爱金：</strong>前10个保单周年（56岁前），额外给付20%保额',
                '<strong>身故或疾病终末期：</strong>18岁前给付2倍已交保费，18岁后给付100%保额',
                '<strong>癌症关爱：</strong>极早期恶性肿瘤或恶性病变二次赔付、恶性肿瘤二次赔付',
                '<strong>保费豁免：</strong>被保人初次确诊轻症、中症、重疾，免交后续保费'
              ]
            },
            {
              name: '幸福源（欣享）年金保险',
              type: 'nj',
              isShowMore: false,
              isLink: true,
              link: 'http://jys.tianan-life.com/tiananClient/xingFuYuanXiXZJ/index.html#/ausTreeAdd/',
              intro: [
                '<strong>生存年金：</strong>18岁至终身，每年领取固定年金',
                '<strong>身故：</strong>已交保费和身故时现价取大者',
                '<strong>保费豁免：</strong>投保人因意外身故或全残时年龄在18-60岁之间，可豁免后续保费'
              ]
            },
            {
              name: '传世福终身寿险',
              type: 'sx',
              isShowMore: false,
              isLink: true,
              link: 'http://jys.tianan-life.com/tiananClient/ChuanShiFuZJ/index.html#/ausTreeAdd/',
              intro: [
                '<strong>身故或全残：</strong>18周岁前，给付已交保费与现价较大者;18周岁后，给付保额'
              ]
            },
            {
              name: '畅行天下两全保险',
              type: 'yw',
              isShowMore: false,
              isLink: true,
              link: 'http://jys.tianan-life.com/tiananClient/cxtx/index.html#/axtxAdd/',
              intro: [
                '<strong>航空意外：</strong>25倍保额',
                '<strong>自驾车意外：</strong>10倍保额',
                '<strong>特定公共交通意外：</strong>10倍保额（客运轮船、轨道公交、公共汽车）',
                '<strong>八大自然灾害意外：</strong>2倍保额（地震、泥石流、滑坡、洪水、海啸、台风、冰雹、龙卷风）',
                '<strong>普通意外身故或全残：</strong>1倍保额',
                '<strong>疾病身故或全残：</strong>160%已交保费',
                '<strong>满期生存金：</strong>120%已交保费'
              ]
            }
          ]
        },
        {
          companyName: '复星保德信',
          prodList: [
            {
              name: '星满意重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: true,
              // link: 'https://wcsp.pflife.com.cn/api/product/8a8291a15efb72d4015f052ae4c04c35.do?',
              //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1c14d9b66cd82fa8&redirect_uri=https://ezt.pflife.com.cn/ezt/wechat/bizPlan4interme/getOpenid4Fbb/&response_type=code&scope=snsapi_base&state=pass#wechat_redirect
              link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1c14d9b66cd82fa8&redirect_uri=https://ezt.pflife.com.cn/ezt/wechat/bizPlan4interme/getOpenid4Fbb/&response_type=code&scope=snsapi_base&state=pass#wechat_redirect',
              intro: [
                '<strong>100种重疾：</strong>分5组，最多给付5次，依次按保额100%/110%/120%/130%/140%',
                '<strong>40种轻症：</strong>不分组，最多给付3次，依次按保额20%/30%/40%',
                '<strong>疾病终末期：</strong>18岁前退还已交保费，18岁后100%保额',
                '<strong>身故保障：</strong>18岁前退还已交保费，18岁后100%保额',
                '<strong>保费豁免：</strong>被保人初次确诊轻症或重疾，免交后续保费'
              ]
            },
            {
              name: '星悦重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: true,
              // link: 'https://wcsp.pflife.com.cn/api/product/8a8291a1684bce5201687f1ccea5195d.do?',
              link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1c14d9b66cd82fa8&redirect_uri=https://ezt.pflife.com.cn/ezt/wechat/bizPlan4interme/getOpenid4Fbb/&response_type=code&scope=snsapi_base&state=pass#wechat_redirect',
              intro: [
                '<strong>100种重疾：</strong>等待期90天后，按100%保额给付1次',
                '<strong>20种中症：</strong>不分组，最多给付2次，按合同约定给付',
                '<strong>35种轻症：</strong>不分组，最多给付3次，依次按保额20%/30%/40%',
                '<strong>特定疾病额外给付：</strong>30%保额',
                '<strong>特定疾病高龄保险金：</strong>已满60周岁，额外给付70%保额',
                '<strong>恶性肿瘤二次给付：</strong>18岁前初患白血病，生存至满5年后继续按100%保额赔付',
                '<strong>身故保障：</strong>给付已交保费',
                '<strong>保费豁免：</strong>被保人初次确诊轻症或中症，免交后续保费'
              ]
            }
          ]
        },
        {
          companyName: '长城人寿',
          prodList: [
            {
              name: '吉康人生重大疾病保险',
              type: 'zj',
              isLink: true,
              isShowMore: false,
              link: 'http://wx.greatlife.cn/eservice/static/auspiciousLife/html/index.html',
              intro: [
                '<strong>100种重疾：</strong>最多给付2次，每次按保额100%',
                '<strong>25种中症：</strong>最多给付2次，每次按保额50%',
                '<strong>40种轻症：</strong>最多给付3次，每次按保额30%',
                '<strong>疾病终末期：</strong>主险保费、保额、主险现金价值三者取大',
                '<strong>身故或全残：</strong>18岁前给付2倍已交保费，18岁后主险保费、保额、主险现金价值三者取大',
                '<strong>保费豁免：</strong>被保人初次确诊轻症、中症或重疾，免交后续保费'
              ]
            },
            {
              name: '吉福人生重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: true,
              link: 'http://wx.greatlife.cn/eservice/static/giffordLife/html/index.html',
              intro: [
                '<strong>100种重疾：</strong>最多给付2次，每次按保额100%',
                '<strong>25种中症：</strong>最多给付2次，每次按保额50%',
                '<strong>40种轻症：</strong>最多给付3次，每次按保额30%/30%/40% ',
                '<strong>恶性肿瘤康复保险金：</strong>首次重疾为恶性肿瘤，连续5年每年给付保额4%',
                '<strong>恶性肿瘤二次给付：</strong>首次重疾为恶性肿瘤，5年后复发新增按80%保额赔付',
                '<strong>疾病终末期：</strong>18岁前给付2倍已交保费，18岁后主险保费、保额、主险现金价值三者取大',
                '<strong>身故或全残：</strong>18岁前给付2倍已交保费，18岁后主险保费、保额、主险现金价值三者取大',
                '<strong>保费豁免：</strong>自带被保险人多重豁免'
              ]
            }
          ]
        },
        {
          companyName: '爱心人寿',
          prodList: [
            {
              name: '爱加倍重大疾病保险',
              type: 'zj',
              isShowMore: false,
              isLink: true,
              link: 'http://jph.aixin-ins.com/jph/?share=1&name=ajb&from=timeline#/ajb',
              intro: [
                '<strong>105种重疾：</strong>主险保费、保额、主险现金价值三者取大',
                '<strong>30种中症：</strong>最多给付2次，每次按保额50%/60%',
                '<strong>30种轻症：</strong>最多给付3次，依次按保额30%/40%/40%',
                '<strong>二次重疾保障：</strong>确诊重疾1年后，确诊合同约定的其余重疾，给付保额',
                '<strong>恶性肿瘤二次给付：</strong>首次重疾为恶性肿瘤，3年后复发新增按100%保额赔付',
                '<strong>疾病终末期：</strong>主险保费、保额、主险现金价值三者取大',
                '<strong>身故或全残：</strong>18岁前给付2倍已交保费，18岁后主险保费、保额、主险现金价值三者取大',
                '<strong>保费豁免：</strong>自带被保险人和投保人多重豁免'
              ]
            }
          ]
        }
      ],
      logoList: {
        zj: require('../assets/img/zhongji.png'),
        nj: require('../assets/img/nianjin.png'),
        sx: require('../assets/img/renshou.png'),
        yw: require('../assets/img/yiwai.png'),
      }
    };
  },

  components: {
  },

  computed: {},

  mounted() {
    console.log('1111');
    // 分享控制
    this.$controlShare("hideOptionMenu");
    //获取屏幕高度
    let clientHeight = document.documentElement.clientHeight;
    this.styleObj = `max-height: ${clientHeight}px`;
    let prodListAll = [];
    this.prodInfo.forEach(element => {
      prodListAll.push(...element.prodList);
    });
    this.prodInfo.unshift({
      companyName: '全部',
      prodList: prodListAll
    });
    console.log(this.prodInfo);
  },

  methods: {
    ctrlTab(index) {
      this.currentIndex = index;
    },
    ctrlMore(item) {
      item.isShowMore = !item.isShowMore;
    },
    goTo(item) {
      //直接跳转链接
      if (item.isLink) {
        window.location.href = item.link;
      } else {
        //跳转自己的页面
        this.$router.push({
          name: item.link
        })
      }
    }
  }
}

</script>
<style lang='less' scoped>
.u-prod-main {
  width: 100%;
  height: 100%;
  display: flex;
}
.u-prod-tab {
  width: 85px;
  flex-shrink: 0;
  .tab {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    background-color: #f8f8f8;
    border-left: 5px solid transparent;
    &.active {
      color: #333;
      border-color: #f0ca0e;
      background-color: #fff;
    }
  }
}
.u-prod-cont {
  flex: 1;
  // max-height: 667px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 15px;
}
.u-prod-box {
  margin-bottom: 15px;
  padding: 5px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .u-prod {
    display: flex;
    align-items: center;
    min-height: 30px;
    // justify-content: space-between;
    .logo {
      width: 30px;
      height: 30px;
      margin-right: 5px;
      flex-shrink: 0;
    }
    .name {
      max-width: 75%;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333;
      line-height: 18px;
    }
    .hot {
      width: 16px;
      height: 16px;
      overflow: hidden;
      margin-left: 5px;
      background: url(../assets/img/hot.png);
      background-size: cover;
      flex-shrink: 0;
    }
    .arrow {
      width: 6px;
      height: 6px;
      margin-left: 5px;
      border-top: 1px solid #666;
      border-right: 1px solid #666;
      transform: rotate(45deg);
    }
  }
  &:nth-child(2n + 1) {
    background: #f3f3f3;
  }
  .u-intro {
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #666;
    padding-left: 10px;
    line-height: 18px;
    padding-top: 5px;
    .act {
      color: #999;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .down,
    .up {
      width: 6px;
      height: 6px;
      transform: rotate(45deg);
      margin-left: 5px;
    }
    .down {
      border-bottom: 1px solid #666;
      border-right: 1px solid #666;
    }
    .up {
      border-top: 1px solid #666;
      border-left: 1px solid #666;
    }
  }
}
</style>