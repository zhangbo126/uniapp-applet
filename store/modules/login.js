
import { login, getUserInfo } from "@/api/user"

const logins = {
    state: {
        userInfo: {},
    },
    mutations: {
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
    },
    actions: {
        /**
            * @description 登录
            * @params {Object} loginInfo 登录信息
            * @return {data} 
        */
        Login({ commit }, loginInfo) {
            return new Promise((reslove, reject) => {
                login(loginInfo).then(res => {
                    if (res.code == 1) {
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
            * @description 获取登录用户信息
            * @params {Object} userInfo 登录信息
            * @return {data} 
        */
        GetUserInfo({ commit }) {
            return new Promise((reslove, reject) => {
                getUserInfo().then(res => {
                    const { userInfo } = res.data
                    commit('SET_USER_INFO', userInfo)
                    reslove(res.data)
                })
            })
        }
    }
}


export default logins