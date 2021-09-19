export default {
	data() {
		return {
			//设置默认的分享参数
			share: {
				title: '多比家具网',
				path: '/pages/tabBar/home/home',
				imageUrl: '',
			}
		};
	},
	onShareAppMessage(res) { //发送给朋友
		let pages = getCurrentPages(); //获取所有页面栈实例列表
		let nowPage = pages[pages.length - 1]; //当前页页面实例
		// console.log(nowPage);
		let route = nowPage.route;//当前页面地址
		let options = nowPage.options;//参数
		let query = '?';
		for (let key in options) {
			query+=(key+'='+options[key]+'&');
		}
		query = query.replace(/(.*)&/,'$1');//替换最后一个&为空
		if(JSON.stringify(options).length>2){
			route+=query;
		}
		// console.log(query,JSON.stringify(options).length,route);
		return {
			title: this.share.title,
			path: route || this.share.path,
			imageUrl: this.share.imageUrl,
		};
	},
	// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareTimeline
	onShareTimeline(res) { //分享到朋友圈
		let pages = getCurrentPages(); //获取所有页面栈实例列表
		let nowPage = pages[pages.length - 1]; //当前页页面实例
		// console.log(nowPage);
		let options = nowPage.options;//参数
		let query = '';
		for (let key in options) {
			query+=(key+'='+options[key]+'&');
		}
		query = query.replace(/(.*)&/,'$1');//替换最后一个&为空
		// console.log(query);
		return {
			title: this.share.title,
			query: query,
			imageUrl: this.share.imageUrl,
		};
	},
};
