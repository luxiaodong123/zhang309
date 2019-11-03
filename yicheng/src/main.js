import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from './api/axios'
import 'amfe-flexible';
import { controlShare } from '@js/wechat-control'
import { Dialog, Toast } from 'vant'
import 'vant/lib/index.css'
import VConsole from 'vconsole'

Vue.config.productionTip = false
// 全局注册
Vue.use(Dialog);
Vue.use(Toast);

/*axios-config*/
Vue.prototype.$axios = axios;
Vue.prototype.$controlShare = controlShare;

if (process.env.VUE_APP_MODE === 'development' || process.env.VUE_APP_MODE === 'test') {
  new VConsole();
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
