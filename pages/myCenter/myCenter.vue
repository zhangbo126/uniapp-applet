<template>
  <view class="container">
    <view class="user-section">
      <image class="bg" src="/static/user-bg.jpg" />
      <view class="user-info-box">
        <view class="portrait-box">
          <image class="portrait" :src="avatars" />
        </view>
        <view v-if="userInfo.token">
          <text class="username">{{ userInfo.userName }}</text>
        </view>
        <view class="info-box" v-else>
          <text class="username">{{ "游客" }}</text>
          <text class="username" @click="onLogin">/登录</text>
        </view>
      </view>
      <view class="vip-card-box"></view>
    </view>

    <view
      class="cover-container"
      :style="[
        {
          transform: coverTransform,
          transition: coverTransition,
        },
      ]"
      @touchstart="coverTouchstart"
      @touchmove="coverTouchmove"
      @touchend="coverTouchend"
    >
      <image class="arc" src="/static/arc.png" />
      <view class="tj-sction">
        <view class="tj-item">
          <text class="num">128.8</text>
          <text>余额</text>
        </view>
        <view class="tj-item">
          <text class="num">0</text>
          <text>优惠券</text>
        </view>
        <view class="tj-item">
          <text class="num">20</text>
          <text>积分</text>
        </view>
      </view>
      <!-- 订单 -->
      <view class="order-section">
        <view
          class="order-item"
          @click="navTo('/pages/orderList/orderList')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-shouye"></text>
          <text>全部订单</text>
        </view>
        <view
          class="order-item"
          @click="navTo('/pages/orderList/orderList?status=1')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-daifukuan"></text>
          <text>待付款</text>
        </view>
        <view
          class="order-item"
          @click="navTo('/pages/orderList/orderList?status=2')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-yishouhuo"></text>
          <text>待收货</text>
        </view>
        <view
          class="order-item"
          @click="navTo('/pages/orderList/orderList?status=4')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-shouhoutuikuan"></text>
          <text>已取消</text>
        </view>
      </view>
      <!-- 浏览历史 -->
      <view class="history-section icon">
        <view class="sec-header">
          <text class="yticon icon-lishijilu"></text>
          <text>浏览历史</text>
        </view>
        <scroll-view scroll-x class="h-list">
          <view class="h-box">
            <view v-for="history in historyList" :key="history._id">
              <image
                @click="navTo(`/pages/goodsDetail/goodsDetail?id=${history._id}`)"
                :src="history.imageFilePath"
                mode="aspectFill"
              />
            </view>
          </view>
        </scroll-view>
        <list-cell
          icon="icon-iconfontweixin"
          iconColor="#e07472"
          title="我的钱包"
          tips="您的会员还有3天过期"
        ></list-cell>
        <list-cell
          icon="icon-dizhi"
          iconColor="#5fcda2"
          title="地址管理"
          @eventClick="navTo('/pages/address/address')"
        ></list-cell>
        <list-cell
          icon="icon-shezhi1"
          iconColor="#e07472"
          title="设置"
          border
          @eventClick="navTo('/pages/set/set')"
        ></list-cell>
      </view>
    </view>
  </view>
</template>
<script>
import listCell from "@/components/mix-list-cell";
import { wxLogin } from "@/api/user";
import { mapState } from "vuex";
import { USER_TOKEN } from "@/config/constant";
let startY = 0,
  moveY = 0,
  pageAtTop = true;
export default {
  components: {
    listCell,
  },
  data() {
    return {
      coverTransform: "translateY(0px)",
      coverTransition: "0s",
      moving: false,
      historyList: [],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.login.userInfo,
    }),
    avatars() {
      const { token, avatarUrl } = this.userInfo;
      return token ? avatarUrl : "/static/missing-face.png";
    },
  },
  onShow() {
    this.historyList = uni.getStorageSync("BROWSE_HISTORY") || [];
    this.historyList.forEach((v) => {
      v.imageFilePath = v.designSketch[0];
    });
  },
  // #ifndef MP
  onNavigationBarButtonTap(e) {
    const index = e.index;
    if (index === 0) {
      this.navTo("/pages/set/set");
    } else if (index === 1) {
      // #ifdef APP-PLUS
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const currentWebview = page.$getAppWebview();
      currentWebview.hideTitleNViewButtonRedDot({
        index,
      });
      // #endif
      uni.navigateTo({
        url: "/pages/notice/notice",
      });
    }
  },
  // #endif

  methods: {
    async onLogin() {
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
    /**
     * 统一跳转接口,拦截未登录路由
     * navigator标签现在默认没有转场动画，所以用view
     */
    navTo(url) {
      if (!this.userInfo.token) {
        url = "/pages/loginPage/login";
      }
      uni.navigateTo({ url });
    },
    coverTouchstart(e) {
      if (pageAtTop === false) {
        return;
      }
      this.coverTransition = "transform .1s linear";
      startY = e.touches[0].clientY;
    },
    coverTouchmove(e) {
      moveY = e.touches[0].clientY;
      let moveDistance = moveY - startY;
      if (moveDistance < 0) {
        this.moving = false;
        return;
      }
      this.moving = true;
      if (moveDistance >= 80 && moveDistance < 100) {
        moveDistance = 80;
      }

      if (moveDistance > 0 && moveDistance <= 80) {
        this.coverTransform = `translateY(${moveDistance}px)`;
      }
    },
    coverTouchend() {
      if (this.moving === false) {
        return;
      }
      this.moving = false;
      this.coverTransition = "transform 0.3s cubic-bezier(.21,1.93,.53,.64)";
      this.coverTransform = "translateY(0px)";
    },
  },
};
</script>
<style lang="scss">
%flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

