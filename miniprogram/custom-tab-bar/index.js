Component({
  data: {
    selected: 0,
    color: "#707070",
    list: [
      {
        pagePath: "/pages/home/index",
        icon: "home",
        color: "yellow",
        text: "首页",
      },
      {
        pagePath: "/pages/like/index",
        icon: "like",
        color: "pink",
        text: "收藏",
      },
      {
        pagePath: "/pages/me/index",
        icon: "me",
        color: "teal",
        text: "我的",
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
    },
  },
});
