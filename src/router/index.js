import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 路由懒加载
// 1000个页面（有可能看一个页面》》只把用户当前访问的页面返回给用户
// 第一种 直接引入登陆组件  同步加载路由（按需）
// 只要页面一刷新，所有的页面数据全部一次性加载
// import Login from '@/views/Login'
// 第二种 直接import（'路径'）路由的懒加载
// 访问到某个路由的时候再去加载在当前路由文件
const routes = [
  {
    path: "/Login",
    component: () => import("@/views/Login/index.vue"),
    name: "login",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
