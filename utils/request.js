
const baseUrl ="http://192.168.3.39:99"

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
