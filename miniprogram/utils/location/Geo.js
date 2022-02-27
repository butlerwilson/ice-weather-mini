/**
 * 和风天气 Geo 城市信息查询
 */
class Geo {
  constructor(key) {
    this.key = key;
    this.baseUrl = 'https://geoapi.qweather.com/v2/';
    this.mock = true;
  }

  setMockStatus(mock) {
    if (typeof mock === 'boolean') {
      this.mock = mock;
    }
  }

  // 简单封装的 wx.request
  wxRequest({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.baseUrl}${url}`,
        method: method,
        data: {
          key: this.key,
          mock: this.mock,
          ...data,
        },
        dataType: 'json',
        timeout: 5000,
        success(res) {
          switch (res.data.code) {
            case '200':
              resolve(res.data);
              break;
            case '204':
              reject('所在地区暂无天气数据');
              break;
            case '404':
              reject('查询的数据或地区不存在');
            case '400':
              reject('参数错误');
              break;
            case '401':
              reject('认证错误, 请检查 key');
              break;
            case '403':
              reject('无权访问');
              break;
            case '429':
              reject('超过限定的 QPM');
              break;
            case '500':
              reject('接口异常');
              break;
            default:
              reject('其他状态码...');
          }
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  // 城市信息查询
  getCityList(location) {
    return this.wxRequest({
      url: 'city/lookup',
      data: { location },
    }).then(res => {
      return res.location;
    });
  }
}

export default new Geo('2a9ca6d81246499687e8401ff1d17463');
