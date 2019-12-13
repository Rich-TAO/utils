//DateUtils命名空间
const patterns = {
  PATTERN_ERA: 'G', //Era 标志符 Era strings. For example: "AD" and "BC"
  PATTERN_YEAR: 'y', //年
  PATTERN_MONTH: 'M', //月份
  PATTERN_DAY_OF_MONTH: 'd', //月份的天数
  PATTERN_HOUR_OF_DAY1: 'k', //一天中的小时数（1-24）
  PATTERN_HOUR_OF_DAY0: 'H', //24小时制，一天中的小时数（0-23）
  PATTERN_MINUTE: 'm', //小时中的分钟数
  PATTERN_SECOND: 's', //秒
  PATTERN_MILLISECOND: 'S', //毫秒
  PATTERN_DAY_OF_WEEK: 'E', //一周中对应的星期，如星期一，周一
  PATTERN_DAY_OF_YEAR: 'D', //一年中的第几天
  PATTERN_DAY_OF_WEEK_IN_MONTH: 'F', //一月中的第几个星期(会把这个月总共过的天数除以7,不够准确，推荐用W)
  PATTERN_WEEK_OF_YEAR: 'w', //一年中的第几个星期
  PATTERN_WEEK_OF_MONTH: 'W', //一月中的第几星期(会根据实际情况来算)
  PATTERN_AM_PM: 'a', //上下午标识
  PATTERN_HOUR1: 'h', //12小时制 ，am/pm 中的小时数（1-12）
  PATTERN_HOUR0: 'K', //和h类型
  PATTERN_ZONE_NAME: 'z', //时区名
  PATTERN_ZONE_VALUE: 'Z', //时区值
  PATTERN_WEEK_YEAR: 'Y', //和y类型
  PATTERN_ISO_DAY_OF_WEEK: 'u',
  PATTERN_ISO_ZONE: 'X'
}

const week = {
  'ch': {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  },
  'en': {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
  }
}
//获取当前时间
function getCurrentTime() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var timeString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return timeString;
}


/*
 * 比较时间大小
 * time1>time2 return 1
 * time1<time2 return -1
 * time1==time2 return 0
 */
function compareTime(time1, time2) {
  var d1 = time1;
  var d2 = time2;
  if ((typeof d1) === "string") {
    d1 = new Date(Date.parse(d1.replace(/-/g, "/")));
  }
  if ((typeof d2) === "string") {
    d2 = new Date(Date.parse(d2.replace(/-/g, "/")));
  }
  var t1 = d1.getTime();
  var t2 = d2.getTime();
  if (t1 === t2) {
    return 0;
  } else if (t1 > t2) {
    return 1;
  }
  return -1;
}




//是否闰年
function isLeapYear(year) {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}
//获取某个月的天数，从0开始
function getDaysOfMonth(year, month) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
function getDaysOfMonth2(year, month) {
  // 将天置为0，会获取其上个月的最后一天
  month = parseInt(month) + 1;
  var date = new Date(year, month, 0);
  return date.getDate();
}
/*距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期
 * 如-1表示昨天的日期，0表示今天，2表示后天
 */
function fromToday(days) {
  var today = new Date();
  today.setDate(today.getDate() + days);
  var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return date;
}
function isBlank(input) {
  return input == null || /^\s*$/.test(input);
}
/**
 * 日期时间格式化
 * @param {Object} dateTime 需要格式化的日期时间
 * @param {String} pattern  格式化的模式，如yyyy-MM-dd hh(HH):mm:ss.S a k K E D F w W z Z
 */
