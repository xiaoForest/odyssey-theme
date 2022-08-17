import md5 from "js-md5";
/**
 * 获取格式化的时间字符串
 * @param {Object} time Date对象
 * @param {Object} mask 格式掩码
 */
export function getTimeFormat(time, mask) {
  var d = time;
  var zeroize = function (value, length) {
    if (!length) length = 2;
    value = String(value);
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0';
    }
    return zeros + value;
  };

  return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
    switch ($0) {
      case 'd':
        return d.getDate();
      case 'dd':
        return zeroize(d.getDate());
      case 'ddd':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
      case 'dddd':
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
      case 'M':
        return d.getMonth() + 1;
      case 'MM':
        return zeroize(d.getMonth() + 1);
      case 'MMM':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
      case 'MMMM':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
      case 'yy':
        return String(d.getFullYear()).substr(2);
      case 'yyyy':
        return d.getFullYear();
      case 'h':
        return d.getHours() % 12 || 12;
      case 'hh':
        return zeroize(d.getHours() % 12 || 12);
      case 'H':
        return d.getHours();
      case 'HH':
        return zeroize(d.getHours());
      case 'm':
        return d.getMinutes();
      case 'mm':
        return zeroize(d.getMinutes());
      case 's':
        return d.getSeconds();
      case 'ss':
        return zeroize(d.getSeconds());
      case 'l':
        return zeroize(d.getMilliseconds(), 3);
      case 'L':
        var m = d.getMilliseconds();
        if (m > 99) m = Math.round(m / 10);
        return zeroize(m);
      case 'tt':
        return d.getHours() < 12 ? 'am' : 'pm';
      case 'TT':
        return d.getHours() < 12 ? 'AM' : 'PM';
      case 'Z':
        return d.toUTCString().match(/[A-Z]+$/);
        // Return quoted strings with the surrounding quotes removed
      default:
        return $0.substr(1, $0.length - 2);
    }
  });
}

export function getWeekName(dateString) {
  var date = new Date(dateString);
  return "星期" + "日一二三四五六".charAt(date.getDay());
}

export function isWeiXinBrowser() {
  var agent = window.navigator.userAgent.toLowerCase();
  if (agent.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

export function isMobileBrowser() {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true;
  } else {
    return false;
  }
}

export function queryToBool(value, defaultValue) {
  if (typeof (value) == 'boolean')
    return value;
  if (defaultValue == undefined)
    defaultValue = false;
  if (value == undefined)
    return defaultValue;

  if (value.toLowerCase() == 'true' || value == true || value == "1" || value == 1) {
    return true;
  } else {
    return false;
  }
}

export function htmlToPlain(html) {
  if (!html)
    return '';
  return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/<[^>]+?>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ /g, ' ')
    .replace(/>/g, ' ');
}

export function arrayRemove(array, item) {
  if (!array || array.length == 0)
    return array;
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] != item)
      result.push(array[i]);
  }
  return result;
}

/**
 * 使用时间戳生成随机请求Id
 */
export function getRequestId() {
  var dateNumber = Date.parse(new Date()) / 1000;
  var randomValue = parseInt(dateNumber / Math.ceil(Math.random() * 1000000));
  return `${dateNumber}-${randomValue}`;
}

/**
 * 判断元素是否在可视范围内
 * @param {Object} element
 */
export function isElementInView(element) {
  var rect = element.getBoundingClientRect();
  var isInView = rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  return isInView;
}

export function getMd5(object) {
  var type = typeof (object);
  if (type == 'symbol' || type == 'function')
    return null

  if (type == 'null')
    return ""
  if (type == 'string')
    return md5(object)
  if (type == 'boolean')
    return md5(object ? "true" : "false")
  if (type == 'number')
    return md5(object + '')

  return md5(JSON.stringify(object))
}

export function getOrderText(order) {
  var x = '';
  switch (order) {
    case 0:
      x = "--";
      break;
    case 1:
      x = "第一";
      break;
    case 2:
      x = "第二";
      break;
    case 3:
      x = "第三";
      break;
    case 4:
      x = "第四";
      break;
    case 5:
      x = "第五";
      break;
    case 6:
      x = "第六";
      break;
    case 7:
      x = "第七";
      break;
    case 8:
      x = "第八";
      break;
    case 9:
      x = "第九";
      break;
    case 10:
      x = "第十";
      break;
    case 11:
      x = "十一";
      break;
    case 12:
      x = "十二";
      break;
    case 13:
      x = "十三";
      break;
    case 14:
      x = "十四";
      break;
    case 15:
      x = "十五";
      break;
    case 16:
      x = "十六";
      break;
    case 17:
      x = "十七";
      break;
    case 18:
      x = "十八";
      break;
    case 19:
      x = "十九";
      break;
    case 20:
      x = "二十";
      break;
    case 21:
      x = "二十一";
      break;
    case 22:
      x = "二十二";
      break;
    case 23:
      x = "二十三";
      break;
    case 24:
      x = "二十四";
      break;
    case 25:
      x = "二十五";
      break;
    case 26:
      x = "二十六";
      break;
    case 27:
      x = "二十七";
      break;
    case 28:
      x = "二十八";
      break;
    case 29:
      x = "二十九";
      break;
    case 30:
      x = "三十";
      break;
    case 31:
      x = "三十一";
      break;
    case 32:
      x = "三十二";
      break;
    case 33:
      x = "三十三";
      break;
    case 34:
      x = "三十四";
      break;
    case 35:
      x = "三十五";
      break;
    default:
      x = order + '';
  }
  return x;
}

export function keepLastIndex(obj) {
  // console.log(obj);
  // console.log(window.getSelection);
  // console.log(document.selection);
  if (window.getSelection) {
    //ie11 10 9 ff safari
    obj.focus(); //解决ff不获取焦点无法定位问题
    var range = window.getSelection(); //创建range
    range.selectAllChildren(obj); //range 选择obj下所有子内容
    range.collapseToEnd(); //光标移至最后
  } else if (document.selection) {
    //ie10 9 8 7 6 5
    var range = document.selection.createRange(); //创建选择对象
    //var range = document.body.createTextRange();
    range.moveToElementText(obj); //range定位到obj
    range.collapse(false); //光标移至最后
    range.select();
  }
};


/**
 * js把一个对象转成键值对数组对象 let obj = {10: "苹果", 20: "橘子"}
 * @param {Object}
 */
export function objToArr(obj) {
  let arr = [];
  for (let i in obj) {
    let o = {};
    o[i] = obj[i];
    arr.push({
      text: obj[i],
      value: i,
    });
  }
  return arr;
}