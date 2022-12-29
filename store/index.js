import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
	},
	mutations: {
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
