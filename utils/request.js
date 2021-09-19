const baseUrl = 'http://192.168.3.18:99'


const request = (method, url, data) => {

	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: baseUrl + url,
			data,
			// header: {
			// 	'x-requested-with': 'XMLHttpRequest', //请求方式xml
			// 	Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
			// },
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				resolve(err)
			}
		})
	})

}


export default request
