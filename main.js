
import '@/utils/env/index' //网络请求 地址统一配置
import store from './store'
import '@/utils/prototype.js'
import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'

Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
App.mpType = 'app'

const app = new Vue({
	 store,
    ...App
})
app.$mount()