function formt(dateTime, pattern) {
  var date = new Date(dateTime);
  if (isBlank(pattern)) {
    return date.toLocaleString();
  }
  return pattern.replace(/([a-z])\1*/ig, function (matchStr, group1) {
    var replacement = "";
    switch (group1) {
      case patterns.PATTERN_ERA: //G
        break;
      case patterns.PATTERN_WEEK_YEAR: //Y
      case patterns.PATTERN_YEAR: //y
        replacement = date.getFullYear();
        break;
      case patterns.PATTERN_MONTH: //M
        var month = date.getMonth() + 1;
        replacement = (month < 10 && matchStr.length >= 2) ? "0" + month : month;
        break;
      case patterns.PATTERN_DAY_OF_MONTH: //d
        var days = date.getDate();
        replacement = (days < 10 && matchStr.length >= 2) ? "0" + days : days;
        break;
      case patterns.PATTERN_HOUR_OF_DAY1: //k(1~24)
        var hours24 = date.getHours();
        replacement = hours24;
        break;
      case patterns.PATTERN_HOUR_OF_DAY0: //H(0~23)
        var hours24 = date.getHours();
        replacement = (hours24 < 10 && matchStr.length >= 2) ? "0" + hours24 : hours24;
        break;
      case patterns.PATTERN_MINUTE: //m
        var minutes = date.getMinutes();
        replacement = (minutes < 10 && matchStr.length >= 2) ? "0" + minutes : minutes;
        break;
      case patterns.PATTERN_SECOND: //s
        var seconds = date.getSeconds();
        replacement = (seconds < 10 && matchStr.length >= 2) ? "0" + seconds : seconds;
        break;
      case patterns.PATTERN_MILLISECOND: //S
        var milliSeconds = date.getMilliseconds();
        replacement = milliSeconds;
        break;
      case patterns.PATTERN_DAY_OF_WEEK: //E
        var day = date.getDay();
        replacement = week['ch'][day];
        break;
      case patterns.PATTERN_DAY_OF_YEAR: //D
        replacement = dayOfTheYear(date);
        break;
      case patterns.PATTERN_DAY_OF_WEEK_IN_MONTH: //F
        var days = date.getDate();
        replacement = Math.floor(days / 7);
        break;
      case patterns.PATTERN_WEEK_OF_YEAR: //w
        var days = dayOfTheYear(date);
        replacement = Math.ceil(days / 7);
        break;
      case patterns.PATTERN_WEEK_OF_MONTH: //W
        var days = date.getDate();
        replacement = Math.ceil(days / 7);
        break;
      case patterns.PATTERN_AM_PM: //a
        var hours24 = date.getHours();
        replacement = hours24 < 12 ? "\u4e0a\u5348" : "\u4e0b\u5348";
        break;
      case patterns.PATTERN_HOUR1: //h(1~12)
        var hours12 = date.getHours() % 12 || 12; //0转为12
        replacement = (hours12 < 10 && matchStr.length >= 2) ? "0" + hours12 : hours12;
        break;
      case patterns.PATTERN_HOUR0: //K(0~11)
        var hours12 = date.getHours() % 12;
        replacement = hours12;
        break;
      case patterns.PATTERN_ZONE_NAME: //z
        replacement = getZoneNameValue(date)['name'];
        break;
      case patterns.PATTERN_ZONE_VALUE: //Z
        replacement = getZoneNameValue(date)['value'];
        break;
      case patterns.PATTERN_ISO_DAY_OF_WEEK: //u
        break;
      case patterns.PATTERN_ISO_ZONE: //X
        break;
      default:
        break;
    }
    return replacement;
  });
}
/**
 * 计算一个日期是当年的第几天
 * @param {Object} date
 */
function dayOfTheYear(date) {
  var obj = new Date(date);
  var year = obj.getFullYear();
  var month = obj.getMonth(); //从0开始
  var days = obj.getDate();
  var daysArr = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (var i = 0; i < month; i++) {
    days += daysArr[i];
  }
  return days;
}
//获得时区名和值
function getZoneNameValue(dateObj) {
  var date = new Date(dateObj);
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  var arr = date.toString().match(/([A-Z]+)([-+]\d+:?\d+)/);
  var obj = {
    'name': arr[1],
    'value': arr[2]
  };
  return obj;
}
/**
 * 格式化时间
 *  dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
 *  dateFormater('YYYYMMDDHHmm', t) ==> 201906261830
 */

