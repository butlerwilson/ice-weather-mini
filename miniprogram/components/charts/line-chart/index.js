import { Line } from './line';

Component({
  externalClasses: ['line-class'],
  properties: {
    width: String,
    height: String,
    options: Object,
  },
  observers: {
    width() {
      this.draw(this.data.options);
    },
  },
  methods: {
    draw(options) {
      const query = this.createSelectorQuery();
      query
        .select('#line')
        .fields({ node: true, size: true })
        .exec(res => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const width = res[0].width; // 画布宽度
          const height = res[0].height; // 画布高度

          console.log(`画布宽度: ${width}, 高度: ${height}`);

          const line = new Line(res[0]);
          line.init(options);
        });
    },
  },
});
