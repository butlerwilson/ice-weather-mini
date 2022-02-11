Component({
  properties: {
    percentage: Number, // 分数, 0~1
    activeColor: {
      type: String,
      value: '#56B37F',
    },
    GradientColor: {
      type: String,
      value: '#c0e674',
    },
    Text: String,
    subText: String,
  },

  lifetimes: {
    ready() {
      const query = this.createSelectorQuery();
      query
        .select('#ring')
        .fields({ node: true, size: true })
        .exec(res => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const width = res[0].width; // 画布宽度
          const height = res[0].height; // 画布高度

          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          this.drawProgress(ctx, width, height); // 绘制进度条
          this.drawText(ctx, width, height); // 绘制文本
        });
    },
  },
  methods: {
    drawText(ctx, width, height) {
      ctx.font = 'bold 40px Microsoft YaHei';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      if (this.data.GradientColor) {
        const grd = ctx.createLinearGradient(0, 0, 100, 90);
        grd.addColorStop(0, this.data.activeColor);
        grd.addColorStop(1, this.data.GradientColor);
        ctx.fillStyle = grd;
      } else {
        ctx.fillStyle = this.data.activeColor;
      }
      ctx.fillText(this.data.Text, width / 2, height / 2);

      ctx.font = 'bold 15px Microsoft YaHei';
      ctx.fillStyle = '#707070';
      ctx.fillText(this.data.subText, width / 2, height / 2 + 30);
    },
    /**
     * 绘制环形进度条
     */
    drawProgress(ctx, width, height) {
      // 底圆
      ctx.beginPath();
      ctx.arc(
        width / 2, // x
        height / 2, // y
        width / 2 - 10, // 半径
        (3 / 4) * Math.PI, // 左下角开始
        (9 / 4) * Math.PI // 到右下角结束
      );
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#eaeff4';
      ctx.stroke();

      // 进度
      ctx.beginPath();
      ctx.arc(
        width / 2,
        height / 2,
        width / 2 - 10,
        (3 / 4) * Math.PI,
        this.percentageToAngle(this.data.percentage)
      );
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';

      // 进度渐变
      if (this.data.GradientColor) {
        const grd = ctx.createLinearGradient(0, 0, 100, 90);
        grd.addColorStop(0, this.data.activeColor);
        grd.addColorStop(1, this.data.GradientColor);
        ctx.strokeStyle = grd;
      } else {
        ctx.strokeStyle = this.data.activeColor;
      }
      ctx.stroke();
    },

    /**
     * 分数转弧度
     * 四分之三圆, 3 点钟方向顺时针 (3 / 4) * Math.PI 为起点
     * @param {Number} percentage
     */
    percentageToAngle(percentage) {
      const deltaAngle = (3 / 2) * Math.PI; // 进度条总度数
      const start = (3 / 4) * Math.PI; // 地点度数

      if (percentage >= 1) {
        return deltaAngle + start;
      } else if (percentage <= 0) {
        return start;
      } else {
        return deltaAngle * percentage + start;
      }
    },
  },
});
