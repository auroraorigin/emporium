//util.js

//取倒计时（天时分秒）
function getTimeLeft(datetimeTo) {
  // 计算目标与现在时间差（毫秒）
  let time1 = new Date(datetimeTo).getTime();
  let time2 = new Date().getTime();
  let mss = time1 - time2;

  // 将时间差（毫秒）格式为：天时分秒
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((mss % (1000 * 60)) / 1000);

  if (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0)
    return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
  else
    return false
}

module.exports = {
  getTimeLeft: getTimeLeft
}