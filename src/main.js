import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import http from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
// Vue.use(Button);
// Vue.use(Select);
Vue.prototype.$http=http;
import '../api/mock.js'
new Vue({
  el:'#app',
  store,
  render: h => h(App),
  router:router
})
