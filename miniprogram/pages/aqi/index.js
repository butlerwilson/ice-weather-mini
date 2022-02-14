import { formatTime } from '../../utils/time';
import { getColorByAqi } from '../../utils/weather/aqi';
import getAqiDesc from './getAqiDesc';

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
    options: {},
    isOpen: false,
    color: '',
    desc: [],
  },
  onLoad(option) {
    const { navHeight, statusBarHeight } = app.globalData;

    let e = JSON.parse(option.obj);

    let pubTime = formatTime(new Date(e.pubTime)),
      category = e.category,
      aqi = e.aqi,
      percentage = e.aqi / 500;

    let pollutions = [
      { name: 'PM2.5', unit: 'μg/m³', value: e.pm2p5, max: 500 },
      { name: 'PM10', unit: 'μg/m³', value: e.pm10, max: 600 },
      { name: 'NO₂', unit: 'μg/m³', value: e.no2, max: 3840 },
      { name: 'SO₂', unit: 'μg/m³', value: e.so2, max: 800 },
      { name: 'O₃', unit: 'μg/m³', value: e.o3, max: 1200 },
      { name: 'CO', unit: 'mg/m³', value: e.co, max: 150 },
    ];

    let options = {
      data: {
        value: aqi,
        max: 500,
        itemStyle: {
          ...getColorByAqi(aqi),
        },
        sub: {
          value: category,
        },
      },
    };

    // 获取 aqi 介绍
    const { color, desc } = getAqiDesc();

    this.setData({
      pubTime,
      category,
      aqi,
      percentage,
      pollutions,
      options,
      paddingTop: navHeight + statusBarHeight,
      color,
      desc,
    });
  },
  clickLeftIcon() {
    wx.navigateBack({
      delta: 1,
    });
  },
  popTip() {
    // 打开抽屉
    this.setData({ isOpen: true });
  },
});
