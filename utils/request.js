
const baseUrl = process.uniEnv.baseUrl
const request = (method, url, data) => {
	return new Promise((reslove, reject) => {
		uni.request({
			method,
			url:baseUrl+url,
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