function dateFormater(formater, t) {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
/**
 * 将指定字符串由一种时间格式转化为另一种
 * // dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
// dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
// dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626

// 一般的也可以使用正则来实现
//'2019年06月26日'.replace(/(\d{4})年(\d{2})月(\d{2})日/, '$1-$2-$3') ==> 2019-06-26
 */
function dateStrForma(str, from, to) {
  //'20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
  str += ''
  let Y = ''
  if (~(Y = from.indexOf('YYYY'))) {
    Y = str.substr(Y, 4)
    to = to.replace(/YYYY|yyyy/g, Y)
  } else if (~(Y = from.indexOf('YY'))) {
    Y = str.substr(Y, 2)
    to = to.replace(/YY|yy/g, Y)
  }

  let k, i
  ['M', 'D', 'H', 'h', 'm', 's'].forEach(s => {
    i = from.indexOf(s + s)
    k = ~i ? str.substr(i, 2) : ''
    to = to.replace(s + s, k)
  })
  return to
}

/**
 * 计算出两个日期的天数差
 */
function getCycleDays(date1, date2) {
  var date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
  //根据年 . 月 . 日的值创建Date对象
  var date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
  var date2Str = date2.split("-");
  var date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
  var t1 = date1Obj.getTime();
  var t2 = date2Obj.getTime();
  var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
  var minusDays = Math.floor((t2 - t1) / dateTime);   
  var days = Math.abs(minusDays);//取绝对值
  return days;
}

/* JS日期格式化函数
 * by qiqiboy imqiqiboy@gmail.com
 * Blog http://www.qiqiboy.com
 * 示例： 假定当前时间为 2013-03-14 12:12:12
 *		the_time() 							输出 2013-03-14 12:12:12 (当前日期的标准化格式)
 *		the_time('Y年m月d日') 				输出 2013年03月14日
 * 		the_time('Y年m月d日','2013-01-01')	输出 2013年01月01日
 *		the_time('Y年m月d日',1363242438610)	输出 2013年03月14日
 *		the_time('今天是本周中的第N天') 		输出 今天是本周中的第4天
 *		the_time('今天是本年中的第z天')		输出 今天是本年中的第73天
 *		the_time('今天是一年中第W周')			输出 今天是一年中第11周
 * 如果要实现复杂格式，比如一月二月，可以如下实现：
 	var old='2012-12-30',
		month_zh=['一','二','三','四','五','六','七','八','九','十','十一','十二'],
		m=parseInt(the_time('n',old))-1;
	alert(month_zh[m]+'月');
	
 * @param String format 输出格式，默认为'Y-m-d H:i:s'，可用格式符参考下边说明
 *				如果需要输出更文字类型日期（一月二月或者星期三，上午，下午），请自行实现（已经很容易了）
 * @param String|Number timestamp 时间戳或者标准时间格式，例如1363242438610或2013-03-14 12:12:12
 *
 * Y 2013 四位年份
 * y 99 二位年份
 * m 01-12 有前导零的月份
 * n 1-12 无前导零的月份
 * d 01-31 有前导零的每月第几天
 * j 1-31 无前导零的每月第几天
 * W 0-53 一年中第几周
 * z 0-366 一年中第几天
 * w 0-6 一周中第几天，周日为0
 * N 1-7 一周中第几天，周日为7
 */
function timeFormat(format, timestamp) {
  var d = new Date();
  if (timestamp) {
    if (!/^\d+$/.test(timestamp)) {
      timestamp = Date.parse(timestamp);
    }
    d.setTime(timestamp);
  }
  format = format || 'Y-m-d H:i:s';
  var year = d.getFullYear(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds(),
    since = new Date();
  since.setTime(Date.parse(year + '/01/01 00:00:00'));
  return format.replace(new RegExp('Y|y|m|n|d|j|H|h|G|g|i|s|a|A|W|w|z|N', 'g'), function (flag) {
    switch (flag) {
      case 'Y':
        return year;
      case 'y':
        return year.toString().slice(-2);
      case 'm':
        return ('0' + month).slice(-2);
      case 'n':
        return month;
      case 'd':
        return ('0' + day).slice(-2);
      case 'j':
        return day;
      case 'h':
        return ('0' + (hour % 12 || 12)).slice(-2);
      case 'H':
        return ('0' + hour).slice(-2);
      case 'G':
        return hour;
      case 'g':
        return hour % 12 || 12;
      case 'i':
        return ('0' + minute).slice(-2);
      case 's':
        return ('0' + second).slice(-2);
      case 'a':
        return hour < 12 ? 'am' : 'pm';
      case 'A':
        return hour < 12 ? 'AM' : 'PM';
      case 'W':
        return Math.ceil((((since.getDay() || 7) - 1) * (24 * 60 * 60 * 1000) + d.getTime() - since.getTime()) / (7 * 24 * 60 * 60 * 1000));
      case 'w':
        return d.getDay();
      case 'N':
        return d.getDay() || 7;
      case 'z':
        return Math.ceil((d.getTime() - since.getTime()) / (24 * 60 * 60 * 1000));
      default:
        return flag;
    }
  });
}




module.exports = {
  getZoneNameValue,
  dayOfTheYear,
  formt,
  getCurrentTime,
  fromToday,
  getDaysOfMonth2,
  isLeapYear,
  getDaysOfMonth,
  compareTime,
  dateFormater,
  dateStrForma,
  timeFormat,
  getCycleDays
}