export default class Waring {
  static Unknown = {
    color: '#fff',
  };

  //  蓝色预警
  static Minor = {
    color: '#66B1FF',
  };

  //  黄色预警
  static Moderate = {
    color: '#FDCC85',
  };

  //  橙色预警
  static Severe = {
    color: '#e67e22',
  };

  //  红色预警
  static Extreme = {
    color: '#f56c6c',
  };

  static getWaringColor(level) {
    switch (level) {
      case '蓝色':
        return Waring.Minor.color;
      case '黄色':
        return Waring.Moderate.color;
      case '橙色':
        return Waring.Severe.color;
      case '红色':
        return Waring.Extreme.color;
      default:
        return Waring.Unknown.color;
    }
  }
}
