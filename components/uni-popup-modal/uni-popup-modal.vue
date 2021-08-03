<template>
	<view class="popup-modal">
		<view class="mask" :style="{opacity:visible?'':0}"></view>

		<view class="modal" :style="{height:style.height,borderRadius:style.borderRadius,transform:style.transform}">
			<view class="modal-head">
				<view class="title">
					{{title}}
				</view>
				<view class="clone" @click="onClone()">
					<u-icon name="close-circle" :size="40"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			visible: {
				Type: Boolean,
				default: false
			},
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
				default: 12
			}
		},
		data() {
			return {
				style: {
					height: `${this.height}px`,
					borderRadius: `${this.radius}px ${this.radius}px 0 0`,
					transform: `translateY(${this.height}px)`,
				}
			};
		},
		methods: {
			onClone() {
				this.style.transform = `translateY(${this.height}px)`
				console.log(this.style.transform)
			},
			onShowMoadal() {

				this.style.transform = `translateY(-${this.height}px)`

			}
		}
	}
</script>

<style lang="scss">
	.popup-modal {
		.mask {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			height: 100%;
			z-index: 100000;
			background-color: rgba(0, 0, 0, .45);
			filter: alpha(opacity=50);
			pointer-events: none;
		}

		.modal {
			width: 100%;
			box-sizing: border-box;
			padding: 0rpx 20rpx;
			background-color: #FFFFFF;
			position: fixed;
			right: 0;
			bottom: -750rpx;
			left: 0;
			z-index: 100000;
			overflow: auto;
			transition: 1s all;
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
