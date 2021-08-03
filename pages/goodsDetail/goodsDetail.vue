<template>
	<view class="goods-detail">
		<view class="tabs-head">
			<view>
				<u-tabs ref="uTabs" active-color="#FFB517FF" inactive-color="#333333FF" :list="tabList" @change="onChangeTabs"
				 :current="current" :is-scroll="false" height="110" swiperWidth="750">
				</u-tabs>
			</view>
		</view>
		<view class="head-bar"></view>
		<scroll-view scroll-y="true" id="scroll-box" :style="{height:scrollHeight}" @scroll="onScroll" :scroll-into-view="scrollViewId">
			<view class="goods" id="scroll0">
				<view class="swiper-item goods-swiper">
					<u-swiper mode="number" border-radius="0" height="570" :list="goodsList"></u-swiper>
				</view>
				<view class="goods-desc">
					<view class="goods-price">
						￥1800.00
					</view>
					<view class="goods-txt">
						<text>欧池 </text>
						<text>北欧简约布艺沙发组合可拆洗三人位沙发北欧简约布艺沙发组合可拆洗三人位沙发</text>
					</view>
				</view>
			</view>
			<view class="goods-option">
				<view class="option-list">
					<view class="lable">已选 </view>
					<view class="content">湖水蓝，大三人位 +脚榻，1个</view>
					<view class="more">
						<u-icon name="more-dot-fill" @click="openGoodsPopup()" color="#B5B5B5FF" size="34"></u-icon>
					</view>
				</view>
				<view class="option-list">
					<view class="lable">送至</view>
					<view class="content">广东佛山 至 四川成都市双流区县城内</view>
					<view class="more">
						<u-icon name="more-dot-fill" color="#B5B5B5FF" size="34"></u-icon>
					</view>
				</view>
				<view class="option-list">
					<view class="lable">服务</view>
					<view class="content">送货入户并安装0.00</view>
					<view class="more">
						<u-icon name="more-dot-fill" color="#B5B5B5FF" size="34"></u-icon>
					</view>
				</view>
			</view>
			<view class="service">
				<view class="servie-item">
					<u-icon name="checkmark-circle-fill" color="#FFA81FFF" size="28"></u-icon>
					<text>商家发货</text>
				</view>
				<view class="servie-item">
					<u-icon name="checkmark-circle-fill" color="#FFA81FFF" size="28"></u-icon>
					<text>送货入户并安装</text>
				</view>
				<view class="servie-item">
					<u-icon name="checkmark-circle-fill" color="#FFA81FFF" size="28"></u-icon>
					<text>物流配送</text>
				</view>
				<view class="servie-item">
					<u-icon name="checkmark-circle-fill" color="#FFA81FFF" size="28"></u-icon>
					<text>15天保价</text>
				</view>
			</view>
			<view class="goods-info" id="scroll1">
				<view class="info-tabs">
					<view :class="tabInfoIndex==0?'info-active':''" @click="onChangeInfo(0)">商品介绍</view>
					<view :class="tabInfoIndex==1?'info-active':''" @click="onChangeInfo(1)">规格参数</view>
				</view>
				<view class="info-content">
					<view class="info-img" v-if="tabInfoIndex==0">
						<rich-text class="rich" :nodes="richHtml"></rich-text>
					</view>
					<view class="info-parameter" v-if="tabInfoIndex==1">
						<view class="basic-parame">
							<view class="basic-title">
								基本参数
							</view>
							<view class="basic-box">
								<view class="box-item br-bottom">
									<view class="lable">品牌</view>
									<view class="item">极之美</view>
								</view>
								<view class="box-item br-bottom">
									<view class="lable">商品名称</view>
									<view class="item">1.4米气压高箱实木床</view>
								</view>
								<view class="box-item br-bottom">
									<view class="lable">规格货号</view>
									<view class="item">MC-1231</view>
								</view>
								<view class="box-item br-bottom">
									<view class="lable">商品系列</view>
									<view class="item">北欧系列</view>
								</view>
								<view class="box-item br-bottom">
									<view class="lable">商品风格</view>
									<view class="item">现代风格</view>
								</view>
								<view class="box-item br-bottom">
									<view class="lable">产地</view>
									<view class="item">四川成都</view>
								</view>
								<view class="box-item br-bottom">
									<view class="lable">商品尺寸</view>
									<view class="item">2232mm*2343mm*1100mm</view>
								</view>
								<view class="box-item">
									<view class="lable">商品材质</view>
									<view class="item">实木</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="recomm" id="scroll2">
				<view class="recomm-title">
					看了又看
				</view>
				<view class="recomm-list">
					<view class="list">
						<view class="img">
							<image src="../../static/error-goods-min.jpg" mode="widthFix"></image>
						</view>
						<view class="name">
							1.3米劳伦黑金岩板茶几
						</view>
						<view class="desc">
							日月鑫家具独爱系列现代极简客厅岩板/玻璃面、板材、实木内抽、碳素钢支脚茶几 1.3米劳伦黑金岩板茶几
						</view>
						<view class="price">
							￥23.23
						</view>
					</view>
					<view class="list">
						<view class="img">
							<image src="../../static/error-goods-min.jpg" mode="widthFix"></image>
						</view>
						<view class="name">
							1.3米劳伦黑金岩板茶几
						</view>
						<view class="desc">
							日月鑫家具独爱系列现代极简客厅岩板/玻璃面、板材、实木内抽、碳素钢支脚茶几 1.3米劳伦黑金岩板茶几
						</view>
						<view class="price">
							￥23.23
						</view>
					</view>
					<view class="list">
						<view class="img">
							<image src="../../static/error-goods-min.jpg" mode="widthFix"></image>
						</view>
						<view class="name">
							1.3米劳伦黑金岩板茶几
						</view>
						<view class="desc">
							日月鑫家具独爱系列现代极简客厅岩板/玻璃面、板材、实木内抽、碳素钢支脚茶几 1.3米劳伦黑金岩板茶几
						</view>
						<view class="price">
							￥23.23
						</view>
					</view>
					<view class="list">
						<view class="img">
							<image src="../../static/error-goods-min.jpg" mode="widthFix"></image>
						</view>
						<view class="name">
							1.3米劳伦黑金岩板茶几
						</view>
						<view class="desc">
							日月鑫家具独爱系列现代极简客厅岩板/玻璃面、板材、实木内抽、碳素钢支脚茶几 1.3米劳伦黑金岩板茶几
						</view>
						<view class="price">
							￥23.23
						</view>
					</view>
					<view class="list">
						<view class="img">
							<image src="../../static/error-goods-min.jpg" mode="widthFix"></image>
						</view>
						<view class="name">
							1.3米劳伦黑金岩板茶几
						</view>
						<view class="desc">
							日月鑫家具独爱系列现代极简客厅岩板/玻璃面、板材、实木内抽、碳素钢支脚茶几 1.3米劳伦黑金岩板茶几
						</view>
						<view class="price">
							￥23.23
						</view>
					</view>
					<view class="list">
						<view class="img">
							<image src="../../static/error-goods-min.jpg" mode="widthFix"></image>
						</view>
						<view class="name">
							1.3米劳伦黑金岩板茶几
						</view>
						<view class="desc">
							日月鑫家具独爱系列现代极简客厅岩板/玻璃面、板材、实木内抽、碳素钢支脚茶几 1.3米劳伦黑金岩板茶几
						</view>
						<view class="price">
							￥23.23
						</view>
					</view>
					<view class="list">
						<view class="img">
							<image src="../../static/error-goods-min.jpg" mode="widthFix"></image>
						</view>
						<view class="name">
							1.3米劳伦黑金岩板茶几
						</view>
						<view class="desc">
							日月鑫家具独爱系列现代极简客厅岩板/玻璃面、板材、实木内抽、碳素钢支脚茶几 1.3米劳伦黑金岩板茶几
						</view>
						<view class="price">
							￥23.23
						</view>
					</view>
				</view>
			</view>
		</scroll-view>		
		<uni-popup-modal ref="modal"></uni-popup-modal>
	</view>
