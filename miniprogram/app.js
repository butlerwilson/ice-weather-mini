import { getNavBarInfo } from '/utils/navInfo';
import './utils/time';

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      });
    }

    // 获取导航栏和状态栏高度
    const { navHeight, statusBarHeight } = getNavBarInfo();
    this.globalData = {
      navHeight,
      statusBarHeight,
    };
  },
});
