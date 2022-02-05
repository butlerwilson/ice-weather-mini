Component({
  properties: {},

  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },

  relations: {
    "../tab/index": {
      type: "child",
    },
  },

  data: {
    selected: 0,
    pages: [],
  },

  methods: {
    switchTab(e) {
      this.setData({
        // 页面切换
        selected: e.currentTarget.dataset.index,
      });
    },
    swiperChage(e) {
      this.setData({
        // 页面切换
        selected: e.detail.current,
      });
    },
    _initTabs() {
      // 获取关联的子节点
      let nodes = this.getRelationNodes("../tab/index");

      let pages = nodes.map((e) => e.data);

      this.setData({
        pages,
      });
    },
  },

  ready() {
    this._initTabs();
  },
});
