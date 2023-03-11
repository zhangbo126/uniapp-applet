<template>
  <div class="register">
    <u-form :model="form" ref="uForm" :rule="rules">
      <u-form-item :label-width="140" label="账号" prop="userAccount">
        <u-input placeholder="请输入账号" v-model="form.userAccount" />
      </u-form-item>
      <u-form-item :label-width="140" label="联系方式" prop="phone">
        <u-input placeholder="请输入联系方式" type="number" v-model="form.phone" />
      </u-form-item>
      <u-form-item :label-width="140" label="密码" prop="passWord">
        <u-input placeholder="请输入密码" type="password" v-model="form.passWord" />
      </u-form-item>
      <u-form-item :label-width="140" label="确认密码" prop="okPass">
        <u-input v-model="form.okPass" type="password" placeholder="请输入确认密码" />
      </u-form-item>
      <u-form-item label :border-bottom="false">
        <u-button type="success" :style="{width:'100%'}" @click="submit">注册</u-button>
      </u-form-item>
    </u-form>
  </div>
</template>

<script>
import { registerAccount } from "@/api/user.js";

const rules = {
  userAccount: [
    {
      required: true,
      message: "请输入",
      trigger: "blur,change"
    },
    {
      max: 10,
      min: 2,
      message: "账号名称2-10个字符",
      trigger: "change,blur"
    }
  ],
  phone: [
    {
      required: true,
      message: "请输入",
      trigger: "blur,change"
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确的联系方式",
      trigger: "change,blur"
    }
  ],
  passWord: [
    {
      required: true,
      message: "请输入",
      trigger: "blur,change"
    },
    {
      max: 18,
      min: 8,
      message: "8-18位不含特殊字符的数字、字母组合",
      trigger: "change,blur"
    }
  ],
  okPass: [
    {
      required: true,
      message: "请输入",
      trigger: "blur,change"
    }
  ]
};
export default {
  data() {
    return {
      rules,
      form: {
        userAccount: "",
        phone: "",
        passWord: "",
        okPass: ""
      },
      registerOk: false
    };
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    submit() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          if (this.form.okPass != this.form.passWord) {
            return uni.showToast({
              title: "密码不一致请确认输入",
              icon: "none"
            });
          }

          registerAccount(this.form).then(res => {
            if (res.code == 1) {
              uni.showToast({
                title: "注册成功",
                icon: "none"
              });
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1
                });
              }, 1500);
            } else {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
            }
          });
        } else {
          console.log("验证失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  padding: 0px 20px;
}
</style>
