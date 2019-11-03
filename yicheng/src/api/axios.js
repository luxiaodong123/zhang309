import axios from 'axios'
import Router from '../router/router'

axios.defaults.timeout = 120000 //设置超时时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // 检测某种状态进行重定向
    // if (response.data.code === 403) {
    //   Router.push({
    //     name: 'login'
    //   })
    // }
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

export default axios
