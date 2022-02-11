// 保存天气数据的类
class weather {
  constructor() {
    this.sunTime = {};
    this.moonTime = {};
    this.aqi = {};
    this.current = {};
  }
  setSunTime({ sunrise, sunset }) {
    this.sunTime = { sunrise, sunset };
  }

  setMoonTime({ moonrise, moonset, moonPhase }) {
    this.moonTime = { moonrise, moonset, moonPhase };
  }

  setAqi({ updateTime, co, no, no2, o3, so2, pm2p5, pm10, nh3 }) {
    this.aqi = {
      updateTime, // 数据观测时间
      components: [
        { name: 'PM2.5', unit: 'μg/m³', value: pm2p5 },
        { name: 'PM10', unit: 'μg/m³', value: pm10 },
        { name: 'NO₂', unit: 'μg/m³', value: no2 },
        { name: 'SO₂', unit: 'μg/m³', value: so2 },
        { name: 'O₃', unit: 'μg/m³', value: o3 },
        { name: 'CO', unit: 'mg/m³', value: co },
        { name: 'NO', unit: 'μg/m³', value: no },
        { name: 'NH₃', unit: 'μg/m³', value: nh3 },
      ],
    };
  }

  setCurrent({
    updateTime,
    temp,
    feelsLike,
    icon,
    text,
    wind360,
    windDir,
    windScale,
    windSpeed,
    humidity,
    precip,
    pressure,
    vis,
    cloud,
    dew,
  }) {
    // "dt":1644314708
    // "sunrise":1644275510
    // "sunset":1644316441
    // "temp":293.9
    // "feels_like":294.38
    // "pressure":1014
    // "humidity":90
    // "dew_point":292.2
    // "uvi":0
    // "clouds":95
    // "visibility":10000
    // "wind_speed":7.22
    // "wind_deg":80
    // "wind_gust":11.43
    // "weather":[
    // 0:{
    // "id":804
    // "main":"Clouds"
    // "description":"阴，多云"
    // "icon":"04d"
    // }
    // ]
  }
}
