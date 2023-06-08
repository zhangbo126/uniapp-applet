<template>
  <view class="container">
    <!-- 空白页 -->
    <view v-if="showEmpty" class="empty">
      <image src="/static/emptyCart.jpg" mode="aspectFit" />
      <view v-if="userInfo.token" class="empty-tips">
        空空如也
        <navigator
          class="navigator"
          v-if="userInfo.token"
          url="../index/index"
          open-type="switchTab"
          >随便逛逛></navigator
        >
      </view>
      <view v-else class="empty-tips">
         <text>未登录</text>
        <view class="navigator" @click="onWxLogin">微信快捷登录?</view>
      </view>
    </view>
    <view v-else>
      <!-- 列表 -->
      <view class="cart-list">
        <block v-for="(item, index) in cartList" :key="item._id">
          <view class="cart-item" :class="{ 'b-b': index !== cartList.length - 1 }">
            <view class="image-wrapper">
              <image :src="item.imageFilePath" mode="aspectFill" lazy-load />
              <view
                class="yticon icon-xuanzhong2 checkbox"
                :class="{ checked: item.checked }"
                @click="onCheckGood('item', index)"
              ></view>
            </view>
            <view class="item-right">
              <text class="clamp title">{{ item.skuName }}</text>
              <text class="attr">{{ item.goodsName }}</text>
              <text class="price">¥{{ item.price }}</text>
              <u-number-box
                class="step"
                :min="1"
                :max="99"
                v-model="item.num"
                @change="numberChange(item)"
              ></u-number-box>
            </view>
            <text
              class="del-btn yticon icon-fork"
              @click="deleteCartItem(index, item._id)"
            ></text>
          </view>
        </block>
      </view>
      <!-- 底部菜单栏 -->
      <view class="action-section">
        <view class="checkbox">
          <image
            :src="allChecked ? '/static/selected.png' : '/static/select.png'"
            mode="aspectFit"
            @click="onCheckGood('all')"
          />
          <view class="clear-btn" :class="{ show: allChecked }" @click="clearCart"
            >清空</view
          >
        </view>
        <view class="total-box">
          <text class="price">¥{{ totalPrice }}</text>
          <text class="coupon">
            已优惠
            <text>74.35</text>元
          </text>
        </view>
        <button type="primary" class="no-border confirm-btn" @click="createOrder">
          去结算
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { getCartList, addCart, delCart } from "@/api/user.js";
import { USER_TOKEN } from "@/config/constant";
import { wxLogin } from "@/api/user";
export default {
  data() {
    return {
      cartList: [],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.login.userInfo,
    }),
    showEmpty() {
      return !this.userInfo.token || this.cartList.length == 0;
    },
    allChecked() {
      return this.cartList.filter((v) => v.checked).length == this.cartList.length;
    },
    //购物车价格计算
    totalPrice() {
      let total = this.cartList.reduce((prev, curr, index, arr) => {
        if (curr.checked) {
          prev = prev + curr.price + curr.num;
        }
        return prev;
      }, 0);
      return total;
    },
  },
  onShow() {
    this.$nextTick(() => {
      if(!this.userInfo.token)return false
      this.getList();
    });
  },
  methods: {
    async getList() {
      const userId = this.userInfo._id;
      const { data } = await getCartList({ userId });
      this.cartList = data || [];
      this.cartList.forEach((v) => {
        this.$set(v, "checked", false);
        v.imageFilePath = v.designSketch[0];
      });
    },
    async onWxLogin() {
      //获取用户信息
      const [, userProfile] = await uni.getUserProfile({
        desc: "获取用户信息",
        lang: "zh_CN",
      });

      if (userProfile) {
        //登录
        const [, loginInfo] = await uni.login({ provider: "weixin" });
        if (loginInfo) {
          const { code } = await loginInfo;
          const {
            userInfo: { avatarUrl, nickName },
          } = userProfile;
          const params = {
            code,
            avatarUrl,
            userName: nickName,
          };
          const { data } = await wxLogin(params);
          uni.setStorageSync(USER_TOKEN, data.token);
          this.$store.commit("SET_USER_INFO", data);
          this.$api.msg("登陆成功");
        }
      }
    },
    //选中状态处理
    onCheckGood(type, index) {
      if (type === "item") {
        this.cartList[index].checked = !this.cartList[index].checked;
      } else {
        const checked = !this.allChecked;
        const list = this.cartList;
        list.forEach((item) => {
          item.checked = checked;
        });
      }
    },
    //数量
    numberChange(data) {
      let obj = Object.assign(
        {},
        {
          num: data.num,
          userId: this.userInfo._id,
          skuId: data.skuId,
        }
      );
      addCart(obj);
    },
    //删除
    async deleteCartItem(index, _id) {
      const idList = [_id];
      const userId = this.userInfo._id;
      const { code } = await delCart({ idList, userId });
      if (code == 1) {
        this.cartList.splice(index, 1);
      }
    },
    //清空
    async clearCart() {
      const [, e] = await uni.showModal({ content: "清空购物车？" });
      if (e.confirm) {
        const idList = this.cartList.map((v) => v._id);
        const userId = this.userInfo._id;
        const { code } = await delCart({ idList, userId });
        if (code == 1) this.cartList = [];
      }
    },
    //创建订单
    createOrder() {
      let goods = this.cartList.filter((v) => v.checked);
      if (goods.length == 0) {
        return uni.showToast({
          icon: "none",
          title: "请选择要结算的商品",
        });
      }

      uni.navigateTo({
        url: `/pages/orderList/createOrder`,
        events: {
          createOrder: (data) => {
            console.log(data);
          },
        },
        success(res) {
          res.eventChannel.emit("createOrder", goods);
        },
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  padding-bottom: 134upx;

  /* 空白页 */
  .empty {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-bottom: 100upx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;

    image {
      width: 240upx;
      height: 160upx;
      margin-bottom: 30upx;
    }

    .empty-tips {
      display: flex;
      font-size: $font-sm + 2upx;
      color: $font-color-disabled;

      .navigator {
        color: $uni-color-primary;
        margin-left: 16upx;
      }
    }
  }
}

/* 购物车列表项 */
.cart-item {
  display: flex;
  position: relative;
  padding: 30upx 40upx;

  .image-wrapper {
    width: 230upx;
    height: 230upx;
    flex-shrink: 0;
    position: relative;

    image {
      border-radius: 8upx;
      opacity: 1;
    }
  }

  .checkbox {
    position: absolute;
    left: -16upx;
    top: -16upx;
    z-index: 8;
    font-size: 44upx;
    line-height: 1;
    padding: 4upx;
    color: $font-color-disabled;
    background: #fff;
    border-radius: 50px;
  }

  .item-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    position: relative;
    padding-left: 30upx;

    .title,
    .price {
      font-size: $font-base + 2upx;
      color: $font-color-dark;
      height: 40upx;
      line-height: 40upx;
    }

    .attr {
      font-size: $font-sm + 2upx;
      color: $font-color-light;
      height: 50upx;
      line-height: 50upx;
    }

    .price {
      height: 50upx;
      line-height: 50upx;
    }
  }

  .del-btn {
    padding: 4upx 10upx;
    font-size: 34upx;
    height: 50upx;
    color: $font-color-light;
  }
}

/* 底部栏 */
.action-section {
  /* #ifdef H5 */
  margin-bottom: 100upx;
  /* #endif */
  position: fixed;
  left: 30upx;
  bottom: 30upx;
  z-index: 95;
  display: flex;
  align-items: center;
  width: 690upx;
  height: 100upx;
  padding: 0 30upx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
  border-radius: 16upx;

  .checkbox {
    height: 52upx;
    position: relative;

    image {
      width: 52upx;
      height: 100%;
      position: relative;
      z-index: 5;
    }
  }

  .clear-btn {
    position: absolute;
    left: 26upx;
    top: 0;
    z-index: 4;
    width: 0;
    height: 52upx;
    line-height: 52upx;
    padding-left: 38upx;
    font-size: $font-base;
    color: #fff;
    background: $font-color-disabled;
    border-radius: 0 50px 50px 0;
    opacity: 0;
    transition: 0.2s;

    &.show {
      opacity: 1;
      width: 120upx;
    }
  }

  .total-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
    padding-right: 40upx;

    .price {
      font-size: $font-lg;
      color: $font-color-dark;
    }

    .coupon {
      font-size: $font-sm;
      color: $font-color-light;

      text {
        color: $font-color-dark;
      }
    }
  }

  .confirm-btn {
    padding: 0 38upx;
    margin: 0;
    border-radius: 100px;
    height: 76upx;
    line-height: 76upx;
    font-size: $font-base + 2upx;
    background: $uni-color-primary;
    box-shadow: 1px 2px 5px rgba(60, 217, 144, 0.72);
  }
}

/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
  color: $uni-color-primary;
}
</style>
