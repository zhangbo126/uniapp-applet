<template>
  <view class="content">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentIndex === index }"
        @click="tabClick(index)"
        >{{ item.text }}</view
      >
    </view>
    <swiper
      :current="tabCurrentIndex"
      class="swiper-box"
      duration="300"
      @change="changeTab"
    >
      <swiper-item
        class="tab-content"
        v-for="(tabItem, tabIndex) in navList"
        :key="tabIndex"
      >
        <scroll-view class="list-scroll-content" scroll-y>
          <!-- 空白页 -->
          <u-empty  mode="order" v-if="orderList.length === 0"  icon="http://cdn.uviewui.com/uview/empty/order.png"></u-empty>
          <!-- 订单列表 -->
          <view v-for="(item, index) in orderList" :key="index" class="order-item">
            <view class="i-top b-b">
              <text class="time">{{ item.createTime }}</text>
              <text class="state" :style="{ color: item.stateTipColor }">{{
                item.status | statusMapFilter
              }}</text>
              <text
                v-if="[1, 4].includes(item.status)"
                class="del-btn yticon icon-iconfontshanchu1"
                @click="deleteOrder(item)"
              ></text>
            </view>
            <view class="goods-box-single">
              <image class="goods-img" :src="item.imageFilePath" mode="aspectFill" />
              <view class="right">
                <text class="title clamp">{{ item.skuName }}</text>
                <text class="attr-box">{{ item.goodsName }}</text>
                <text class="price">{{ item.price }}</text>
              </view>
            </view>
            <view class="price-box">
              共
              <text class="num">{{ item.num }}</text
              >件商品 实付款
              <text class="price">{{ item.num * item.price }}</text>
            </view>
            <view class="action-box b-t" v-if="item.status == 1">
              <button class="action-btn" @click="cancelOrder(item)">取消订单</button>
              <button class="action-btn recom" @click="goPay(item)">立即支付</button>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getOrderList, updateOrder, delOrder } from "@/api/user.js";
import { mapState } from "vuex";
const statusMap = {
  1: "待付款",
  2: "待收货",
  3: "待评价",
  4: "已取消",
};

const navList = [
  {
    state: 0,
    text: "全部",
    loadingType: "more",
  },
  {
    state: 1,
    text: "待付款",
    loadingType: "more",
  },
  {
    state: 2,
    text: "待收货",
    loadingType: "more",
  },
  {
    state: 3,
    text: "待评价",
    loadingType: "more",
  },
  {
    state: 4,
    text: "已取消",
    loadingType: "more",
  },
];

export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.login.userInfo,
    }),
  },
  data() {
    return {
      navList,
      orderList: [],
      pageInfo: {
        pageSize: 1000,
        pageNumber: 1,
        userId: null,
        status: undefined,
      },
      statusMap,
      tabCurrentIndex: 0,
    };
  },
  onLoad(options) {
    this.pageInfo.status = options.status;
    this.tabCurrentIndex = parseInt(options.status) || 0;
  },
  onShow(options) {
    this.pageInfo.userId = this.userInfo._id || uni.getStorageSync("USER_INFO")._id
    this.getList();
  },

  methods: {
    async getList() {
      const { data } = await getOrderList(this.pageInfo);
      this.orderList = data || [];
      this.orderList.forEach((v) => {
        v.imageFilePath = v.designSketch[0];
      });
    },
    //swiper 切换
    changeTab(e) {
      this.tabCurrentIndex = e.target.current;
      this.pageInfo.status = this.tabCurrentIndex == 0 ? undefined : this.tabCurrentIndex;
      this.getList();
    },
    //顶部tab点击
    tabClick(index) {
      this.tabCurrentIndex = index;
    },
    //删除订单
    async deleteOrder(item) {
      const [, e] = await uni.showModal({ content: "删除订单???" });
      if (e.confirm) {
        const { code } = await delOrder({ _id: item._id });
        if (code == 1) {
          this.getList();
        }
      }
    },
    //取消订单
    async cancelOrder(item) {
      const { code } = await updateOrder({ status: 4, id: item._id });
      if (code == 1) {
        this.$api.msg("取消成功");
        this.getList();
      }
    },
    goPay(item) {
      uni.redirectTo({
        url: `/pages/money/pay?money=${item.num * item.price}&orderIds=${JSON.stringify([
          item._id,
        ])}`,
      });
    },
  },
  filters: {
    statusMapFilter(type) {
      return statusMap[type];
    },
  },
};
</script>

<style lang="scss">
page,
.content {
  background: $page-color-base;
  height: 100%;
}

.swiper-box {
  height: calc(100% - 40px);
}

.list-scroll-content {
  height: 100%;
}

.navbar {
  display: flex;
  height: 40px;
  padding: 0 5px;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;

  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 15px;
    color: $font-color-dark;
    position: relative;

    &.current {
      color: $base-color;

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 44px;
        height: 0;
        border-bottom: 2px solid $base-color;
      }
    }
  }
}

.uni-swiper-item {
  height: auto;
}

.order-item {
  display: flex;
  flex-direction: column;
  padding-left: 30upx;
  background: #fff;
  margin-top: 16upx;

  .i-top {
    display: flex;
    align-items: center;
    height: 80upx;
    padding-right: 30upx;
    font-size: $font-base;
    color: $font-color-dark;
    position: relative;

    .time {
      flex: 1;
    }

    .state {
      color: $base-color;
    }

    .del-btn {
      padding: 10upx 0 10upx 36upx;
      font-size: $font-lg;
      color: $font-color-light;
      position: relative;

      &:after {
        content: "";
        width: 0;
        height: 30upx;
        border-left: 1px solid $border-color-dark;
        position: absolute;
        left: 20upx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  /* 多条商品 */
  .goods-box {
    height: 160upx;
    padding: 20upx 0;
    white-space: nowrap;

    .goods-item {
      width: 120upx;
      height: 120upx;
      display: inline-block;
      margin-right: 24upx;
    }

    .goods-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  /* 单条商品 */
  .goods-box-single {
    display: flex;
    padding: 20upx 0;

    .goods-img {
      display: block;
      width: 120upx;
      height: 120upx;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 30upx 0 24upx;
      overflow: hidden;

      .title {
        font-size: $font-base + 2upx;
        color: $font-color-dark;
        line-height: 1;
      }

      .attr-box {
        font-size: $font-sm + 2upx;
        color: $font-color-light;
        padding: 10upx 12upx;
      }

      .price {
        font-size: $font-base + 2upx;
        color: $font-color-dark;

        &:before {
          content: "￥";
          font-size: $font-sm;
          margin: 0 2upx 0 8upx;
        }
      }
    }
  }

  .price-box {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    padding: 20upx 30upx;
    font-size: $font-sm + 2upx;
    color: $font-color-light;

    .num {
      margin: 0 8upx;
      color: $font-color-dark;
    }

    .price {
      font-size: $font-lg;
      color: $font-color-dark;

      &:before {
        content: "￥";
        font-size: $font-sm;
        margin: 0 2upx 0 8upx;
      }
    }
  }

  .action-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100upx;
    position: relative;
    padding-right: 30upx;
  }

  .action-btn {
    width: 160upx;
    height: 60upx;
    margin: 0;
    margin-left: 24upx;
    padding: 0;
    text-align: center;
    line-height: 60upx;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;
    background: #fff;
    border-radius: 100px;

    &:after {
      border-radius: 100px;
    }

    &.recom {
      background: #fff9f9;
      color: $base-color;

      &:after {
        border-color: #56ffbc;
      }
    }
  }
}
@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
