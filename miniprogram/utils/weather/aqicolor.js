export default class AqiColor {
  //   优
  static Excellent = {
    activeColor: '#56B37F',
    GradientColor: '#c0e674',
  };

  //   良
  static Good = {
    activeColor: '#FCFF00',
    GradientColor: '#FFA8A8',
  };

  //   轻度污染
  static LightlyPollution = {
    activeColor: '#FEC163',
    GradientColor: '#DE4313',
  };

  //   中度污染
  static ModeratePollution = {
    activeColor: '#FFAA85',
    GradientColor: '#B3315F',
  };

  //   中度污染
  static HeavyPollution = {
    activeColor: '#EE9AE5',
    GradientColor: '#5961F9',
  };

  //   严重污染
  static SeriousPollution = {
    activeColor: '#F05F57',
    GradientColor: '#360940',
  };

  // 根据 aqi 指数获取值
  static getColorByAqi(e) {
    const aqi = parseFloat(e);
    if (aqi >= 0 && aqi <= 50) {
      return AqiColor.Excellent;
    } else if (aqi > 50 && aqi <= 100) {
      return AqiColor.Good;
    } else if (aqi > 100 && aqi <= 150) {
      return AqiColor.LightlyPollution;
    } else if (aqi > 150 && aqi <= 200) {
      return AqiColor.ModeratePollution;
    } else if (aqi > 200 && aqi <= 300) {
      return AqiColor.HeavyPollution;
    } else {
      return AqiColor.SeriousPollution;
    }
  }
}
