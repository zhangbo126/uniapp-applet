<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {mapMutations} from 'vuex';
		
	export default {
		methods: {
			...mapMutations(['SET_USER_INFO'])
		},
		onLaunch: function() {
			let userInfo = uni.getStorageSync('USER_INFO') || {};
			if(userInfo.token){
				//更新登陆状态
			    this.SET_USER_INFO(userInfo)			
			}
			 
		},
		onShow: function() {
		},
		onHide: function() {
		},
	}
</script>

<style lang='scss'>
	@import '@/uni_modules/uview-ui/theme.scss';
	@import '@/static/css/global.scss';
	
</style>
