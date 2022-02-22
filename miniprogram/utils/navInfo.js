// 获取导航栏信息
export function getNavBarInfo() {
  const capsuleInfo = wx.getMenuButtonBoundingClientRect();

  try {
    const systemInfo = wx.getSystemInfoSync();
    var statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度

    console.log(`当前系统: ${systemInfo.platform}`);
  } catch (err) {
    console.log(`获取系统信息失败, 原因: ${err}`);
  }

  let capsuleTop = capsuleInfo.top;
  let capsuleBottom = capsuleInfo.bottom;

  let navHeight = capsuleBottom + capsuleTop - 2 * statusBarHeight; // 导航栏高度

  return {
    navHeight, // 导航栏高度
    statusBarHeight, // 状态栏高度
  };
}
