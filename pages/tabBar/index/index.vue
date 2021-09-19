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
							<image src="http://uni-app.test.upcdn.net/3fb006fc80e24988a157fe5e777a54f2.jpg"
							 ></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-img">
							<image src="http://uni-app.test.upcdn.net/8a037e0d4f83429a937beda1df810cc8.jpg"
							 ></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-img">
							<image src="http://uni-app.test.upcdn.net/c854033a16bf4b6b9bc4ee93d6250f42.jpg"
							 ></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="goods-style">
			<view class="style-container">
				<view class="style" :style="{ backgroundColor: style.color }" v-for="(style, i) in classList" :key="i">
					<view class="style-lf">
						<text>{{ style.name }}</text>
						<uni-icons type="arrowthinright" color="#fff"></uni-icons>
					</view>
					<view class="style-lr">
						<view class="style-img">
							<image :src="style.logoFilePath" mode="heightFix"></image>
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
								<image src="http://uni-app.test.upcdn.net/2732c4ed641c467386e7d3f9999959d1.jpg"
								 mode="widthFix"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-img">
								<image src="http://uni-app.test.upcdn.net/5641b8af13224da983f5134a63e0fc24.jpg"
							mode="widthFix"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-img">
								<image src="http://uni-app.test.upcdn.net/b294237f6dc747a7aed214e0eaa22480.jpg"
								mode="widthFix"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="bag-footer"> 整装拎包 </view>
			</vie>
		</view>
		<view class="hot-selected">
			<view class="hot-title"> 热门精选 </view>
			<view class="hot-container">
				<view class="hot" v-for="(hot, index) in goodsList" :key="index" @click="goDetail()">
					<view class="hot-img">
						<image :src="hot.designSketch[0]" mode="widthFix"></image>
					</view>
					<view class="hot-name">
						{{ hot.skuName }}
					</view>
					<view class="hot-price"> ￥{{ hot.price }} </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getHomeClassList,
		getHomeGoodsList
	} from "@/api/home.js";
	const classBgcolor = ["#FFB6B3", "#FFE566", "#A7FFDD", "#9AD6FF", "#61D6C9", "#A5F598"];


	export default {
		data() {
			return {
				classList: [], //商品分类
				goodsList: [], //商品列表
                isLazyDown:false, //判断是否到底部了
				GoodsQueryInfo: {
					pageNumber: 1,
					pageSize: 10,
				},
				ClassQueryInfo: {
					pageNumber: 1,
					pageSize: 6,
				}
			};
		},
		onShow() {

		},
		async created() {
			await this.getClassList()
			await this.getGoodsList()

		},
		methods: {
			//跳转详情
			goDetail() {
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail",
				});
			},
			//获取分类
			getClassList() {
				getHomeClassList(this.ClassQueryInfo).then(res => {
					this.classList = res.data
					this.classList.forEach((v, i) => {
						v.color = classBgcolor[i]
					})
				})
			},
			//获取商品
			getGoodsList() {
				getHomeGoodsList(this.GoodsQueryInfo).then(res => {
					this.goodsList = res.data
				})
			}
		},

		onReachBottom(e) {
			if(this.isLazyDown){
				return  uni.showToast({
					title:'到底了...',
					icon:'none'
				})
			}
			this.GoodsQueryInfo.pageNumber=this.GoodsQueryInfo.pageNumber+1
			uni.showLoading({
				title: "加载中...",
				success: () => {
					getHomeGoodsList(this.GoodsQueryInfo).then(res => {
						this.goodsList = this.goodsList.concat(res.data)
						if(res.data.length==0){
							this.isLazyDown=true
						}
						uni.hideLoading()
					})
				},
			});
		},
	};
</script>

<style scoped lang="scss">
	.index {
		background-color: #f6f6f6ff;
		.head {
			height: 446rpx;
			width: 100%;
			position: relative;

			.head-search {
				display: flex;
				height: 90rpx;
				align-items: center;
				background-color: #ffb517;

				.class-icon {
					text-align: center;
					display: flex;
					flex-direction: column;
					width: 90rpx;
					color: #ffffff;

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
						background-color: #ffffff;
						border-radius: 32rpx;
						box-sizing: border-box;
						padding: 0px 10px;
					}
				}
			}

			.head-nav {
				background-color: #ffb517;
				height: 175rpx;

				.nav {
					height: 90rpx;
					width: 100%;
					padding: 0rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-around;
					align-items: center;
					color: #ffffff;
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
						content: "";
						position: absolute;
						bottom: -6rpx;
						width: 74rpx;
						height: 8rpx;
						background: linear-gradient(90deg,
							rgba(255, 255, 255, 0.8),
							rgba(255, 158, 0, 0.8));
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
							height: 100%;
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
					background-color: #ffb6b3;
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
						color: #1d1d1d;
						padding: 22rpx 0px 22rpx;
					}

					.style-lr {
						display: flex;
						align-items: center;
						padding-top: 26rpx;

						.style-img {
							width: 114rpx;
							height: 114rpx;

							image {
								border-radius: 50%;
								width: 100%;
								height: 100%;
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
					background-color: #ffffff;
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
					background-color: #ffffff;
					border: 2rpx solid #f4f4f4;
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
						border-bottom: 2rpx solid #f4f4f4;
					}

					.hot-price {
						margin-top: 30rpx;
						color: #ff0000ff;
						text-align: center;
					}
				}
			}
		}
	}
</style>
