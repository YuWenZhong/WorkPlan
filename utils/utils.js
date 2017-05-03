//获取当天日期
function changTimeFomatt(times, doSuccess) {
  var date = new Date();
  //   var date = new Date(times);
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  //   doSuccess(M, D, h, m)
  return date.getFullYear() + '-' + M + '-' + D
}

//获取三十天前日期
function changTimeFomatt2(times, doSuccess) {
  var myDate = new Date();
  var date = new Date(myDate - 1000 * 60 * 60 * 24 * 30);
  //   var date = new Date(times);
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  //   doSuccess(M, D, h, m)
  return date.getFullYear() + '-' + M + '-' + D
}

module.exports = {
  changTimeFomatt: changTimeFomatt,
  changTimeFomatt2: changTimeFomatt2
}