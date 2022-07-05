module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      rootValue: (arg) => {
        // 处理的文件对象
        // px ——>rem
        // 动态设置
        // 如果我们自己写的样式 75
        // 如果是vant组件的样式37.5

        // 判断需要处理的样式37.5
        // 如果是返回37.5
        // 如果不是返回75
        // arg里面的file属性，为文件的路径
        return arg.file.includes("vant") ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
