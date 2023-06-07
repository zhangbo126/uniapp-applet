
const baseUrl = process.uniEnv.baseUrl
import { USER_TOKEN } from "@/config/constant";
const token = uni.getStorageSync(USER_TOKEN) || null;
import { msg } from "./utilityFunction";
const request = (method, url, data) => {

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
