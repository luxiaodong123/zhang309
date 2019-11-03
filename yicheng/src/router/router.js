import Vue from 'vue'
import Router from 'vue-router'
import axios from '../api/axios'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('../views/list'),
      meta: {
        title: '页面加载中'
      }
    },
    {
      path: '/remote-signature',
      name: 'remoteSignature',
      component: () => import('../views/remote-signature.vue'),
      meta: {
        title: '在线签名'
      }
    },
    {
      path: '/agent-login',
      name: 'agentLogin',
      component: () => import('../views/agent-login.vue'),
      meta: {
        title: '经纪人登录'
      }
    },
    {
      path: '/prod-all',
      name: 'prodAll',
      component: () => import('../views/prod-all.vue'),
      meta: {
        title: '计划书'
      }
    },
    {
      path: '/xintai-app',
      name: 'xintaiApp',
      component: () => import('../views/xintai-app.vue'),
      meta: {
        title: '掌上信泰APP下载'
      }
    },
    {
      path: '/resource-index',
      name: 'resourceIndex',
      component: () => import('../views/resource-index.vue'),
      meta: {
        title: '资料库'
      }
    },
    {
      path: '/resource-info',
      name: 'resourceInfo',
      component: () => import('../views/resource-info.vue'),
      meta: {
        title: ''
      }
    },
    {
      path: '/resource-info-list',
      name: 'resourceInfoList',
      component: () => import('../views/resource-info-list.vue'),
      meta: {
        title: ''
      }
    },
    {
      path: '/income-query',
      name: 'incomeQuery',
      component: () => import('../views/income-query.vue'),
      meta: {
        title: '佣金查询'
      }
    },
    {
      path: '/income-detail',
      name: 'incomeDetail',
      component: () => import('../views/income-detail.vue'),
      meta: {
        title: '佣金'
      }
    },
    {
      path: '/prod-config',
      name: 'prodConfig',
      component: () => import('../views/prod-config.vue'),
      meta: {
        title: '产品配置'
      }
    },
    {
      path: '/prod-choose',
      name: 'prodChoose',
      component: () => import('../views/prod-choose.vue'),
      meta: {
        title: '产品对比'
      }
    },
    {
      path: '/prod-compare',
      name: 'prodCompare',
      component: () => import('../views/prod-compare.vue'),
      meta: {
        title: '对比清单'
      }
    },
    {
      path: '/induction-referees',
      name: 'inductionReferees',
      component: () => import('../views/induction-referees.vue'),
      meta: {
        title: '在线入职'
      }
    },
    {
      path: '/induction-agent',
      name: 'inductionAgent',
      component: () => import('../views/induction-agent.vue'),
      meta: {
        title: '在线入职'
      }
    },
    {
      path: '/induction-img',
      name: 'inductionImg',
      component: () => import('../views/induction-img.vue'),
      meta: {
        title: '在线入职'
      }
    },
    {
      path: '/induction-submit',
      name: 'inductionSubmit',
      component: () => import('../views/induction-submit.vue'),
      meta: {
        title: '在线入职'
      }
    }
  ]
})

/**
 * 微信授权登录、绑定
 * @param {*} level 授权级别 L是只需要微信授权 B是需要进行代理人登录绑定
 * @param {*} purl 需要进行代理人绑定后跳转的页面路由 
 */
router.beforeEach((to, from, next) => {
  let level = (to.name == 'prodConfig' || to.name == 'resourceIndex' || to.name == 'incomeQuery') ? 'B' : 'L',
      purl = '/agent-login';
  //登录页面不需要判断授权
  if (to.name == 'agentLogin') {
    next();
  } else {
    axios.get(`/wechat/auth-check`, {
      params: {
        level: level,
        purl: purl,
        turl: to.fullPath
      }
    }).then(res => {
      //需要进行微信授权跳转的
      if (res.data.errCode == 0) {
        next()
      } else if (res.data.errCode == 30000) {
        window.location.href = res.data.data;
      }
    }).catch(err => {
    })
  }
  window.scrollTo(0, 0)
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
