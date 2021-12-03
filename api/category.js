import request from '../utils/request.js'



const api = {
	getClassTree: '/class/getClassTree',
	getClassTypeList: '/class/getClassTypeList',
}

//获取分类
export const getClassTree = (data) => request('post', api.getClassTree, data)
//分类类型
export const getClassTypeList = (data) => request('post', api.getClassTypeList, data)

