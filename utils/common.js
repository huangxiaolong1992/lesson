  //时间戳转成时间
  function timestampToTime(timestamp) {
    var date =  new Date(timestamp * 1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y    =  date.getFullYear() + '-';
    var M    =  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var m    =  date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    var D    =  date.getDate() < 10 ? '0'+ date.getDate() : date.getDate() + ' ';
    var h    =  ' ' + date.getHours() + ':';
    return Y+M+D+h+m;
  }  
  

  //时间戳转成时间
  function timestamp(timestamp) {
    var date =  new Date(timestamp * 1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y    =  date.getFullYear() + '-';
    var M    =  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var m    =  date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    var D    =  date.getDate() < 10 ? '0'+ date.getDate() : date.getDate() + ' ';
    var h    =  ' ' + date.getHours() + ':';
    return Y+M+D;
  }  
  //获取7天的时间
  function getprevDay(params,type) {
    var date =  new Date();
    var Y    =  date.getFullYear() + '-';
    var M    =  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var m    =  date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    var D    =  date.getDate() < 10 ? '0'+ parseInt(date.getDate()+ params)  : parseInt(date.getDate() + params)  + ' ';
    var h    =  ' ' + date.getHours() < 10  ? ' 0'+ date.getHours()+':' : date.getHours() +':';
    if(type == 0){
      return Y+M+D;
    }else{
      return M+D;
    }
    
  } 

  //统计值出现的次数
  function statistics(data){
    res = {}; // 结果
    data.forEach(item => {
      if(!res[item.userCode]) {
        res[item.userCode] = {
          userCode   : item.userCode,
          userName   : item.userName,
          department : item.department,
          avatar     : item.avatar,
          len: 1
        }
      } else {
        res[item.userCode].len++;
      }
    })

    return res;
  }


  //统计时间出现的次数
  function statisticsTime(data){
    res = {}; // 结果
    data.forEach(item => {
      if(!res[item.time]) {
        res[item.time] = {
          len: 1
        }
      } else {
        res[item.time].len++;
      }
    })

    return res;
  }



 //根据某个值进行排序
  function compare(property){
    return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  }


  module.exports = {
    statistics : statistics,
    compare : compare,
    timestampToTime : timestampToTime,
    getprevDay : getprevDay,
    statisticsTime : statisticsTime,
    timestamp: timestamp
  }


 