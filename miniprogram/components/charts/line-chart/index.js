import { Line } from './line';

Component({
  externalClasses: ['line-class'],
  properties: {
    width: String,
    height: String,
    options: Object,
  },
  lifetimes: {
    ready() {
      this.draw(this.data.options);
    },
  },
  methods: {
    draw(options) {
      this.createSelectorQuery()
        .in(this)
        .select('#line')
        .fields({ node: true, size: true })
        .exec(res => {
          const line = new Line(res[0]);
          line.init(options);
        });
    },
  },
});
