Component({
  externalClasses: ['navigator-class'],
  properties: {
    leftIcon: String,
    RightIcon: String,
    text: String,
    color: String,
    bgColor: {
      type: String,
      value: '#fff',
    },
  },
  methods: {
    navigateTo() {
      this.triggerEvent('navigateTo');
    },
  },
});
