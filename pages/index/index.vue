<template>
	<view class="container">

	</view>
</template>

<script>
	import {
		getHomeSwipper
	} from '../../api/home.js'
	export default {
		data() {
			return {

			}
		},
		created() {
			getHomeSwipper({
				adPositionId: '96845998faed4ee8a57b57746d41a7a5',
				contentCount: 5,
				themeCount: 1
			}).then(res => {
				console.log(res)
			})
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