%section {
  display: flex;
  justify-content: space-around;
  align-content: center;
  background: #fff;
  border-radius: 10upx;
}

.user-section {
  height: 520upx;
  padding: 100upx 30upx 0;
  position: relative;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(1px);
    opacity: 0.7;
  }
}

.user-info-box {
  height: 180upx;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;

  .portrait {
    width: 130upx;
    height: 130upx;
    border: 5upx solid #fff;
    border-radius: 50%;
  }

  .username {
    font-size: $font-lg + 6upx;
    color: $font-color-dark;
    margin-left: 20upx;
  }
}

.vip-card-box {
  display: flex;
  flex-direction: column;
  color: #f7d680;
  height: 240upx;
  background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  border-radius: 16upx 16upx 0 0;
  overflow: hidden;
  position: relative;
  padding: 20upx 24upx;

  .card-bg {
    position: absolute;
    top: 20upx;
    right: 0;
    width: 380upx;
    height: 260upx;
  }

  .b-btn {
    position: absolute;
    right: 20upx;
    top: 16upx;
    width: 132upx;
    height: 40upx;
    text-align: center;
    line-height: 40upx;
    font-size: 22upx;
    color: #36343c;
    border-radius: 20px;
    background: linear-gradient(left, #f9e6af, #ffd465);
    z-index: 1;
  }

  .tit {
    font-size: $font-base + 2upx;
    color: #f7d680;
    margin-bottom: 28upx;

    .yticon {
      color: #f6e5a3;
      margin-right: 16upx;
    }
  }

  .e-b {
    font-size: $font-sm;
    color: #d8cba9;
    margin-top: 10upx;
  }
}

.cover-container {
  background: $page-color-base;
  margin-top: -150upx;
  padding: 0 30upx;
  position: relative;
  background: #f5f5f5;
  padding-bottom: 20upx;

  .arc {
    position: absolute;
    left: 0;
    top: -34upx;
    width: 100%;
    height: 36upx;
  }
}

.tj-sction {
  @extend %section;

  .tj-item {
    @extend %flex-center;
    flex-direction: column;
    height: 140upx;
    font-size: $font-sm;
    color: #75787d;
  }

  .num {
    font-size: $font-lg;
    color: $font-color-dark;
    margin-bottom: 8upx;
  }
}

.order-section {
  @extend %section;
  padding: 28upx 0;
  margin-top: 20upx;

  .order-item {
    @extend %flex-center;
    width: 120upx;
    height: 120upx;
    border-radius: 10upx;
    font-size: $font-sm;
    color: $font-color-dark;
  }

  .yticon {
    font-size: 48upx;
    margin-bottom: 18upx;
    color: #43fa86;
  }

  .icon-shouhoutuikuan {
    font-size: 44upx;
  }
}

.history-section {
  padding: 30upx 0 0;
  margin-top: 20upx;
  background: #fff;
  border-radius: 10upx;

  .sec-header {
    display: flex;
    align-items: center;
    font-size: $font-base;
    color: $font-color-dark;
    line-height: 40upx;
    margin-left: 30upx;

    .yticon {
      font-size: 44upx;
      color: #5eba8f;
      margin-right: 16upx;
      line-height: 40upx;
    }
  }

  .h-list {
    white-space: nowrap;
    padding: 30upx 30upx 0;

    .h-box {
      display: flex;
    }

    image {
      display: inline-block;
      width: 160upx;
      height: 160upx;
      margin-right: 20upx;
      border-radius: 10upx;
    }
  }
}
</style>
