
const baseUrl = process.uniEnv.baseUrl
const userInfo = uni.getStorageSync('USER_INFO') || {};
import { msg } from "./utilityFunction";
const request = (method, url, data) => {
	const token = userInfo.token
	return new Promise((reslove, reject) => {
		uni.request({
			method,
			url: baseUrl + url,
			header: {
				authorization: token
			},
			data,
			success: (res) => {
				const { code, message } = res.data
				if (code != 1) {
					msg(message)
					return reject(res.data)
				}
				reslove(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default request
