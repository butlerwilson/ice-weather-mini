Component({
  properties: {
    pages: Array,
    selected: {
      type: Number,
      value: 0,
    },
  },

  methods: {
    switchTab(e) {
      let current = e.currentTarget.dataset.index;

      this.triggerEvent('switchTab', { current });
      this.setData({
        selected: current,
      });
    },
  },
});
