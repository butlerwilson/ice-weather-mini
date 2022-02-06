Component({
  properties: {
    easingFunction: {
      type: String,
      value: 'linear',
    },
    duration: {
      type: String,
      value: '400',
    },
  },

  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },

  relations: {
    '../swiper-page-item/index': {
      type: 'child',
    },
  },

  data: {
    selected: 0,
    pages: [],
  },

  methods: {
    changeSelected(e) {
      this.setData({
        // 页面切换
        selected: e.detail.current,
      });
    },
    _initTabs() {
      // 获取关联的子节点
      let nodes = this.getRelationNodes('../swiper-page-item/index');

      let pages = nodes.map(e => e.data);

      this.setData({
        pages,
      });
    },
    clickNavIcon() {
      // 导航栏按钮点击事件
      this.triggerEvent('clickNavIcon');
    },
  },

  lifetimes: {
    ready() {
      this._initTabs();
    },
  },
});
