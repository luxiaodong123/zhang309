import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // isLogin: 0 ,//是否登录
    agentInfo: {
      checkVal: 0,
      gender: 1,  
      documentType:{
        text: "身份证",
        value: 1
      },
      province: "北京市",
      city: "北京区",
      area: "东城区",
      certiVali: { 
        text: "请选择有效期",
        value: 0 
      },
      birthday: "请选择生日",
      education: {
        text: "请选择学历",
        value: 0
      },
      politicsFace: {
        text: "请选择政治面貌",
        value: 0
      },
      marriageState: {
        text: "请选择婚姻状况",
        value: 0
      },
      rank: {
        text: "请选择职级",
        value: 0
      },
    
    }
  },
  mutations: {
    // [types.SET_LOGIN_STATUS](state, status) { //设置登录状态
    //   state.isLogin = status
    // },
    [types.SET_AGENT_INFO](state, data) { //获取在线入职信息
      Object.assign(state.agentInfo, data);
    },

  },
  actions: {},
  getters: {
    // getLoginStatus: state => state.isLogin,
    getAgentInfo: state => state.agentInfo,
  }
})
