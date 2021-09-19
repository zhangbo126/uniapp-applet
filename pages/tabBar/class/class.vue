<template>
	<view class="class-container">
		<scroll-view scroll-y="true" class="nav-lf">

			<view class="nav-item" :class="index==navActiveIndex?'nav-active':''" v-for="(nav,index) in classNavList" :key="nav.p_id"
			 @click="onClickNav(nav,index)">
				{{nav.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="class-lr" scroll-with-animation :scroll-top="navScrollTop" @scroll="onScroll">
			<view class="lr-box" v-for="nav in classNavList" :key="nav.p_id" :id="nav.p_id">
				<view class="title">
					{{nav.name}}
				</view>
				<view class="lr-item">
					<view class="item" v-for="list in nav.children" :key="list.id">
						<view class="item-img">
							<image :src="list.path" mode="widthFix"></image>
						</view>
						<view class="name">
							{{list.name}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const classNavList = [{
			name: '客厅',
			p_id: 'scroll0',
			children: [{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
			]
		}, {
			name: '餐厅',
			p_id: 'scroll1',
			children: [{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
			]
		},
		{
			name: '卧室',
			p_id: 'scroll2',
			children: [{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},

				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				}
			]
		}, {
			name: '书房',
			p_id: 'scroll3',
			children: [{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				}
			]
		},
		{
			name: '青少年家具馆',
			p_id: 'scroll4',
			children: [{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				}
			]
		},
		{
			name: '青少年家具馆',
			p_id: 'scroll5',
			children: [{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				},
				{
					name: '沙发',
					path: 'https://www.duobihouse.com/fileSure/2020/9/7/image/1/59cdbd2486d0428089db097b05e7d9f1.jpg',
					key: Math.random() * 100
				}
			]
		},
	]
	export default {
		data() {
			return {
				classNavList,
				navScrollTop: 0,
				navActiveIndex: 0,
			}
		},
		mounted() {
			this.calcSize()
		},
		methods: {
			onClickNav(nav, index) {
				this.navScrollTop = nav.top
				this.navActiveIndex = index
			},
			onScroll(e) {

				let scrollTop = e.detail.scrollTop;
				let navs = this.classNavList.filter(item => item.top <= scrollTop).reverse()

				if (navs.length > 0) {


					const index = navs.length - 1

					this.navActiveIndex = index

				}


			},
			calcSize() {
				//页面初始化时计算元素距离顶部距离
				const query = uni.createSelectorQuery().in(this)
				this.classNavList.forEach(v => {
					query.select(`#${v.p_id}`).boundingClientRect(data => {
						v.top = data.top
					}).exec()
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.class-container {
		display: flex;
		background-color: #FFFFFF;
		height: 100%;

		.nav-lf {
			width: 200rpx;
			flex-shrink: 0;
			height: 100%;

			.nav-item {
				width: 200rpx;
				height: 128rpx;
				background-color: #EDEDED;
				text-align: center;
				line-height: 128rpx;
				font-size: 22rpx;
			}

			.nav-active {
				background-color: #FFFFFF;
				color: #FFB517FF;
			}
		}

		.class-lr {
			flex: 1;
			overflow: hidden;

			.lr-box {
				margin-bottom: 10rpx;

				.title {
					font-size: 22rpx;
					height: 62rpx;
					line-height: 62rpx;
					text-align: center;
					position: relative;

					&::before {
						content: '';
						position: absolute;
						top: 31rpx;
						width: 100rpx;
						height: 2rpx;
						left: 110rpx;
						background-color: #b9b9b9;
					}

					&::after {
						content: '';
						position: absolute;
						top: 31rpx;
						width: 100rpx;
						height: 2rpx;
						right: 110rpx;
						background-color: #b9b9b9;
					}
				}

				.lr-item {
					display: flex;
					flex-wrap: wrap;

					.item {
						margin: 20rpx 0rpx;
						padding: 0rpx 39rpx;

						.item-img {
							width: 106rpx;
							height: 85rpx;
							overflow: hidden;

							image {
								width: 100%;
							}
						}

						.name {

							width: 106rpx;
							line-height: 22rpx;
							font-size: 22rpx;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