</template>

<script>
	const tabList = [{
			name: '商品',

		},
		{
			name: '详情',

		},
		{
			name: '推荐',

		}
	]
	const goodsList = [{
			image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
		},
		{
			image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
		},
		{
			image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
		}
	]

	export default {
		data() {
			return {
				tabList,
				goodsList,
				current: 0,
				richHtml: '<p style=\"text-align: center;\"><img src=\"http://dev.duobihouse.cn/fileUEditor/upload/image/20201007/6373766754047629072424326.jpg\" style=\"\" title=\"_0184_W-HG-718.jpg\"/></p><p style=\"text-align: center;\"><img src=\"http://dev.duobihouse.cn/fileUEditor/upload/image/20201007/6373766754049233439391416.jpg\" style=\"\" title=\"_0185_W-HG-718 (2).jpg\"/></p><p><br/></p>',
				tabInfoIndex: 0,
				scrollViewId: 'scroll0',
				scrollHeight: '600px',
				scrollTopInfo: {
					scroll0: 0,
					scroll1: 0,
					scroll2: 0,
				},
			};
		},
		created() {
			this.richHtml = this.imgAddMaxWidth(this.richHtml)
		},

		mounted() {
			//获取 商品 + 详情 + 推荐 初始化时距离顶部的位置
			const query = uni.createSelectorQuery().in(this);
			for (let i = 0; i <= 2; i++) {
				query.select(`#scroll${i}`).boundingClientRect(data => {
					this.scrollTopInfo[`scroll${i}`] = data.top - 60
				}).exec();
			}
		},
		methods: {
			openGoodsPopup(){
			
				 this.$refs.modal.onShowMoadal()
			},
			onChangeTabs(e) {
				this.current = e
				this.scrollViewId = `scroll${e}`
			},
			onChangeInfo(i) {
				this.tabInfoIndex = i
			},
			imgAddMaxWidth(str) {
				if (!str) {
					return "";
				}
				let regex = new RegExp("/>", "gi");
				let resStr = str.replace(regex, " style='max-width: 100%;'/>");
				return resStr;
			},
			onScroll(e) {
				const top = e.detail.scrollTop
				const {
					scroll0,
					scroll1,
					scroll2
				} = this.scrollTopInfo
				if (top >= scroll0) {
					this.current = 0
				}
				if (top >= scroll1) {
					this.current = 1
				}
				if (top >= scroll2) {
					this.current = 2
				}
			},
		
			
		

		},

	}
