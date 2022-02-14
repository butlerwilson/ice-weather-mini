import { formatTimeToHourAndMinute } from '../../utils/time';
import { getColorByAqi } from '../../utils/weather/aqi';
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
    const { activeColor } = getColorByAqi(20);

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
          data: [8, 10, 9, 5, 5, 7],
          smooth: true,
          label: {
            show: true,
            formatter: '{d}°',
            position: 'top',
          },
          lineStyle: {
            width: 3,
            color: '#FEB692',
            backgroundColor: 'rgba(234,84,85,0.4)',
          },
          dots: {
            color: '#EA5455',
          },
        },
        {
          data: temp,
          smooth: true,
          label: {
            show: true,
            formatter: '{d}°',
            position: 'bottom',
          },
          lineStyle: {
            width: 3,
            color: '#ABDCFF',
            backgroundColor: 'rgba(171,220,255,0.9)',
          },
          dots: {
            color: '#0396FF',
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
    console.log(aqiData);
    wx.navigateTo({
      url: `../aqi/index?obj=${aqiData}`,
    });
  },
});
