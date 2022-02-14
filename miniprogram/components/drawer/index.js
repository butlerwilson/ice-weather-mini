Component({
  properties: {
    isOpen: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    closeDrawer() {
      this.setData({
        isOpen: false,
      });
    },
    doNothing() {
      return;
    }
  },
});
