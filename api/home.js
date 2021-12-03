import request from '../utils/request.js'



const api = {
	getNoticeList: '/information/getActivityList',
	getGoodsBrand: '/brand/getBrandList',
	getGoodsTypeList: '/goods/getGoodsTypeList',
	getGoodsDetail: '/goods/getGoodsDetailsInfo',
	getNoticeNews: '/goods/getNotice',
}

//获取消息通知列表
export const getNoticeList = (data) => request('post', api.getNoticeList, data)

//获取商品品牌
export const getGoodsBrand = (data) => request('post', api.getGoodsBrand, data)

//获取秒杀商品
export const getGoodsTypeList = (data) => request('post', api.getGoodsTypeList, data)

//获取商品详情
export const getGoodsDetail = (data) => request('post', api.getGoodsDetail, data)
