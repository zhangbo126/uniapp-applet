<script>
import { mapActions } from "vuex";
import { USER_TOKEN } from "@/config/constant";
export default {
  methods: {
    ...mapActions(["GetUserInfo"]),
  },
  onLaunch() {
    let token = uni.getStorageSync(USER_TOKEN) || null;
    if (token) {
      //获取登录用户信息
      this.GetUserInfo();
    }
  },
  onShow() {},
  onHide() {},
};
</script>

<style lang="scss">
@import "@/style/global.scss";
</style>
