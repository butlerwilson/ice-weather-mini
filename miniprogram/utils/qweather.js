import { getDate } from "./time";

class Qweather {
  constructor(key) {
    this.key = key; // 和风天气的 key
    this.baseUrl = "https://devapi.qweather.com/v7/";
    this.mock = true; // 默认使用 mock
  }

  // 简单封装的 wx.request
  wxRequest({ url, method = "GET", data }) {
    return new Promise((resolve, reject) => {
      if (data.location !== undefined) {
        wx.request({
          url: `${this.baseUrl}${url}`,
          method: method,
          data: Object.assign(
            {
              mock: this.mock,
              key: this.key,
            },
            data
          ),
          dataType: "json",
          timeout: 5000,
          success(res) {
            switch (res.data.code) {
              case "200":
                resolve(res.data);
                break;
              case "204":
                reject("所在地区暂无天气数据");
                break;
              case "400":
                reject("参数错误");
                break;
              case "401":
                reject("认证错误, 请检查 key");
                break;
              case "403":
                reject("无权访问");
                break;
              case "404":
                reject("查询的数据或地区不存在");
              case "429":
                reject("超过限定的 QPM");
                break;
              case "500":
                reject("接口异常");
                break;
              default:
                reject("其他状态码...");
            }
          },
          fail(err) {
            reject(err);
          },
        });
      } else {
        reject("缺少位置信息");
      }
    });
  }

  // 设置 mock 状态
  setMockStatus(mock) {
    this.mock = mock;
  }

  // 获取 AQI 指数
  getAqi(location) {
    return this.wxRequest({
      url: "air/now",
      data: { location },
    }).then((res) => {
      return res.now;
    });
  }

  // 获取日出日落时间
  getSunTime(location, date) {
    return this.wxRequest({
      url: "astronomy/sun",
      data: { location, date: date || getDate() },
    }).then((res) => {
      return {
        sunrise: res.sunrise,
        sunset: res.sunset,
      };
    });
  }

  // 获取月升月落
  getMoonTime(location, date) {
    return this.wxRequest({
      url: "astronomy/moon",
      data: { location, date: date || getDate(30) },
    }).then((res) => {
      return {
        moonrise: res.moonrise,
        moonset: res.moonset,
        moonPhase: res.moonPhase,
      };
    });
  }

  // 获取灾害预警
  getDisasterWaring(location) {
    return this.wxRequest({
      url: "warning/now",
      data: { location },
    })
      .then((res) => {
        return res.warning;
      })
      .catch((err) => {
        return err;
      });
  }

  // 获取生活指数, 默认获取全部生活指数
  getLivingIndices(location, type = 0) {
    return this.wxRequest({
      url: "/indices/1d",
      data: { location, type },
    }).then((res) => {
      return res.warning;
    });
  }

  // 获取 2 小时降水
  getPrecipitationInTheNextTwoHours(location) {
    return this.wxRequest({
      url: "/minutely/5m",
      data: { location },
    }).then((res) => {
      return {
        summary: res.summary,
        minutely: res.minutely,
      };
    });
  }

  // 获取 24 小时天气预报
  getWeatherInTheNext24Hours(location) {
    return this.wxRequest({
      url: "weather/24h",
      data: { location },
    }).then((res) => {
      return res.hourly;
    });
  }

  // 获取未来 7 天天气预报
  getWeatherInTheNext7Days(location) {
    return this.wxRequest({
      url: "/weather/7d",
      data: { location },
    }).then((res) => {
      return res.daily;
    });
  }

  // 获取实时天气预报
  getNowWeather(location) {
    return this.wxRequest({
      url: "/weather/now",
      data: { location },
    }).then((res) => {
      return res.now;
    });
  }
}

export default new Qweather("43c8b7193529451bb1fa4f2ece6f39c2");
