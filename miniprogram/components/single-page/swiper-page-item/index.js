Component({
  properties: {
    name: String, // 标签名
    icon: String, // 标签图标
    key: String, // 标签键
    color: String, // 标签字体颜色
    bgColor: String, // 标签背景颜色
    navTitle: String, // 导航栏标题
    navIcon: String, // 导航栏图标
  },

  relations: {
    "../swiper-page/index": {
      type: "parent",
    },
  },
});
