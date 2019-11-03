<!--  -->
<template>
  <div class="u-dtcz-body">
    <div class="u-item"
         v-for="(item, index) in resourceList"
         :key="index"
         @click="goTo(item)">
      <p v-if="!!item.logo">
        <img :class="item.class"
             :src="item.logo"
             alt="">
      </p>
      <p v-else
         class="name">{{item.name}}</p>
      <span class="arrow"></span>
    </div>
  </div>
</template>

<script>
import controlStorage from '@js/storage'
export default {
  data() {
    return {
      resourceList: [],
      actList: [
        {
          name: '中华人寿',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/zhrs.png',
          class: 'zh',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/zhrs-diantou.pdf'
        },
        {
          name: '信泰人寿',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/xtbx.png',
          class: 'xt',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/xtrs-toubao.pdf'
        },
        {
          name: '天安中介',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/tars.png',
          class: 'ta',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/tazj-weitou.pdf'
        },
        {
          name: '百年人寿',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/bnrs.png',
          class: 'bn',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/bnrs-weitou.pdf'
        },
        {
          name: '长城人寿',
          total: 3,
          logo: 'https://static.ycbrokers.com/resource/img/ccrs.png',
          class: 'cc',
          linkArr: [
            {
              name: '长城人寿电子函件操作简介',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ccrs-dzhj.pdf'
            },
            {
              name: '长城人寿电子回执操作手册',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ccrs-dzhz.pdf'
            },
            {
              name: '长城人寿APP投保注意事项',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ccrs-app.pdf'
            }
          ]
        },
        {
          name: '同方全球',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/tfqq.png',
          class: 'tf',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/tfqq-weitou.pdf'
        },
        {
          name: '陆家嘴国泰',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/ljzgs.png',
          class: 'ljz',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ljzgs-weitou.pdf'
        },
        {
          name: '爱心人寿',
          total: 2,
          class: 'ax',
          logo: 'https://static.ycbrokers.com/resource/img/axrs.png',
          linkArr: [
            {
              name: '爱心人寿经品荟操作手册',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/axrs-jph.pdf'
            },
            {
              name: '爱心人寿微信投保手册',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/axrs-weitou.pdf'
            }
          ]
        },
        {
          name: '恒安标准',
          total: 2,
          class: 'ha',
          logo: 'https://static.ycbrokers.com/resource/img/habz.png',
          linkArr: [
            {
              name: '恒安标准电投流程多元行销APP',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/habz-app.pdf'
            },
            {
              name: '恒安标准电子签名介绍',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/habz-dzqm.pdf'
            }
          ]
        },
        {
          name: '长生人寿',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/csrs.png',
          class: 'cs',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/csrs-wxzy.pdf'
        },
        {
          name: '人保',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/zgrs.png',
          class: 'rb',
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/rb-edsz.pdf'
        }
      ],
      saleList: [
        {
          name: '买保险就要找保险经纪人',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/sale01.pdf'
        },
        {
          name: '公司安全性，法律来保证',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/sale02.pdf'
        },
        {
          name: '保险公司无大小，有先后',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/sale03.pdf'
        },
        {
          name: '家庭保单整理',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/sale04.pdf'
        },
        {
          name: '重疾杠杆与赔付比',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/sale04.pdf'
        },
        {
          name: '重大疾病保险',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/sale06.pdf'
        },
        {
          name: '保险经纪人必须是产品专家',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/sale07.pdf'
        },
      ],
      brokerList: [
        {
          name: '保险经纪一定是行业发展的必然趋势',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker01.pdf'
        },
        {
          name: '保险经纪公司是金融保险综合超市',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker02.pdf'
        },
        {
          name: '保险经纪人不为任何一家保险公司打工',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker03.pdf'
        },
        {
          name: '买保险一定要货比三家，没有对比就没有伤害',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker04.pdf'
        },
        {
          name: '股东及管理团队介绍',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker05.pdf'
        },
        {
          name: '经纪公司的产品优势-人无我有',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker06.pdf'
        },
        {
          name: '经纪公司的产品优势-人有我优',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker07.pdf'
        },
        {
          name: '经纪公司的产品优势-人优我廉',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker08.pdf'
        },
        {
          name: '保险经纪政策介绍01',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker09.pdf'
        },
        {
          name: '保险经纪政策介绍02',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker10.pdf'
        },
        {
          name: '保险经纪政策介绍03',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker11.pdf'
        },
        {
          name: '保险公司无大小',
          total: 1,
          link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/broker12.pdf'
        },
      ],
      prodList: [
        {
          name: '中华人寿',
          total: 2,
          logo: 'https://static.ycbrokers.com/resource/img/zhrs.png',
          class: 'zh',
          linkArr: [
            {
              name: '中华福',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '中华福终身重大疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/zhf-bxtk.pdf'
                },
                {
                  name: '中华福终身重大疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/zhf-flb.pdf'
                },
                {
                  name: '中华福终身重大疾病保险投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/zhf-tbgz.pdf'
                },
              ]
            }
          ]
        },
        {
          name: '信泰人寿',
          total: 2,
          logo: 'https://static.ycbrokers.com/resource/img/xtbx.png',
          class: 'xt',
          linkArr: [
            {
              name: '如意享养老年金',
              total: 4,
              isDown: false,
              linkArr: [
                {
                  name: '信泰如意享养老年金保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/xtrs-bxtk.pdf'
                },
                {
                  name: '信泰如意享养老年金保险基本保险金额表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/xtrs-bxje.pdf'
                },
                {
                  name: '信泰如意享养老年金保险特殊保全规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/xtrs-bqgz.pdf'
                },
                {
                  name: '信泰如意享产品培训课件',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/xtrs-pxkj.pdf'
                }
              ]
            }
          ]
        },
        {
          name: '天安中介',
          total: 2,
          class: 'ta',
          logo: 'https://static.ycbrokers.com/resource/img/tars.png',
          linkArr: [
            {
              name: '畅行天下',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '畅行天下两全保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/cxtx-bxtk.pdf'
                },
                {
                  name: '畅行天下两全保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/cxtx-flb.pdf'
                },
                {
                  name: '畅行天下两全保险投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/cxtx-tbgz.pdf'
                }
              ]
            },
            {
              name: '传世福',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '传世福终身寿险保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/csf-bxtk.pdf'
                },
                {
                  name: '传世福终身寿险保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/csf-flb.pdf'
                },
                {
                  name: '传世福终身寿险保险业管规定',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/csf-yggd.pdf'
                }
              ]
            }
          ]
        },
        {
          name: '百年人寿',
          total: 2,
          class: 'bn',
          logo: 'https://static.ycbrokers.com/resource/img/bnrs.png',
          linkArr: [
            {
              name: '百年康盛保',
              total: 2,
              isDown: false,
              linkArr: [
                {
                  name: '康盛保终身重大疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ksb-bxtk.pdf'
                },
                {
                  name: '康盛保终身重大疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ksb-bxfl.pdf'
                }
              ]
            },
            {
              name: '百年医惠通',
              total: 2,
              isDown: false,
              linkArr: [
                {
                  name: '医惠通条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/yht-tk.pdf'
                },
                {
                  name: '医惠通费用补偿医疗保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/yht-bxfl.pdf'
                }
              ]
            }
          ]
        },
        {
          name: '长城人寿',
          total: 3,
          class: 'cc',
          logo: 'https://static.ycbrokers.com/resource/img/ccrs.png',
          linkArr: [
            {
              name: '吉康人生重疾',
              total: 6,
              isDown: false,
              linkArr: [
                {
                  name: '长城吉康人生重大疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/jk-bxtk.pdf'
                },
                {
                  name: '长城吉康人生重疾费率',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/jk-bxfl.pdf'
                },
                {
                  name: '长城吉康人生重大疾病保险投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/jk-tbgz.pdf'
                },
                {
                  name: '长城附加吉康人生两全保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjjk-bxtk.pdf'
                },
                {
                  name: '长城附加吉康人生两全费率',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjjk-bxfl.pdf'
                },
                {
                  name: '长城附加吉康人生两全保险投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjjk-tbgz.pdf'
                }
              ]
            },
            {
              name: '吉祥保重疾',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/jxb-tbtk.pdf'
            },
            {
              name: '医享无忧百万医疗',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '长城医享无忧百万医疗保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/yxwy-bxtk.pdf'
                },
                {
                  name: '长城医享无忧百万医疗保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/yxwy-bxfl.pdf'
                },
                {
                  name: '长城医享无忧百万医疗保险投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/yxwy-tbgz.pdf'
                }
              ]
            }
          ]
        },
        {
          name: '同方全球',
          total: 2,
          class: 'tf',
          logo: 'https://static.ycbrokers.com/resource/img/tfqq.png',
          linkArr: [
            {
              name: '康健一生',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '康健一生（新多倍保）终身重大疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ksys-bxtk.pdf'
                },
                {
                  name: '康健一生（新多倍保）终身重大疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ksys-bxflb.pdf'
                },
                {
                  name: '康健一生（新多倍保）终身重大疾病保险营运细则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ksys-ysxz.pdf'
                },
              ]
            }
          ]
        },
        {
          name: '陆家嘴国泰',
          total: 2,
          class: 'ljz',
          logo: 'https://static.ycbrokers.com/resource/img/ljzgs.png',
          linkArr: [
            {
              name: '恒泰一生',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '恒泰一生终身寿险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/htys-bxtk.pdf'
                },
                {
                  name: '恒泰一生终身寿险保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/htys-flb.pdf'
                },
                {
                  name: '陆家嘴国泰恒泰一生',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/htys-js.pdf'
                },
              ]
            }
          ]
        },
        {
          name: '爱心人寿',
          total: 7,
          class: 'ax',
          logo: 'https://static.ycbrokers.com/resource/img/axrs.png',
          linkArr: [
            {
              name: '爱加倍',
              total: 4,
              isDown: false,
              linkArr: [
                {
                  name: '爱加倍重大疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ajb-bxtk.pdf'
                },
                {
                  name: '爱加倍重大疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ajb-flb.pdf'
                },
                {
                  name: '附加爱加倍两全保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjajb-bxtk.pdf'
                },
                {
                  name: '附加爱加倍两全保疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjajb-flb.pdf'
                }
              ]
            },
            {
              name: '爱养天年',
              total: 2,
              isDown: false,
              linkArr: [
                {
                  name: '爱养天年恶性肿瘤疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/aytn-bxtk.pdf'
                },
                {
                  name: '爱养天年恶性肿瘤疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/aytn-flb.pdf'
                }
              ]
            },
            {
              name: '附加爱安心综合意外伤害保险',
              total: 2,
              isDown: false,
              linkArr: [
                {
                  name: '附加爱安心综合意外伤害保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjaax-bxtk.pdf'
                },
                {
                  name: '附加爱安心综合意外伤害保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjaax-flb.pdf'
                }
              ]
            },
            {
              name: '好孕妈妈特疾险',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '爱心人寿好孕妈妈特定疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/hymm-bxtk.pdf'
                },
                {
                  name: '爱心人寿好孕妈妈特定疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/hymm-flb.pdf'
                },
                {
                  name: '爱心好孕妈妈医疗险投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/hymm-tbgz.pdf'
                }
              ]
            },
            {
              name: '守护神定寿',
              total: 6,
              isDown: false,
              linkArr: [
                {
                  name: '爱心人寿守护神定期寿险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/shs-bxtk.pdf'
                },
                {
                  name: '爱心人寿守护神定期寿险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/shs-flb.pdf'
                },
                {
                  name: '爱心人寿附加守护神豁免重大疾病保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjshs-bxtk.pdf'
                },
                {
                  name: '爱心人寿附加守护神豁免重大疾病保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/fjshs-flb.pdf'
                },
                {
                  name: '爱心人寿守护神定期寿险+附加守护神豁免重大疾病保险投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/shs-tbgz.pdf'
                },
                {
                  name: '爱心守护神定寿产品介绍',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/shs-js.pdf'
                }
              ]
            },
            {
              name: '臻爱寰球特定疾病全球医疗保险',
              total: 2,
              isDown: false,
              linkArr: [
                {
                  name: '臻爱寰球特定疾病全球医疗保险条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/zahq-bxtk.pdf'
                },
                {
                  name: '臻爱寰球特定疾病全球医疗保险费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/zahq-flb.pdf'
                }
              ]
            },
            {
              name: '爱一生',
              total: 3,
              isDown: false,
              linkArr: [
                {
                  name: '爱一生条款',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ays-bxtk.pdf'
                },
                {
                  name: '爱一生费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ays-flb.pdf'
                },
                {
                  name: '爱一生投保规则',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/ays-tbgz.pdf'
                }
              ]
            }
          ]
        },
        {
          name: '恒安标准',
          total: 2,
          class: 'ha',
          logo: 'https://static.ycbrokers.com/resource/img/habz.png',
          linkArr: [
            {
              name: '新老年防癌险',
              total: 4,
              isDown: false,
              linkArr: [
                {
                  name: '老年恶性肿瘤危重疾病保险（A款）费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/halna-flb.pdf'
                },
                {
                  name: '老年恶性肿瘤危重疾病保险（B款）费率表',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/halnb-flb.pdf'
                },
                {
                  name: '老年防癌险2018款培训课件',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/haln-px.pdf'
                },
                {
                  name: '新老年防癌投保规则终稿',
                  link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/xln-tbgz.pdf'
                }
              ]
            }
          ]
        },
        {
          name: '长生人寿',
          total: 3,
          class: 'cs',
          logo: 'https://static.ycbrokers.com/resource/img/csrs.png',
          linkArr: [
            {
              name: '彩虹桥国际医疗保险',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/cschq-bxtk.pdf'
            },
            {
              name: '长生福（御享版）重大疾病保险条款',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/csfyx-bxtk.pdf'
            },
            {
              name: '长生福',
              total: 1,
              link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/csfjb-bxtk.pdf'
            }
          ]
        }
      ],
      buyList: [
        {
          name: '中华人寿',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/zhrs.png',
          class: 'zh',
          link: 'http://cic.thjinrong.com/client/issue/Policy/productList'
        },
        // {
        //   name: '信泰人寿',
        //   total: 1,
        //   logo: 'https://static.ycbrokers.com/resource/img/xtbx.png',
        //   class: 'xt',
        //   link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/xtrs-toubao.pdf'
        // },
        {
          name: '天安中介',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/tars.png',
          class: 'ta',
          link: 'http://wechatshop.tianan-life.com/wis/PublicAuthorizeServlet?operation=weitou&fromuseropenid=00000000&pubacctopenid=gh_6aaa42142134'
        },
        {
          name: '百年人寿',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/bnrs.png',
          class: 'bn',
          link: 'https://appservice.aeonlife.com.cn/bnwt/page/policy/login.html'
        },
        // {
        //   name: '长城人寿',
        //   total: 3,
        //   logo: 'https://static.ycbrokers.com/resource/img/ccrs.png',
        //   class: 'cc',
        //   link: ''
        // },
        {
          name: '同方全球',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/tfqq.png',
          class: 'tf',
          link: 'https://wzeus.aegonthtf.com/wzeus/loginIng.html'
        },
        {
          name: '陆家嘴国泰',
          total: 1,
          logo: 'https://static.ycbrokers.com/resource/img/ljzgs.png',
          class: 'ljz',
          link: 'http://wxagent.cathaylife.cn/cxladm/admin/oauth?redi_sys=http%3A%2F%2Fwcins.cathaylife.cn%2Fhtml%2Fmain.html%23agentlogin'
        },
        {
          name: '爱心人寿',
          total: 1,
          class: 'ax',
          logo: 'https://static.ycbrokers.com/resource/img/axrs.png',
          link: 'http://jph.aixin-ins.com/jph/?name=product-list&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1'
        },
        // {
        //   name: '恒安标准',
        //   total: 2,
        //   class: 'ha',
        //   logo: 'https://static.ycbrokers.com/resource/img/habz.png',
        //   link: ''
        // },
        // {
        //   name: '长生人寿',
        //   total: 1,
        //   logo: 'https://static.ycbrokers.com/resource/img/csrs.png',
        //   class: 'cs',
        //   link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/csrs-wxzy.pdf'
        // },
        // {
        //   name: '人保',
        //   total: 1,
        //   logo: 'https://static.ycbrokers.com/resource/img/zgrs.png',
        //   class: 'rb',
        //   link: 'https://static.ycbrokers.com/pdfjs/web/viewer.html?file=https://static.ycbrokers.com/resource/PDF/rb-edsz.pdf'
        // }
      ],
      resourceType: this.$route.query.resourceType
    };
  },

  components: {},

  computed: {},

  created() {
    switch (this.resourceType) {
      case 'act':
        document.title = '电投操作'
        break;
      case 'sale':
        document.title = '销售加油站'
        break;
      case 'broker':
        document.title = '保险经纪'
        break;
      case 'prod':
        document.title = '保险产品'
        break;
      case 'buy':
        document.title = '投保链接'
        break;
      default:
        break;
    };
    controlStorage('resourceInfo', 'remove');
  },

  mounted() {
    switch (this.resourceType) {
      case 'act':
        this.resourceList = [...this.actList];
        break;
      case 'sale':
        this.resourceList = [...this.saleList];
        break;
      case 'broker':
        this.resourceList = [...this.brokerList];
        break;
      case 'prod':
        this.resourceList = [...this.prodList];
        break;
      case 'buy':
        this.resourceList = [...this.buyList];
        break;
      default:
        break;
    }
  },

  methods: {
    goTo(item) {
      let total = item.total;
      if (total == 1) { //直接跳转
        window.location.href = item.link;
      } else {
        let resourceInfo = {
          resourceType: this.resourceType,
          linkArr: item.linkArr
        }
        controlStorage('resourceInfo', 'set', resourceInfo);
        //跳转自己的页面
        this.$router.push({
          name: 'resourceInfoList',
          // query: {
          //   linkArr: JSON.stringify(item.linkArr)
          // }
        })
      }
    }
  }
}

</script>
<style lang='less' scoped>
.u-dtcz-body {
  width: 100%;
  min-height: 100%;
  background-color: #25293f;
  .u-item {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 34px 0 20px;
    margin-bottom: 10px;
    background-color: #fff;
    .name {
      max-width: 75%;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333;
      line-height: 20px;
    }
    .arrow {
      width: 11px;
      height: 17px;
      background: url(../assets/img/arrow.png);
      background-size: cover;
      flex-shrink: 0;
    }
    .ax {
      width: 94px;
    }
    .bn {
      width: 93px;
    }
    .cc {
      width: 114px;
    }
    .cs {
      width: 163px;
    }
    .ha {
      width: 146px;
    }
    .ljz {
      width: 231px;
    }
    .tf {
      width: 118px;
    }
    .ta {
      width: 100px;
    }
    .xt {
      width: 119px;
    }
    .zh {
      width: 172px;
    }
    .rb {
      width: 255px;
    }
  }
}
</style>