</script>

<style lang="scss">
	.goods-detail {
		background-color: #F6F6F6FF;
		width: 100%;
		box-sizing: border-box;
		.tabs-head {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10000;
			width: 100%;
		}
		.head-bar {
			height: 110rpx;
			width: 100%;
		}

		.goods {
			background-color: #FFFFFF;
			.goods-swiper {
				height: 570rpx;
				padding: 2px 60rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #DCDCDCFF;
				border-top: 2rpx solid #DCDCDCFF;
				overflow: hidden;
			}

			.goods-desc {
				height: 172rpx;
				box-sizing: border-box;
				padding: 0px 30rpx 0px 28rpx;
				.goods-price {
					line-height: 84rpx;
					font-size: 32rpx;
					color: #FF0000FF;
					font-weight: bold;
				}

				.goods-txt {
					font-size: 24rpx;

					text:nth-child(1) {
						margin-right: 20rpx;
					}
				}
			}
		}

		.goods-option {
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 0rpx 29rpx;
			margin: 30rpx 0rpx 22rpx;
			.option-list {
				height: 113rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				justify-content: space-between;

				.lable {
					flex: 2;
				}

				.content {
					flex: 10;
				}

				.more {
					flex: 1;
				}
			}
		}

		.service {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			width: 100%;
			height: 142rpx;
			background-color: #FFFFFF;
			margin-bottom: 22rpx;

			.servie-item {
				width: 50%;
				padding-left: 50rpx;
				box-sizing: border-box;

				text {
					margin-left: 10rpx;
				}
			}
		}

		.goods-info {
			width: 100%;

			.info-tabs {
				height: 80rpx;
				display: flex;
				line-height: 80rpx;
				background-color: #FFFFFF;
				font-size: 26rpx;

				view {
					text-align: center;
					width: 50%;
					color: #333333;
				}

				.info-active {
					color: #FFA81FFF;
				}
			}

			.info-content {
				.info-img {
					background-color: #FFFFFF;

					rich-text {
						width: 100%;
						height: auto;

						img {
							width: auto;
							height: auto;
							max-width: 100%;
						}
					}
				}

				.info-parameter {
					font-size: 22rpx;

					.basic-parame {
						.basic-title {
							height: 70rpx;
							line-height: 70rpx;
							box-sizing: border-box;
							padding: 0rpx 20rpx;
						}

						.basic-box {
							width: 100%;
							box-sizing: border-box;

							.box-item {
								height: 80rpx;
								background-color: #FFFFFF;
								line-height: 80rpx;
								display: flex;

								.lable {
									color: #585858;
									margin: 0rpx 40rpx 0rpx 50rpx;
								}
							}

							.br-bottom {
								border-bottom: 2rpx solid #dcdcdc;
							}

						}
					}
				}

			}
		}

		.recomm {
			box-sizing: border-box;
			padding: 0px 20rpx;
			.recomm-title {
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				position: relative;

				&:before {
					content: '';
					position: absolute;
					height: 2rpx;
					width: 130rpx;
					background-color: #e1e2e2;
					right: 170rpx;
					top: 45rpx;
				}

				&:after {
					content: '';
					position: absolute;
					height: 2rpx;
					width: 130rpx;
					background-color: #0099cc;
					background-color: #e1e2e2;
					left: 170rpx;
					top: 45rpx;
				}
			}

			.recomm-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.list {
					width: 346rpx;
					background-color: #FFFFFF;
					border: 2rpx solid #F4F4F4;
					box-sizing: border-box;
					padding: 0px 26rpx;
					font-size: 20rpx;
					margin-bottom: 17rpx;

					.img {
						width: 295rpx;
						height: 295rpx;
						margin: 25rpx 0px 30rpx;

						image {
							width: 100%;
						}
					}

					.name {
						font-size: 26rpx;
						padding: 15rpx 0rpx;
						text-align: center;
						width: 100%;
						border-bottom: 2rpx solid #F4F4F4;
					}

					.desc {
						padding: 8rpx 0rpx;
						width: 100%;
						box-sizing: border-box;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.price {
						margin: 10rpx 0rpx;
						color: #FF0000FF;
						text-align: center;
					}

				}
			}
		}
	}
</style>
