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
					<view class="content">{{selectTxt.colorTxt}}{{selectTxt.mixTxt}}{{selectTxt.numTxt}}</view>
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
					<view class="list" v-for="recomm in recommList" :key="recomm.sku">
						<view class="img">
							<image :src="recomm.path" mode="widthFix"></image>
						</view>
						<view class="name">
							{{recomm.name}}
						</view>
						<view class="desc">
							{{recomm.mixName}}
						</view>
						<view class="price">
							￥{{recomm.price | priceValue}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<u-icon name="home-fill"></u-icon>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<u-icon name="car-fill"></u-icon>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" >
				<u-icon name="heart-fill"></u-icon>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" >立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn">加入购物车</button>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="make-box">
				<view class="make-goods">
					<view class="goods">
						<view class="img">
							<image src="https://www.duobihouse.com/fileSure/2020/11/20/image/1/1461959d0d0f467281037526f47c4c4f.jpg" mode="widthFix"></image>
						</view>
						<view class="info">
							<view class="price">￥213</view>
							<view class="mix">
								已选 <text>{{selectTxt.mixTxt}}</text>
								<text>{{selectTxt.colorTxt}}</text>
								<text>{{selectTxt.numTxt}}</text>
							</view>
						</view>
					</view>
					<view class="clone" @click="cloneGoodsPopup">
						<u-icon name="close-circle" :size="40"></u-icon>
					</view>
				</view>
				<view class="color-box">
					<view class="color-title">
						颜色
					</view>
					<view class="color-item">
						<view class="item" @click="onClickColor(color,index)" v-for="(color,index) in colorItem" :key="color.id">
							<view class="item-cout" :class="colorIndex==index?'item-active':''">
								{{color.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="color-box">
					<view class="color-title">
						规格组合
					</view>
					<view class="color-item">
						<view class="item" @click="onClickMix(mix,index)" v-for="(mix,index) in mixItem" :key="mix.id">
							<view class="item-cout" :class="mixIndex==index?'item-active':''">
								{{mix.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="goods-num">
					<view class="color-title">
						数量
					</view>
					<view class="num">
						<u-number-box size="20" v-model="selectTxt.numTxt" class="step" :min="1" :max="999"></u-number-box>
					</view>
				</view>
				<view class="make-bar">
					<view @click="onBuy">立即购买</view>
					<view @click="onAddCart">加入购物车</view>
				</view>
			</view>
		</uni-popup>
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
			image: 'https://www.duobihouse.com/fileSure/2020/11/20/image/1/891f5766c9874480b1f6f019e5879e69.jpg',
		},
		{
			image: 'https://www.duobihouse.com/fileSure/2020/11/20/image/1/c416e4bb69194cb2b2b1ab6e1f1c24f3.jpg',
		},
		{
			image: 'https://www.duobihouse.com/fileSure/2020/11/20/image/1/1461959d0d0f467281037526f47c4c4f.jpg',
		}
	]

	const colorItem = [{
			name: '湖水蓝',
			id: 1,
		},
		{
			name: '静谧灰',
			id: 2,
		},
		{
			name: '活力黄',
			id: 3
		},
		{
			name: '湖水蓝',
			id: 4,
		},
		{
			name: '湖水蓝',
			id: 5,
		},
		{
			name: '湖水蓝',
			id: 6,
		},
		{
			name: '湖水蓝',
			id: 7,
		},
	]

	const mixItem = [{
			name: '单人位（0.8米）',
			id: 1,
		},
		{
			name: '三人位（1.8米）',
			id: 2,
		},
		{
			name: '三人位（1.26米）+ 脚踏',
			id: 3
		},
		{
			name: '四人位（1.26米）+ 脚踏',
			id: 4,
		},
	]

	const recommList = [{
			name: '生活例子家居悦物系列现代轻奢北欧风格皮沙发客厅 三人位沙发',
			mixName: '三人位沙发',
			sky: '1',
			price: 322,
			path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg'
		},
		{
			name: '实木沙发 原木色单人位沙发',
			mixName: '原木色单人位沙发',
			sky: '2',
			price: 3232,
			path: 'https://www.duobihouse.com/fileSure/2020/11/20/image/1/c416e4bb69194cb2b2b1ab6e1f1c24f3.jpg'
		},
		{
			name: '日月鑫家具超凡大师时尚卧室科技布软床 1.8米科技布床',
			mixName: '1.8米科技布床',
			sky: '3',
			price: 5422,
			path: 'https://www.duobihouse.com/fileSure/2021/8/2/image/1/77aed1c3d96d4945b6f1f99d0b19e6d2.jpg'
		},
		{
			name: '优家家具现代简约卧室组合（床+床头柜）实木卧室 1.8米床★',
			mixName: '1.8米床★',
			sky: '4',
			price: 5322,
			path: 'https://www.duobihouse.com/fileSure/2021/4/28/image/1/de1fd857581f47efa9e27b60bc8557c9.jpg'
		},
	]

	export default {
		data() {
			return {
				tabList,
				goodsList,
				colorItem,
				mixItem,
				recommList,
				current: 0,
				colorIndex: 0,
				mixIndex: 0,
				richHtml:'<p style=\"text-align: center;\"><img src=\"https://www.duobihouse.com/fileUEditor/upload/image/20210731/6376334413454683059410276.jpg\" title=\"R-B-9016.jpg\" alt=\"R-B-9016.jpg\"/></p>',
				tabInfoIndex: 0,
				scrollViewId: 'scroll0',
				scrollHeight: '600px',
				scrollTopInfo: {
					scroll0: 0,
					scroll1: 0,
					scroll2: 0,
				},
				selectTxt: {
					colorTxt: '湖水蓝',
					mixTxt: '单人位（0.8米）',
					numTxt: 1
				}
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
			onClickColor(color, index) {
				this.colorIndex = index
				this.selectTxt.colorTxt = color.name + ' , '
			},
			onClickMix(mix, index) {
				this.mixIndex = index
				this.selectTxt.mixTxt = mix.name + ' , '
			},
			openGoodsPopup() {
				this.$refs.popup.open('bottom')
			},
			cloneGoodsPopup() {
				this.$refs.popup.close()
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
			onBuy() {
				uni.showToast({
					title: '点击了立即购买'
				})
			},
			onAddCart() {
				uni.showToast({
					title: '添加成功',
					success: () => {
						this.$refs.popup.close()
					}
				})

			}

		},

	}
</script>

<style lang="scss">
	.goods-detail {
		background-color: #F6F6F6FF;
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.tabs-head {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
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
					height: 100%;
					display: flex;
					align-items: center;
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
                margin-bottom: 	120rpx;
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

	.make-box {
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		height: 1060rpx;
		border-radius: 12rpx 12rpx 0rpx 0rpx;
		padding: 20rpx;
		overflow-y: scroll;

		.make-goods {
			display: flex;
			justify-content: space-between;

			.goods {
				display: flex;

				.img {
					margin-right: 20rpx;
					width: 240rpx;

					image {
						width: 100%;
					}
				}

				.info {
					padding-top: 135rpx;

					.price {
						font-size: 32rpx;
						color: #FF0000FF;
					}

					.mix {
						font-size: 22rpx;
						color: #333333;
						margin-top: 30rpx;
					}
				}
			}
		}

		.color-box {
			margin-top: 20rpx;

			.color-title {
				font-size: 26rpx;
			}

			.color-item {
				display: flex;
				flex-wrap: wrap;
				padding: 25rpx 0rpx;

				.item {
					margin: 16rpx 0rpx;

					.item-cout {
						margin-right: 12rpx;
						padding: 8rpx 50rpx;
						text-align: center;
						line-height: 36rpx;
						background-color: #F0F0F0;
						border-radius: 18px;
						font-size: 22rpx;
					}
				}

				.item-active {
					background-color: #FFF9EF !important;
					color: #FFA81FFF;
					box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.11);
				}
			}
		}

		.goods-num {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40rpx
		}

		.make-bar {
			display: flex;
			justify-content: space-between;

			view {
				width: 290rpx;
				height: 80rpx;
				line-height: 80rpx;
				color: #FFFFFF;
				border-radius: 10rpx;
				text-align: center;
			}

			view:nth-child(1) {
				background-color: #FFA81FFF;
			}

			view:nth-child(2) {
				background-color: #FF0000FF;
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: 22rpx;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
