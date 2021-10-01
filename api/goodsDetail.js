import request from '../utils/request.js'


const api = {
	getGoodsDetailsInfo: '/goods/getGoodsDetailsInfo',
	
}



//获取商品详情
export const getGoodsDetailsInfo = (data) => request('post', api.getGoodsDetailsInfo, data)

