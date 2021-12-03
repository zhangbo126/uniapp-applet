import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
		
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			
		}
	},
	actions: {

	},
	modules: {
		login
	}
})

export default store
