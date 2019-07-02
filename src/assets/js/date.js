export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate() + 1,
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

let dayTime = 2 * 24 * 60 * 60 * 1000
let nowTime = new Date().getTime()
let t = new Date(nowTime + dayTime).toLocaleString()
let timeStr = t.substr(0, 10)
let arr = timeStr.split('/')
let year = parseInt(arr[0])
let month = parseInt(arr[1])
let day1 = parseInt(arr[2])
if (month < 10) {
  month = '0' + month
}
if (day1 < 10) {
  day1 = '0' + day1
}
const interestTime = year + '-' + month + '-' + day1
export {
  interestTime
}
export function DateDiff (sDate1, sDate2) {
  let aDate, oDate1, oDate2, iDays
  aDate = sDate1.split('-')
  oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
  aDate = sDate2.split('-')
  oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  window.sessionStorage.iDays = parseInt(iDays)
}
