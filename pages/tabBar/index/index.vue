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
			<div class="bag-swiper">
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
			</div>

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
	export default {
		data() {
			return {
				styleList,
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

<style scoped lang="scss">
	.index {
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
			.bag-title {
				padding: 0px 15rpx;
				height: 40rpx;
				font-size: 20rpx;
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
</style>
