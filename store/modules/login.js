
import { login, getUserInfo } from "@/api/user"

const logins = {
    state: {
        loginInfo: {},
        userInfo: {},
    },
    mutations: {
        SET_LOGIN_INFO: (state, loginInfo) => {
            state.loginInfo = loginInfo
        },
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
    },
    actions: {
        /**
            登录
            * @params {Object} loginInfo 登录信息
            * @return {data} 
        */
        Login({ commit }, loginInfo) {
            return new Promise((reslove, reject) => {
                login(loginInfo).then(res => {
                    if (res.code == 1) {
                        commit('SET_LOGIN_INFO', res.data)
                        uni.showToast({ title: '登录成功', icon: 'none' })
                        uni.setStorageSync('USER_INFO', res.data);
                        return reslove(res)
                    }
                    return reslove(res)

                }).catch(() => {
                    return reject(res)
                })
            })
        },

        /**
            获取登录用户信息
            * @params {Object} userInfo 登录信息
            * @return {data} 
        */
        GetUserInfo({ commit }) {
            return new Promise((reslove, reject) => {
                getUserInfo().then(res => {
                    commit('SET_USER_INFO', res.data)
                    reslove(res.data)
                })
            })
        }
    }
}


export default logins