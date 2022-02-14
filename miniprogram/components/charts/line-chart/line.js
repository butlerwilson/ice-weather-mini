import { Canvas } from '../canvas';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Line extends Canvas {
  constructor(chart) {
    super(chart);
  }

  /**
   * 初始化图表
   * @param {Object} option
   * option = {
   *    textStyle: {
   *       color: '#fff',
   *       fontSize: '10px',
   *       fontFamily: 'Microsoft YaHei',
   *       textAlign: 'center',
   *    },
   *    series: [
   *      {
   *        data: [820, 932, 901, 934, 1290, 1330, 1320],
   *        smooth: true,
   *        label: {
   *           show: true,
   *           formatter: '{d}°',
   *           position: 'top',
   *        },
   *        lineStyle: {
   *           width: 3,
   *           color: '#abdcffa',
   *           backgroundColor: 'rgba(171,220,255,0.9)',
   *        },
   *      }, { .. }
   *    ]
   * };
   */
  init(options) {
    this.option = options;
    const series = options.series;

    let data = [],
      maxLength = 0;
    series.forEach(el => {
      if (el.data instanceof Array) {
        data.push(el.data);

        // 获取每组数据长度最大的那个长度
        if (maxLength < el.data.length) {
          maxLength = el.data.length;
        }
      }
    });

    this.Max = Math.max(...data.flat()); // 最大值
    this.Min = Math.min(...data.flat()); // 最小值

    // 把 canvas 的宽度, 高度按一定规则平分
    this.startX = this.width / (maxLength * 2); // 起始点的横坐标 X
    this.baseY = this.height * 0.8; // 基线纵坐标 Y
    this.diffX = this.width / maxLength; // 每个元素的宽度差
    this.diffY = (this.height * 0.6) / (this.Max - this.Min); // 高度预留 0.2 写标签

    const textStyle = options.textStyle;
    this.ctx.textAlign = textStyle?.textAlign || 'center';
    this.ctx.font = `${textStyle?.fontSize || '14px'} ${
      textStyle?.fontFamily || 'monospace'
    }`;

    // 开始绘图
    series.forEach(el => {
      if (el.data instanceof Array) {
        if (el.smooth) {
          // 曲线图
          const path = this.createBezierLine(el);
          this.drawLine(path, el);
        } else {
          // 折线图
          const path = this.createBrokenLine(el);
          this.drawLine(path, el);
        }
      }
    });
  }

  // 绘制
  drawLine(path, el) {
    const { data, label, lineStyle } = el;

    this.drawBackground(path, el); // 背景

    this.ctx.beginPath();

    this.ctx.lineWidth = lineStyle?.width || 3;
    this.ctx.strokeStyle = lineStyle?.color || '#ABDCFF';

    this.ctx.stroke(path);

    this.drawLabel(data, label); // 标签
    this.drawDots(data, el); // 小圆点
  }

  // 绘制标签
  drawLabel(data, label) {
    this.ctx.fillStyle = '#000'; // 标签默认黑色

    let position; // 标签位置
    if (label?.position === 'top' || typeof label?.position === 'undefined') {
      position = 10;
    } else if (label?.position === 'bottom') {
      position = -parseInt(/\d*/g.exec(this.ctx.font)[0]) - 2;
    }

    if (label?.show && label?.formatter) {
      // 存在 formatter 时
      data.forEach((e, i) => {
        const x = this.startX + this.diffX * i,
          y = this.baseY - (e - this.Min) * this.diffY;

        this.ctx.fillText(
          label.formatter.replace(/\{d\}/i, e),
          x,
          y - position
        );
      });
    } else if (label?.show) {
      // 不存在 formmater 时
      data.forEach((e, i) => {
        const x = this.startX + this.diffX * i,
          y = this.baseY - (e - this.Min) * this.diffY;

        this.ctx.fillText(e, x, y - position);
      });
    }
  }

  // 画折线图小圆点
  drawDots(data, el) {
    const { dots } = el;
    this.ctx.beginPath();

    data.forEach((e, i) => {
      const x = this.startX + this.diffX * i,
        y = this.baseY - (e - this.Min) * this.diffY;

      this.ctx.moveTo(x, y);
      this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
    });
    this.ctx.fillStyle = dots?.color || '#0396FF';
    this.ctx.fill();
  }

  // 画折线图背景
  drawBackground(path, el) {
    const { lineStyle } = el;

    if (typeof lineStyle?.backgroundColor !== 'undefined') {
      const { data } = el;
      const path_ = this.canvas.createPath2D(path);

      path_.lineTo(this.startX + (data.length - 1) * this.diffX, this.baseY); // 基线终点
      path_.lineTo(this.startX, this.baseY); // 基线起点

      const lingrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
      lingrad.addColorStop(0, lineStyle.backgroundColor);
      lingrad.addColorStop(1, 'rgba(255,255,255,0)');
      this.ctx.fillStyle = lingrad;

      this.ctx.fill(path_);
    }
  }

  /**
   * 计算当前点的贝塞尔曲线控制点
   * @param {Point} previousPoint: 前一个点
   * @param {Point} currentPoint: 当前点
   * @param {Point} nextPoint1: 下一个点
   * @param {Point} nextPoint2: 下下个点
   * @param {Number} scale: 系数
   */
  calcBezierControlPoints(
    previousPoint,
    currentPoint,
    nextPoint1,
    nextPoint2,
    scale = 0.25
  ) {
    let x = currentPoint.x + scale * (nextPoint1.x - previousPoint.x);
    let y = currentPoint.y + scale * (nextPoint1.y - previousPoint.y);

    const controlPointA = new Point(x, y); // 控制点 A

    x = nextPoint1.x - scale * (nextPoint2.x - currentPoint.x);
    y = nextPoint1.y - scale * (nextPoint2.y - currentPoint.y);

    const controlPointB = new Point(x, y);

    return { controlPointA, controlPointB };
  }

  /**
   * 创建贝塞尔曲线路径
   * @param {*} ctx
   * @param {*} data
   * @param {*} options
   */
  createBezierLine(el) {
    const { data } = el;
    const path = this.canvas.createPath2D();

    const { startX, baseY, Min, diffY, diffX } = this;

    path.moveTo(this.startX, this.baseY - (data[0] - this.Min) * this.diffY);

    data.forEach((e, i) => {
      let curPoint, prePoint, nextPoint1, nextPoint2, x, y;

      // 当前点
      x = startX + diffX * i;
      y = baseY - (e - Min) * diffY;
      curPoint = new Point(x, y);

      // 前一个点
      x = startX + diffX * (i - 1);
      y = baseY - (data[i - 1] - Min) * diffY;
      prePoint = new Point(x, y);

      // 下一个点
      x = startX + diffX * (i + 1);
      y = baseY - (data[i + 1] - Min) * diffY;
      nextPoint1 = new Point(x, y);

      // 下下个点
      x = startX + diffX * (i + 2);
      y = baseY - (data[i + 2] - Min) * diffY;
      nextPoint2 = new Point(x, y);

      if (i === 0) {
        // 如果是第一个点, 则前一个点用当前点代替
        prePoint = curPoint;
      } else if (i === data.length - 2) {
        // 如果是倒数第二个点, 则下下个点用下一个点代替
        nextPoint2 = nextPoint1;
      } else if (i === data.length - 1) {
        // 最后一个点直接退出
        return;
      }

      const { controlPointA, controlPointB } = this.calcBezierControlPoints(
        prePoint,
        curPoint,
        nextPoint1,
        nextPoint2
      );

      path.bezierCurveTo(
        controlPointA.x,
        controlPointA.y,
        controlPointB.x,
        controlPointB.y,
        nextPoint1.x,
        nextPoint1.y
      );
    });

    return path;
  }

  // 创建折线路径
  createBrokenLine(el) {
    const { data } = el;
    const path = this.canvas.createPath2D();
    data.forEach((e, i) => {
      const x = this.startX + this.diffX * i,
        y = this.baseY - (e - this.Min) * this.diffY;

      path.lineTo(x, y);
    });

    return path;
  }
}
