<template>
	<view class="popup-modal" v-show="visible">
		<view class="mask" :style="{height:maskStyle.height}">

		</view>
		<view class="modal" :style="{height:style.height,borderRadius:style.borderRadius,transform:style.transform}">
			<view class="modal-head">
				<view class="title">
					{{title}}
				</view>
				<view class="clone" @click="onClone()">
					<u-icon name="close-circle" :size="40"></u-icon>
				</view>
			</view>
			<view class="modal-content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				Type: Number,
				default: 400
			},
			title: {
				Type: String,
				default: ''
			},
			radius: {
				Type: Number,
				default: 14
			}
		},
		data() {
			return {
				visible: false,
				style: {
					height: `${this.height}px`,
					borderRadius: `${this.radius}px ${this.radius}px 0 0`,
					transform: `translateY(${this.height}px)`
				},
				maskStyle: {
					height: ''
				}
			};
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.maskStyle.height = res.windowHeight - this.height + 'px'
				}

			})
		},
		methods: {
			onClone() {

				this.style.transform = `translateY(${this.height}px)`

			
			},
			onShowMoadal() {
				this.visible = true
				this.$nextTick(() => {
					this.style.transform = `translateY(0px)`
				})

			}
		}
	}
</script>

<style lang="scss">
	.popup-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		z-index: 10000;
		background-color: rgba(0, 0, 0, .45);
		// filter: alpha(opacity=50);

		.modal {
			width: 100%;
			box-sizing: border-box;
			padding: 0rpx 20rpx;
			background-color: #FFFFFF;
			z-index: 1000000;
			transition: .5s all;

			.modal-head {
				display: flex;
				justify-content: space-between;
				height: 70rpx;
				align-items: center;

				.clone {
					width: 70rpx;
					height: 70rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
