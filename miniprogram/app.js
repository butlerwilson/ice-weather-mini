import qqMap from './utils/location/qqMap/qqMap'; // 地图实例
import qweather from './utils/weather/qweather'; // 和风天气实例
import Geo from './utils/location/Geo'; // 和风天气 Geo 实例
import openWeather from './utils/weather/openweather';
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
      openWeather,
      navHeight,
      qweather,
      qqMap,
      Geo,
    };
  },
});
