import request from '../utils/request.js'


const api = {
	getHomeSwipper: 'EShopApi/V1/Home/GetHomeAdListByPositionId'
}


export function getHomeSwipper(data) {
	return request('post', api.getHomeSwipper,data)
}
