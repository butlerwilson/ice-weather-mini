// 日期补 0
function fillZero(num) {
  return num < 10 ? `0${num}` : num;
}

// 获取距离当前日期 num 天的日期
export function getDate(num = 0) {
  let timestamp = new Date().getTime(); // 当前日期的时间戳

  timestamp += num * 1000 * 3600 * 24; // 时间戳加上指定天数

  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = fillZero(date.getMonth() + 1);
  let day = fillZero(date.getDate());

  return `${year}${month}${day}`;
}

export function formatTime(date) {
  if (date instanceof Date) {
    const year = date.getFullYear(),
      month = fillZero(date.getMonth() + 1),
      day = fillZero(date.getDate()),
      hour = fillZero(date.getHours()),
      minute = fillZero(date.getMinutes()),
      secord = fillZero(date.getSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${secord}`;
  } else {
    return;
  }
}

export function formatTimeToHourAndMinute(date) {
  if (date instanceof Date) {
    const hour = fillZero(date.getHours()),
      minute = fillZero(date.getMinutes());

    return `${hour}:${minute}`;
  } else {
    return;
  }
}
