import { formatTimeToHourAndMinute } from '../../utils/time';
import AqiColor from '../../utils/weather/aqicolor';

import hourly from './hourly'; // 模拟数据

const app = getApp();

Page({
  data: {
    city: '正在定位...',
    paddingTop: 0,
    exactLocation: '',
    temperature: '14°',
    condition: '小雨',
    feel: '13°',
    AQI: '优',
    AQIColor: '',
    temp: [],
    unit: '°',
    time: [],
    scrollWidth: 0,
    options: { series: [] },
  },
  onLoad() {
    const { navHeight, statusBarHeight } = app.globalData;
    const { activeColor } = AqiColor.getColorByAqi(20);

    let temp = [],
      time = [];

    hourly.forEach(e => {
      temp.push(e.temp);

      let t = new Date(e.fxTime);
      time.push(formatTimeToHourAndMinute(t));
    });

    let options = {
      textStyle: {
        color: '#000',
        fontSize: '13px',
        fontFamily: 'monospace',
        textAlign: 'center',
      },
      series: [
        {
          data: temp,
          smooth: true,
          label: {
            show: true,
            formatter: '{d}°',
          },
          lineStyle: {
            width: 3,
            color: '#0396FF',
            backgroundColor: 'rgba(171,220,255,0.9)',
          },
        },
      ],
    };

    this.setData({
      AQIColor: activeColor,
      paddingTop: navHeight + statusBarHeight,
      options,
      time,
    });

    wx.createSelectorQuery()
      .select('.hourly')
      .boundingClientRect(rect => {
        this.setData({
          scrollWidth: rect.right - rect.left,
        });
      })
      .exec();
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
