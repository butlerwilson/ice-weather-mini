const app = getApp();

Component({
  properties: {
    navLeftIcon: String,
    navRightIcon: String,
    subTitle: String,
    navTitle: String,
    textColor: {
      type: String,
      value: '#fff',
    },
  },
  data: {
    navHeight: 0,
    statusBarHeight: 0,
  },

  lifetimes: {
    attached() {
      const { navHeight, statusBarHeight } = app.globalData;
      this.setData({ navHeight, statusBarHeight });
    },
  },

  methods: {
    clickLeftIcon() {
      // 导航栏按钮点击事件
      this.triggerEvent('clickLeftIcon');
    },
    clickRightIcon() {
      // 导航栏按钮点击事件
      this.triggerEvent('clickRightIcon');
    },
  },
});
