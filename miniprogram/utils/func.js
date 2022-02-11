export function throttle(fn, time = 1000) {
  let timer;
  return function (...args) {
    if (timer == null) {
      // 计时器不在才执行
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
}
