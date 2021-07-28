import request from '../utils/request.js'


const api = {
	getHomeSwipper: 'EShopApi/V1/Home/GetHomeAdListByPositionId'
}




export const getHomeSwipper = (data) => request('post', api.getHomeSwipper, data)
