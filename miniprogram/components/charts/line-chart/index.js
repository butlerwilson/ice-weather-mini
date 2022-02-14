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
          const line = new Line(res[0]);
          line.init(options);
        });
    },
  },
});
