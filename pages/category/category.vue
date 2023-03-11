<template>
  <view class="content">
    <scroll-view scroll-y class="left-aside">
      <view v-for="(item,index) in classList" :key="item.id" class="f-item b-b" :class="{active: index === navActiveIndex}" @click="()=>tabtap(item,index)">{{item.name}}</view>
    </scroll-view>
    <scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="navScrollTop">
      <view v-for="item in classList" :key="item._id" class="s-list" :id="'nav-'+item._id">
        <text class="s-item">{{item.name}}</text>
        <view class="t-list">
          <view @click="navToList(item._id)" v-if="c.partentId === item._id" class="t-item" v-for="c in item.children" :key="c._id">
            <image :src="c.logoFilePath" />
            <text>{{c.name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getClassTree } from "@/api/category.js";
export default {
  data() {
    return {
      classList: [],
      navScrollTop: 0,
      navActiveIndex: 0
    };
  },
  onLoad() {
    this.getClassTreeList();
  },

  methods: {
    getClassTreeList() {
      getClassTree()
        .then(res => {
          if (res.code != 1) {
            return;
          }
          this.classList = res.data;
        })
        .then(res => {
          this.calcSize();
        });
    },

    //一级分类点击
    tabtap(item, index) {
      this.navScrollTop = item.top;
      this.navActiveIndex = index;
    },
    //右侧栏滚动
    asideScroll(e) {
      let scrollTop = e.detail.scrollTop;
      let navs = this.classList.filter(item => item.top <= scrollTop).reverse();
      if (navs.length > 0) {
        const index = navs.length - 1;
        this.navActiveIndex = index;
      }
    },
    //计算右侧栏每个tab的高度等信息
    calcSize() {
      //页面初始化时计算元素距离顶部距离
      const query = uni.createSelectorQuery().in(this);
      this.classList.forEach(v => {
        query
          .select(`#nav-${v._id}`)
          .boundingClientRect(data => {
            v.top = data.top;
          })
          .exec();
      });
    },
    navToList(categoryId) {
      uni.navigateTo({
        url: `/pages/product/list?categoryId=${categoryId}`
      });
    }
  }
};
</script>

<style lang='scss'>
page,
.content {
  height: 100%;
  background-color: #f8f8f8;
}

.content {
  display: flex;
}

.left-aside {
  flex-shrink: 0;
  width: 200upx;
  height: 100%;
  background-color: #fff;
}

.f-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100upx;
  font-size: 28upx;
  color: $font-color-base;
  position: relative;

  &.active {
    color: $base-color;
    background: #f8f8f8;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 36upx;
      width: 8upx;
      background-color: $base-color;
      border-radius: 0 4px 4px 0;
      opacity: 0.8;
    }
  }
}

.right-aside {
  flex: 1;
  overflow: hidden;
  padding-left: 20upx;
}

.s-item {
  display: flex;
  align-items: center;
  height: 70upx;
  padding-top: 8upx;
  font-size: 28upx;
  color: $font-color-dark;
  font-weight: bold;
}

.t-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #fff;
  padding-top: 12upx;

  &:after {
    content: "";
    flex: 99;
    height: 0;
  }
}

.t-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 176upx;
  font-size: 26upx;
  color: #666;
  padding-bottom: 20upx;
  text-align: center;
  image {
    width: 140upx;
    height: 140upx;
  }

  text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 140rpx;
  }
}
</style>
