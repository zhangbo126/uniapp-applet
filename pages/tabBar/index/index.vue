<template>
	<view class="index">
		<view class="head">
			<view class="head-search">
				<view class="class-icon">
					<view class="icon"><i class="myicon iconfont icon-fenleimulu"></i></view>
					<text>分类</text>
				</view>
				<view class="search">
					<input type="text" value="" placeholder="搜索商品" />
				</view>
			</view>
			<view class="head-nav">
				<view class="nav">
					<view>首页</view>
					<view>客厅家具</view>
					<view>卧室家具</view>
					<view>书房家具</view>
					<view>餐厅家具</view>
				</view>
			</view>
			<view class="swiper-contenter">
				<swiper class="swiper" indicator-active-color="#FFB517" :indicator-dots="true" :autoplay="true" :interval="2000"
				 :duration="500">
					<swiper-item>
						<view class="swiper-img">
							<image src="https://img.alicdn.com/imgextra/i3/6000000003731/O1CN016VwHel1dQqPXjgJIt_!!6000000003731-0-octopus.jpg"
							 mode="widthFix"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-img">
							<image src="https://img.alicdn.com/imgextra/i3/6000000003731/O1CN016VwHel1dQqPXjgJIt_!!6000000003731-0-octopus.jpg"
							 mode="widthFix"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-img">
							<image src="https://img.alicdn.com/imgextra/i3/6000000003731/O1CN016VwHel1dQqPXjgJIt_!!6000000003731-0-octopus.jpg"
							 mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="goods-style">
			<view class="style-container">
				<view class="style" :style="{backgroundColor:style.color}" v-for="(style,i) in styleList" :key="i">
					<view class="style-lf">
						<text>{{style.title}}</text>
						<uni-icons type="arrowthinright" color="#fff"></uni-icons>
					</view>
					<view class="style-lr">
						<view class="style-img">
							<image src="https://img.alicdn.com/imgextra/i1/2387643426/O1CN01qY3tvg1bB9SRQFp4l_!!2387643426-0-daren.jpg_180x180xzq90.jpg_.webp"
							 mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bag-hall">
			<view class="bag-title">整装拎包</view>
			<vie class="bag-container">
				<view class="bag-swiper">
					<swiper class="swiper" indicator-active-color="#FFB517" :indicator-dots="true" :autoplay="true" :interval="2000"
					 :duration="500">
						<swiper-item>
							<view class="swiper-img">
								<image src="https://img.alicdn.com/imgextra/i3/6000000003731/O1CN016VwHel1dQqPXjgJIt_!!6000000003731-0-octopus.jpg"
								 mode="widthFix"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-img">
								<image src="https://img.alicdn.com/imgextra/i3/6000000003731/O1CN016VwHel1dQqPXjgJIt_!!6000000003731-0-octopus.jpg"
								 mode="widthFix"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-img">
								<image src="https://img.alicdn.com/imgextra/i3/6000000003731/O1CN016VwHel1dQqPXjgJIt_!!6000000003731-0-octopus.jpg"
								 mode="widthFix"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="bag-footer">
					整装拎包
				</view>
			</vie>
		</view>
		<view class="hot-selected">
			<view class="hot-title">
				热门精选
			</view>
			<view class="hot-container">
				<view class="hot" v-for="(hot,index) in hotList" :key="index" @click="goDetail()">
					<view class="hot-img">
						<image :src="hot.filePath" mode="widthFix"></image>
					</view>
					<view class="hot-name">
						{{hot.goodsName}}
					</view>
					<view class="hot-price">
						￥{{hot.price}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getHomeSwipper
	} from '../../../api/home.js'
	const styleList = [{
			title: '现代馆',
			img: 'https://img.alicdn.com/imgextra/i1/2387643426/O1CN01qY3tvg1bB9SRQFp4l_!!2387643426-0-daren.jpg_180x180xzq90.jpg_.webp',
			color: '#FFB6B3'
		},
		{
			title: '北欧馆',
			img: 'https://img.alicdn.com/imgextra/i1/2387643426/O1CN01qY3tvg1bB9SRQFp4l_!!2387643426-0-daren.jpg_180x180xzq90.jpg_.webp',
			color: '#A7FFDD'
		},
		{
			title: '中式馆',
			img: 'https://img.alicdn.com/imgextra/i1/2387643426/O1CN01qY3tvg1bB9SRQFp4l_!!2387643426-0-daren.jpg_180x180xzq90.jpg_.webp',
			color: '#9AD6FF'
		},
		{
			title: '美式馆',
			img: 'https://img.alicdn.com/imgextra/i1/2387643426/O1CN01qY3tvg1bB9SRQFp4l_!!2387643426-0-daren.jpg_180x180xzq90.jpg_.webp',
			color: '#FFE566'
		},
		{
			title: '轻奢馆',
			img: 'https://img.alicdn.com/imgextra/i1/2387643426/O1CN01qY3tvg1bB9SRQFp4l_!!2387643426-0-daren.jpg_180x180xzq90.jpg_.webp',
			color: '#61D6C9'
		},
		{
			title: '综合馆',
			img: 'https://img.alicdn.com/imgextra/i1/2387643426/O1CN01qY3tvg1bB9SRQFp4l_!!2387643426-0-daren.jpg_180x180xzq90.jpg_.webp',
			color: '#A5F598'
		},
	]
	const hotList = [{
			goodsName: 'LM33-真皮沙发',
			price: 222,
			filePath: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg'
		},
		{
			goodsName: 'LM33-真皮沙发',
			price: 222,
			filePath: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg'
		},
		{
			goodsName: 'LM33-真皮沙发',
			price: 23,
			filePath: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg'
		},
		{
			goodsName: 'LM33-真皮沙发',
			price: 222,
			filePath: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg'
		},
	]
	export default {
		data() {
			return {
				styleList,
				hotList,
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
               //跳转详情
			   goDetail(){
				   uni.navigateTo({
				   	url:'/pages/goodsDetail/goodsDetail',
				   })
			   }
		},

		onReachBottom(e) {
			uni.showLoading({
				title: '加载中...',
				success: () => {
					setTimeout(() => {
						uni.hideLoading()
						this.hotList = this.hotList.concat(hotList)
					}, 1500)
				}
			})

		}

	}
</script>

<style scoped lang="scss">
	.index {
		background-color: #F6F6F6FF;
		.head {
			height: 446rpx;
			width: 100%;
			position: relative;
			.head-search {
				display: flex;
				height: 90rpx;
				align-items: center;
				background-color: #FFB517;
				.class-icon {
					text-align: center;
					display: flex;
					flex-direction: column;
					width: 90rpx;
					color: #FFFFFF;
					.icon {
						height: 58rpx;
						i {
							font-size: 60rpx;
						}
					}
					text {
						font-size: 18rpx;
					}
				}
				.search {
					input {
						width: 568rpx;
						height: 64rpx;
						background-color: #FFFFFF;
						border-radius: 32rpx;
						box-sizing: border-box;
						padding: 0px 10px;
					}
				}
			}

			.head-nav {
				background-color: #FFB517;
				height: 175rpx;
				.nav {
					height: 90rpx;
					width: 100%;
					padding: 0rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-around;
					align-items: center;
					color: #FFFFFF;
					font-size: 26rpx;
					view {
						text-align: center;
						letter-spacing: 6rpx;
					}

					view:nth-child(1) {
						position: relative;
					}

					view:nth-child(1)::before {
						display: block;
						content: '';
						position: absolute;
						bottom: -6rpx;
						width: 74rpx;
						height: 8rpx;
						background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 158, 0, 0.8));
					}
				}
			}

			.swiper-contenter {
				width: 100%;
				height: 265rpx;
				border-radius: 7rpx;
				position: absolute;
				display: flex;
				justify-content: center;
				bottom: 2rpx;

				.swiper {
					width: 720rpx;
					height: 265rpx;
					border-radius: 10rpx;

					.swiper-img {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
						}
					}
				}
			}
		}

		.goods-style {
			width: 100%;
			height: 354rpx;
			box-sizing: border-box;
			padding: 0px 15rpx;
			display: flex;
			align-items: center;

			.style-container {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.style {
					width: 229rpx;
					height: 142rpx;
					background: #FFB6B3;
					border-radius: 7rpx;
					display: flex;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0rpx 22rpx 0rpx 14rpx;
					margin-bottom: 17rpx;

					.style-lf,
					.style-lr {
						height: 142rpx;
						box-sizing: border-box;
					}

					.style-lf {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 20rpx;
						color: #1D1D1D;
						padding: 22rpx 0px 22rpx;
					}

					.style-lr {
						display: flex;
						align-items: center;
						padding-top: 26rpx;

						.style-img {
							width: 104rpx;
							height: 104rpx;

							image {
								border-radius: 50%;
								width: 100%;
							}
						}
					}
				}
			}
		}

		.bag-hall {
			width: 100%;
			padding: 0px 15rpx;
			box-sizing: border-box;

			.bag-title {

				height: 40rpx;
				font-size: 20rpx;
			}

			.bag-container {
				.bag-footer {
					text-align: center;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 20rpx;
					width: 100%;
					box-shadow: 0rpx 4rpx 11rpx 0rpx rgba(124, 124, 124, 0.22);
					border-radius: 0rpx 0rpx 7rpx 7rpx;
					background-color: #FFFFFF;
				}

				.bag-swiper {
					width: 100%;
					height: 265rpx;
					border-radius: 7rpx;
					display: flex;
					justify-content: center;

					.swiper {
						width: 720rpx;
						height: 265rpx;
						border-radius: 10rpx;

						.swiper-img {
							width: 100%;
							height: 100%;

							image {
								width: 100%;
							}
						}
					}
				}

			}

		}

		.hot-selected {
			width: 100%;
			box-sizing: border-box;
			padding: 0px 14rpx;

			.hot-title {
				height: 90rpx;
				line-height: 90rpx;
				font-size: 20rpx;
			}

			.hot-container {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.hot {
					width: 346rpx;
					height: 461rpx;
					background-color: #FFFFFF;
					border: 2rpx solid #F4F4F4;
					box-sizing: border-box;
					padding: 0px 26rpx;
					font-size: 20rpx;
					margin-bottom: 17rpx;

					.hot-img {
						width: 295rpx;
						height: 295rpx;
						margin: 25rpx 0px 30rpx;

						image {
							width: 100%;
						}
					}

					.hot-name {
						text-align: center;
						height: 32rpx;
						width: 100%;
						border-bottom: 2rpx solid #F4F4F4;
					}

					.hot-price {
						margin-top: 30rpx;
						color: #FF0000FF;
						text-align: center;
					}
				}
			}
		}
	}
</style>
