

export default function useMinutetimestamp (longTypeDate) {



  const minutetimestamp = (longTypeDate) => {
    var dateTypeDate = '';
    var date = new Date();
    date.setTime(longTypeDate);
    dateTypeDate += date.getFullYear(); //年
    dateTypeDate += '-' + getMonth(date); //月
    dateTypeDate += '-' + getDay(date); //日
    dateTypeDate += ' ' + getHours(date); //时
    dateTypeDate += ':' + getMinutes(date); //分
    return dateTypeDate;
  };



  const getMonth = (date) => {
    var month = '';
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
      month = '0' + month;
    }
    return month;
  };

  //返回01-30的日期
  const getDay = (date) => {
    var day = '';
    day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return day;
  };

  //返回小时
  const getHours = (date) => {
    var hours = '';
    hours = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    return hours;
  };

  //返回分
  const getMinutes = (date) => {
    var minute = '';
    minute = date.getMinutes();
    if (minute < 10) {
      minute = '0' + minute;
    }
    return minute;
  };

  return minutetimestamp
}

