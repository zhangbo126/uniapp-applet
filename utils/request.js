
const baseUrl = process.uniEnv.baseUrl
const  userInfo = uni.getStorageSync('USER_INFO') || {};

const request = (method, url, data) => {
const token = userInfo.token
	return new Promise((reslove, reject) => {
		uni.request({
			method,
			url:baseUrl+url,
			header:{
				authorization:token
			},
			data,
			success: (res) => {
				reslove(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default request
