import Vue from 'vue'
import App from './App'
import '@/static/iconfont/iconfont.css';
import '@/utils/filters'
Vue.config.productionTip = false
import uView from "uview-ui";
import share from './utils/share.js';
Vue.use(uView)
App.mpType = 'app'
Vue.mixin(share);
const app = new Vue({
	...App
})
app.$mount()
