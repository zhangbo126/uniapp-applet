import '@/utils/env/index' //网络请求 地址统一配置
import '@/utils/prototype/msgToast.js'
import Vue from 'vue'
import store from './store'
import App from './App'
import uView from '@/uni_modules/uview-ui'




Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
// Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
	 store,
    ...App
})
app.$mount()