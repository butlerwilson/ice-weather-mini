Page({
  data: {
    color: '', // 预警颜色
    warn: '', // 预警
    desc: '', // 预警详细信息
  },

  onLoad(options) {
    const app = getApp();
    const { navHeight, statusBarHeight } = app.globalData;
    const paddingTop = navHeight + statusBarHeight;

    const uuid = options.uuid; // 获取上一页传过来天气对象的 uuid
    const index = options.index;
    const waring = app.globalData[uuid].warings[index];

    const color = waring.color;
    const warn = `${waring.typeName}${waring.level}预警`;
    const desc = waring.text;

    this.setData({ color, warn, desc, paddingTop });
  },

  back() {
    wx.navigateBack({
      delta: 1,
    });
  },
});
