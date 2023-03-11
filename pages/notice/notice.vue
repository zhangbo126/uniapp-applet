<template>
  <view>
    <view class="notice-item" v-for="notice in noticeList" :key="notice._id">
      <text class="time">{{notice.createTime}}</text>
      <view class="content">
        <text class="title">{{notice.name}}</text>
        <view class="img-wrapper">
          <image class="pic" :src="notice.imageFilePath" />
          <view v-if="notice.status==0" class="cover">活动结束</view>
        </view>
        <text class="introduce">{{notice.content}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getNoticeList } from "@/api/home.js";

export default {
  data() {
    return {
      queryInfo: {
        pageSize: 1000,
        pageNumber: 1,
        name: null,
        status: null,
        statusSort: -1
      },
      noticeList: []
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    getList() {
      getNoticeList(this.queryInfo).then(res => {
        if (res.code != 1) {
          return;
        }
        this.noticeList = res.data;
      });
    }
  }
};
</script>

<style lang='scss'>
page {
  background-color: #f7f7f7;
  padding-bottom: 30upx;
}

.notice-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80upx;
  padding-top: 10upx;
  font-size: 26upx;
  color: #7d7d7d;
}

.content {
  width: 710upx;
  padding: 0 24upx;
  background-color: #fff;
  border-radius: 4upx;
}

.title {
  display: flex;
  align-items: center;
  height: 90upx;
  font-size: 32upx;
  color: #303133;
}

.img-wrapper {
  width: 100%;
  height: 260upx;
  position: relative;
}

.pic {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 6upx;
}

.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 36upx;
  color: #fff;
}

.introduce {
  display: inline-block;
  padding: 16upx 0;
  font-size: 28upx;
  color: #606266;
  line-height: 38upx;
  display: -webkit-box;
  /**对象作为伸缩盒子模型展示**/
  -webkit-box-orient: vertical;
  /**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp: 3;
  /**显示的行数**/
  overflow: hidden;
  /**隐藏超出的内容**/
  height: 136rpx;
}

.bot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80upx;
  font-size: 24upx;
  color: #707070;
  position: relative;
}

.more-icon {
  font-size: 32upx;
}
</style>
