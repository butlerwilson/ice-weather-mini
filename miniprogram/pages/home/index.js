import openWeather from '../../utils/weather/openweather';
import qweather from '../../utils/weather/qweather';
import { formatTime } from '../../utils/time';
import AqiColor from '../../utils/weather/aqicolor';

Page({
  data: {
    city: '正在定位...',
    exactLocation: '',
    temperature: '14°',
    condition: '小雨',
    feel: '13°',
    AQI: '优',
    AQIColor: '',
  },
  onLoad() {
    qweather.getAllweather('110.32,20.03').then(res => {
      console.log(res);
    });

    const { activeColor } = AqiColor.getColorByAqi(20);
    this.setData({
      AQIColor: activeColor,
    });
  },
  clickLeftIcon() {
    wx.navigateTo({
      url: '../like/index',
    });
  },
  clickRightIcon() {
    wx.navigateTo({
      url: '../setting/index',
    });
  },
  navigateTo() {
    let e = {
      pubTime: '2022-02-04T21:00+08:00',
      aqi: '20',
      level: '1',
      category: '优',
      primary: 'NA',
      pm10: '20',
      pm2p5: '17',
      no2: '6',
      so2: '6',
      co: '0.8',
      o3: '57',
    };

    let aqiData = JSON.stringify(e);
    wx.navigateTo({
      url: `../aqi/index?obj=${aqiData}`,
    });
  },
});
