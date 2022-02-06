import { getNavBarInfo } from '../../../utils/systemInfo';

Component({
  properties: {
    navTitle: String,
    navIcon: String,
  },
  data: {
    navHeight: 0,
    statusBarHeight: 0,
  },

  lifetimes: {
    attached() {
      const { navHeight, statusBarHeight } = getNavBarInfo();
      this.setData({ navHeight, statusBarHeight });
    },
  },

  methods: {
    clickNavIcon() {
      // 导航栏按钮点击事件
      this.triggerEvent('clickNavIcon');
    },
  },
});
