class OpenWeather {
  constructor(key) {
    this.appid = key; // 开放天气的 key
    this.baseUrl = 'http://api.openweathermap.org/data/2.5/';
    this.mock = true; // 默认使用 mock
    this.units = 'metric'; // 默认公制单位
    this.lang = 'zh_cn'; // 默认中文简体
  }

  // 简单封装的 wx.request
  wxRequest({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
      if (data.lat !== undefined || data.lon !== undefined) {
        wx.request({
          url: `${this.baseUrl}${url}`,
          method: method,
          data: Object.assign(
            {
              mock: this.mock,
              appid: this.appid,
              units: this.units,
              lang: this.lang,
            },
            data
          ),
          dataType: 'json',
          timeout: 5000,
          success(res) {
            switch (res.statusCode) {
              case 200:
                resolve(res.data);
              case 401:
                reject('无效的 key');
              case 400:
                reject(`无效参数, ${res.data.message}`);
              default:
                reject(`未知错误: ${res.data.message}`);
            }
          },
          fail(err) {
            reject(err);
          },
        });
      } else {
        reject('缺少位置信息');
      }
    });
  }

  /**
   * 设置 mock 状态
   * @param {Boolean} mock: 可选值, true && false
   */
  setMockStatus(mock) {
    if (typeof mock === 'boolean') {
      this.mock = mock;
    }
  }

  /**
   * 设置默认单位
   * @param {String} units: 可选值 metric, standard, imperial
   */
  setUnits(units) {
    this.units = units;
  }

  //  设置默认语言
  setLang(lang) {
    this.lang = lang;
  }

  // 获取全部天气数据
  getAllWeather(lat, lon) {
    return this.wxRequest({
      url: 'onecall',
      data: { lat, lon },
    });
  }

  /**
   * 获取历史天气数据(仅支持过去 5 天内天气)
   * @param {Number} lat
   * @param {Number} lon
   * @param {Number} dt: 时间戳
   * @returns
   */
  getHistoricWeather(lat, lon, dt) {
    return this.wxRequest({
      url: 'onecall/timemachine',
      data: { lat, lon, dt },
    });
  }

  // 获取当前天气
  getNowWeather(lat, lon) {
    return this.wxRequest({
      url: 'weather',
      data: { lat, lon },
    });
  }

  // 获取 7 天 3 小时预报
  getForcast(lat, lon) {
    return this.wxRequest({
      url: 'forecast',
      data: { lat, lon },
    });
  }
}

export default new OpenWeather('cf9051aa157ca10c610e95ae25c0e8f0');
