import qweather from '../../utils/weather/qweather';
import openWeather from '../../utils/weather/openweather';
import getRainConfig from './rain';
import Pollutions from '../aqi/pollutions';
import Waring from '../../utils/weather/waring';
import uuid from '../../utils/uuid';

const app = getApp();

Page({
  data: {
    navBgColor: 'transparent', // 导航栏颜色
    paddingTop: 0,
    city: '正在定位...', // 当前城市
    exactLocation: '', // 详细城市
    isReady: false, // 天气信息是否加载完毕
    average: 0, // 平均值
    deltaTemp: 0, // 温度最大最小值差
    unit: '°', // 温度单位
  },
  onLoad() {
    // 获取天气信息
    // wx.getLocation({
    //   type: 'wgs84',
    // })
    //   .then(res => {
    //     const latitude = res.latitude;
    //     const longitude = res.longitude;
    //     const location = `${longitude},${latitude}`;
    //     this.getQweather(location);
    //   })
    //   .catch(err => {
    //     console.log(`获取用户位置时出错, 原因: ${err.errMsg}`);
    //   });
    this.getQweather('110,20');

    // 获取状态栏高度
    const { navHeight, statusBarHeight } = app.globalData;

    this.setData({
      paddingTop: navHeight + statusBarHeight,
    });
  },
  getQweather(location) {
    // 获取天气
    // qweather.setMockStatus(false);
    qweather
      .getAllweather(location)
      .then(res => {
        const Weather = {}; // 天气对象

        // 当前天气
        const now = res.now;
        Weather.now = {
          detail: [
            // 一些比较重要的数据
            {
              name: '大气压强',
              value: now.pressure,
              unit: 'hPa',
            },
            {
              name: '相对湿度',
              value: now.humidity,
              unit: '%',
            },
            {
              name: '能见度',
              value: now.vis,
              unit: 'km',
            },
            {
              name: '风速',
              value: now.windSpeed,
              unit: 'km/h',
            },
          ],
          feelsLike: now.feelsLike, // 体感温度
          temperature: now.temp, // 温度
          desc: now.text, // 天气情况
        };

        // 空气质量
        const aqi = res.aqi;
        const pollutions = new Pollutions();
        pollutions.pm2p5.value = aqi.pm2p5;
        pollutions.pm10.value = aqi.pm10;
        pollutions.no2.value = aqi.no2;
        pollutions.so2.value = aqi.so2;
        pollutions.co.value = aqi.co;
        pollutions.o3.value = aqi.o3;

        Weather.aqi = {
          value: aqi.aqi,
          pubTime: new Date(aqi.pubTime).format('yyyy-MM-dd hh:mm:ss'),
          category: aqi.category,
          components: pollutions,
        };

        // 降水
        const minutely = res.precipitation.minutely;
        const prec = minutely.every(e => e.precip === '0.0');

        if (!prec) {
          // 如果存在降雨
          Weather.precipitation = res.precipitation;
          Weather.precipitation.options = getRainConfig(); // 获取降雨图配置
          const data = Weather.precipitation.options.series[0].data;

          Weather.precipitation.minutely.forEach(e => {
            const precip = parseFloat(e.precip); // 和风天气返回的是字符串
            e.precip = precip;
            data.push(precip); // 传入降雨数据
          });
        }

        // 逐小时
        Weather.hours = [...res.next24h];
        Weather.hours.forEach(hour => {
          hour.time = new Date(hour.fxTime).format('hh:mm');
        });

        // 逐日
        let temp = 0;
        const maxTemps = [],
          minTemps = [];
        Weather.days = [...res.next7days];
        Weather.days.forEach(day => {
          const date = new Date(day.fxDate);
          day.weekday = date.week(); // 星期
          day.day = date.format('M-dd'); // 日期

          temp += parseInt(day.tempMax) + parseInt(day.tempMin);

          maxTemps.push(day.tempMax);
          minTemps.push(day.tempMin);
        });

        const average = temp / (Weather.days.length * 2); // 温度平均值
        const tempMax = Math.max(...maxTemps);
        const tempMin = Math.min(...minTemps);
        const deltaTemp = tempMax - tempMin; // 最高温度与最低温度之差

        // 生活指数
        Weather.livingIndices = [...res.livingIndices];
        Weather.livingIndices.forEach(e => {
          e.name = e.name.replace(/指数/, '');
        });

        // 灾害预警
        Weather.warings = [...res.waring];
        Weather.warings.forEach(waring => {
          waring.color = Waring.getWaringColor(waring.level);
        });

        // 月亮
        Weather.moonTime = {
          moonRise: res.moonTime.moonRise, // 月出时间
          moonSet: res.moonTime.moonSet, // 月落时间
          moonPhase: res.moonTime.moonPhase, // 月相
          icon: res.moonTime.moonPhase[0].icon, // 月相图标
        };

        // 太阳
        Weather.sunTime = {
          sunRise: res.sunTime.sunRise, // 日出时间
          sunSet: res.sunTime.sunSet, // 日落时间
        };

        // 将天气对象绑定到 globalData 上去
        const key = uuid();
        app.globalData[key] = Weather;

        this.setData({
          average,
          deltaTemp,
          isReady: true,
          ...Weather,
          uuid: key, // 当前页面天气对象的 uuid
        });
      })
      .catch(err => {
        console.log(`天气请求时出现错误, 详情: ${err}`);
      });
  },
  setting() {
    wx.navigateTo({
      url: '../like/index',
    });
  },
  cites() {
    wx.navigateTo({
      url: '../setting/index',
    });
  },
  aqiPage() {
    wx.navigateTo({
      url: `../aqi/index?uuid=${this.data.uuid}`,
    });
  },
  waringPage(e) {
    const index = e.target.dataset.index;

    wx.navigateTo({
      url: `../warn/index?uuid=${this.data.uuid}&index=${index}`,
    });
  },
});
