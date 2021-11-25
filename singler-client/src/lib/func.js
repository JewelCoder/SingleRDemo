const Func = {};

/**
 * 长期数据存储
 */
Func.localStorage = {
  get: function(key) {
    var result;
    try {
      result = JSON.parse(window.localStorage.getItem(key));
    } catch {
      result = "";
    }
    return result;
  },
  set: function(key, value) {
    if (window.localStorage) {
      window.localStorage.setItem(key.JSON.stringfy(value));
    }
  },
  clear: function(key) {
    window.localStorage.removeItem(key);
  },
  clearAll: function() {
    window.localStorage.clear();
  },
};

/**
 * 一次会话存储
 */
Func.sessionStorage = {
  get: function(key) {
    var result;
    try {
      result = JSON.parse(window.sessionStorage.getItem(key));
    } catch {
      result = "";
    }
    return result;
  },
  set: function(key, value) {
    if (window.sessionStorage) {
      window.sessionStorage.setItem(key, value);
    }
  },
  clear(key) {
    window.sessionStorage.removeItem(key);
  },
  clearAll() {
    window.sessionStorage.clear();
  },
};

/**
 * 填充数值显示，单个数字左侧填充‘0’值
 * @param {Number} number 
 * @returns 
 */
Func.zeroFill = function(number) {
  return (number < 10 ? "0" : "") + number;
};

Func._DateInitialize = function() {
  try {
    window.Date.prototype.getFullMonth = function() {
      return Func.zeroFill(this.getMonth() + 1);
    };
    // 这个是获取日期的天
    window.Date.prototype.getFullDate = function() {
      return Func.zeroFill(this.getDate());
    };
    window.Date.prototype.getFullHours = function() {
      return Func.zeroFill(this.getHours());
    };
    window.Date.prototype.getFullMinutes = function() {
      return Func.zeroFill(this.getMinutes());
    };
    window.Date.prototype.getFullSeconds = function() {
      return Func.zeroFill(this.getSeconds);
    };

    // 快捷方法
    window.Date.prototype.addDays = function(days) {
      return new Date(this.getTime() + days * 24 * 60 * 60 * 1000);
    };
    window.Date.prototype.addHours = function(hours) {
      return new Date(this.getTime() + hours * 60 * 60 * 1000);
    };
    window.Date.prototype.addMinutes = function(minutes) {
      return new Date(this.getTime() + minutes * 60 * 1000);
    };
    window.Date.prototype.date = function() {
      return new Date(this.getFullYear(), this.getMonth(), this.getDate());
    };

    // 格式化方法
    window.Date.prototype.Format = function(fmt) {
      fmt = fmt || "yyyy-MM-dd hh:mm";
      var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      }
      return fmt;
    };
  } catch (e) {
    console.error("Window date initialize failed");
  }
};

Func.dateFormat = function(date, type) {
  if (!date) return "";
  var _time = date ? new Date(date) : new Date();
  var result;
  switch (type) {
    case "date":
      result = _time.Format("yyyy-MM-dd");
      break;
    case "datetime":
      result = _time.Format("yyyy-MM-dd hh:mm");
      break;
    default:
      break;
  }
  return result;
};

Func.getEveryDayInMonth = function(year,month){
  year = year == null || year == undefined ? 1900 : year
  month = month == null || month == undefined ? 0 : month -1
  var date = new Date(year,month,1)
  var date2
  if(month == 12){
    date2 = new Date(year + 1,0,1)
  }else{
    date2 = new Date(year,month + 1,1)
  }
   var days = (date2.getTime()-date.getTime()) / (1000 * 60 * 60 * 24)
   var dayArr = []
   var startDate = new Date(year,month,1)
   dayArr.push(startDate)
   for(var i = 2;i <= days;i++)
   {
     var tmpDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * (i - 1))
     dayArr.push(tmpDate)
     // console.log(tmpDate.getFullYear() + '-' + (tmpDate.getMonth() + 1) + '-' + tmpDate.getDate())
   }
   return dayArr
}

Func.install = function(app) {
  Func._DateInitialize()
  app.config.globalProperties.$func = Func;
}

export default Func;
