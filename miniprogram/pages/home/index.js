import qweather from "../../utils/qweather";

Component({
  data: {},

  onLoad(options) {
    qweather
      .getDisasterWaring("110.35,20.02")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0,
        });
      }
    },
  },
});
