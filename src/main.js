import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
// vant注册
import Vant from "vant";
Vue.use(Vant);
// 引入vant样式
import "vant/lib/index.less";
// 引入组件
import TouTiaoIcon from "@/components/TouTiaoIcon.vue";
// 全局注册
// 引用
import "amfe-flexible";
Vue.component("TouTiaoIcon", TouTiaoIcon);

import request from "@/utils/request.js";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
// rem的适配？
// 1.跟标签的font-size根据屏幕动态设置
// 2 样式里面单位 px全部换成rem
// 3 rem 》》跟标签的font-size
