/** 
   @description 消息提示弹框组件的二次封装
  * @param {String} title  消息内容
  * @param {String} duration  弹框显示时间 
  * @param {String} mask  是否有遮罩层 
  * @param {String} icon  图标 
*/

export const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
