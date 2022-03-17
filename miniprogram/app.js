import qqMap from './utils/qqMap/qqMap'; // 腾讯地图
import qweather from './utils/weather/qweather'; // 和风天气
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
    const { navHeight, statusBarHeight, capsuleLeft } = getNavBarInfo();

    this.globalData = {
      statusBarHeight,
      capsuleLeft,
      navHeight,
      qweather,
      qqMap,
    };
  },
});
