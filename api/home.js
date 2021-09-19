import request from '../utils/request.js'


const api = {
	getHomeClassList: '/class/getClassList',
	getHomeGoodsList:'/goods/getGoodsList'
}



//获取商品风格
export const getHomeClassList = (data) => request('post', api.getHomeClassList, data)
//获取商品
export const getHomeGoodsList = (data) => request('post', api.getHomeGoodsList, data)
