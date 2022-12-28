
import { login } from "@/api/user"

const logins = {
    state: {
        userInfo: {},

    },
    mutations: {
        SET_USER_INFO: (state, result) => {
            state.userInfo = result

        }
    },
    actions: {
        Login({ commit }, userInfo) {
            return new Promise((reslove, reject) => {
                login(userInfo).then(res => {
                    if (res.code == 1) {
                        commit('SET_USER_INFO', res.data)
                        uni.showToast({
                            title: '登录成功',
                            icon: 'none'
                        })
                        uni.setStorageSync('USER_INFO', res.data);
                        return reslove(res)
                    }
                    return reslove(res)

                }).catch(() => {
                    return reject(res)
                })
            })
        }
    }
}


export default logins