<script>

	import {mapMutations,mapActions} from 'vuex';	
	export default {
		methods: {
			...mapMutations(['SET_LOGIN_INFO']),
			...mapActions(['GetUserInfo'])
		},
		onLaunch: function() {
			let userInfo = uni.getStorageSync('USER_INFO') || {};
			if(userInfo.token){
				//更新登陆状态
			    this.SET_LOGIN_INFO(userInfo)
				//获取登录用户信息
				this.GetUserInfo()
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
