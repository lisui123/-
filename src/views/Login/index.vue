<template>
  <div class="login-container">
    <van-nav-bar title="标题" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <TouTiaoIcon icon="shouji"></TouTiaoIcon>
        </template>
      </van-field>
      <!-- type: 指定输入框的类型 -->
      <!-- maxlength：指定输入的最大位数 -->
      <!-- required: 是否显示必填的* -->
      <van-field
        v-model="user.code"
        name="code"
        required
        type="number"
        maxlength="6"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #left-icon>
          <TouTiaoIcon icon="yanzhengma"></TouTiaoIcon>
        </template>
        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="5000"
            format=" ss s"
          />
          <van-button
            v-else
            @click="sendCode"
            :loading="isdisabled"
            native-type="button"
            class="send-sms-btn"
            size="small"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSend } from "@/api/user.js";
import TouTiaoIcon from "@/components/TouTiaoIcon.vue";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: { TouTiaoIcon },
  props: {},
  data() {
    return {
      isdisabled: false,
      isShowCountDown: false,
      user: {
        mobile: "13911111113",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只可以6位",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 倒计时组件的业务逻辑：
    // 页面初始化的时候1默认展示获取验证码按钮
    // 》》点击按钮之后 （表单校验通过）
    // 》》显示倒计时
    // 》》倒计时结束继续展示验证吗按钮
    async onSubmit() {
      // value自动从表单里面获取的值
      // 获取到的值是对象: key >> 表单的name值  value >>用户输入的值
      // await 后面写的是promise
      // 只有promise成功了的情况下才会继续执行

      // data数据满足接口文档的格式就可以
      // 如果捕获await的错误，有 try catch
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登陆成功");
      } catch (e) {
        console.log(e);
        Toast.success(e?.response?.data?.message || "服务器端错误");
      }
      // 调用登录接口
      // 表单的校验
      // {
      //   mobile: "123",
      //   code: "123",
      // }
      // console.log(values);
    },
    async sendCode() {
      // 通过传入表单的name值，决定校验那个表单（name: string | string[])
      // Promise: 异步的解决方案，解决了什么问题？ 回调地域>>链式调用形式>>每次then返回一个新的promise
      // async await >> 链式调用（不够优雅）>> 看起来是同步形式
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        // 如果接口请求的速度很慢
        // 在拿到验证请求之前，进行按钮的禁用，等拿到数据时在松开禁用
        // 无论这个数据请求成功或者失败
        this.isdisabled = true;
        // TODO：发送验证码请求
        // console.log("发送验证码中...");

        // 调用获取验证码接口
        await getSend(this.user.mobile);
        // 展示倒计时？
        this.isShowCountDown = true;
        // 获取成功以后进行提示
        this.$toast.success("发送验证码成功");
      } catch (e) {
        console.log(e);
        // 如果失败进行错误提示
        this.$toast.fail(e.response.data.message || "出错了");
        this.isShowCountDown = false;
      } finally {
        this.isdisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 180px;
    height: 50px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
