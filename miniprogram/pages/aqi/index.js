import { formatTime } from '../../utils/time';
import  AqiColor  from '../../utils/weather/aqicolor';

const app = getApp();

Page({
  data: {
    paddingTop: 0,
    percentage: 0, // 空气质量百分比
    activeColor: '',
    GradientColor: '', // 渐变
    pubTime: '', // 信息发布时间
    category: '', // 空气质量等级
    aqi: '', // 空气质量指数
    pollutions: [], // 污染物
  },
  onLoad(option) {
    const { navHeight, statusBarHeight } = app.globalData;

    let e = JSON.parse(option.obj);

    let pubTime = formatTime(new Date(e.pubTime)),
      category = e.category,
      aqi = e.aqi,
      percentage = e.aqi / 500;

    let pollutions = [
      { name: 'PM2.5', unit: 'μg/m³', value: e.pm2p5 },
      { name: 'PM10', unit: 'μg/m³', value: e.pm10 },
      { name: 'NO₂', unit: 'μg/m³', value: e.no2 },
      { name: 'SO₂', unit: 'μg/m³', value: e.so2 },
      { name: 'O₃', unit: 'μg/m³', value: e.o3 },
      { name: 'CO', unit: 'mg/m³', value: e.co },
    ];

    this.setData({
      pubTime,
      category,
      aqi,
      percentage,
      pollutions,
      ...AqiColor.getColorByAqi(aqi),
      paddingTop: navHeight + statusBarHeight,
    });
  },
  clickLeftIcon() {
    wx.navigateBack({
      delta: 1,
    });
  },
});
