import request from '@/utils/request.js'



const api = {
	registerAccount: '/users/registerAccount',
	login:'/users/login',
	addCart:'/cart/addCart',
	delCart:'/cart/delCart',
	getCartList:'/cart/getCartList',
	createCorder:'/order/createOrder',
	updateOrder:'/order/updateOrder',
	delOrder:'/order/delOrder',
	getOrderList:'/order/getOrderList',
	getUserInfo:'/users/getuserInfo',
}


//注册
export const registerAccount = (data) => request('post', api.registerAccount, data)
//登录
export const login = (data) => request('post', api.login, data)
//获取用户信息
export const getUserInfo = (data) => request('post', api.getUserInfo, data)

//添加购物车
export const addCart = (data) => request('post', api.addCart, data)
//删除购物车
export const delCart = (data) => request('post', api.delCart, data)
//获取购物车列表
export const getCartList = (data) => request('post', api.getCartList, data)
//创建订单
export const createCorder = (data) => request('post', api.createCorder, data)

//更新订单状态
export const updateOrder = (data) => request('post', api.updateOrder, data)
//删除订单
export const delOrder = (data) => request('post', api.delOrder, data)
//获取订单列表
export const getOrderList = (data) => request('post', api.getOrderList, data)

