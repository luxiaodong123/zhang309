export let addressFormat = function(list) {
  let newAddressList = []
  for (let i in list) {
    let temp = {}
    temp.name = list[i].name
    temp.value = i + 1
    temp.parent = 0
    newAddressList.push(temp)
    for (let j in list[i].children) {
      let childTemp = {}
      childTemp.name = list[i].children[j].name
      childTemp.value = list[i].children[j].code
      childTemp.parent = i + 1
      newAddressList.push(childTemp)
      for (let k in list[i].children[j].children) {
        let areaTemp = {}
        areaTemp.name = list[i].children[j].children[k].name
        areaTemp.value = list[i].children[j].children[k].code
        areaTemp.parent = list[i].children[j].code
        newAddressList.push(areaTemp)
      }
    }
  }
  return newAddressList
}

export let getAge = function(strBirthday) {
  let fullAge
  let strBirthdayArr = strBirthday.split('-')
  let birthYear = strBirthdayArr[0]
  let birthMonth = strBirthdayArr[1]
  let birthDay = strBirthdayArr[2]

  let d = new Date()
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()

  if (nowYear == birthYear) {
    fullAge = 0 //同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay //日之差
        if (dayDiff < 0) {
          fullAge = ageDiff - 1
        } else {
          fullAge = ageDiff
        }
      } else {
        let monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          fullAge = ageDiff - 1
        } else {
          fullAge = ageDiff
        }
      }
    } else {
      fullAge = -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return fullAge //返回周岁年龄
}

export let getChaoCBaoAge = function(strBirthday, endTime) {
  let fullAge
  let strBirthdayArr = strBirthday.split('-')
  let birthYear = strBirthdayArr[0]
  let birthMonth = strBirthdayArr[1]
  let birthDay = strBirthdayArr[2]

  //ios 时间显示NAN，
  let d = new Date(endTime.replace(/-/g, '/'))
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()

  if (nowYear == birthYear) {
    fullAge = 0 //同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay //日之差
        if (dayDiff < 0) {
          fullAge = ageDiff - 1
        } else {
          fullAge = ageDiff
        }
      } else {
        let monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          fullAge = ageDiff - 1
        } else {
          fullAge = ageDiff
        }
      }
    } else {
      fullAge = -1
    }
  }
  return fullAge //返回周岁年龄
}

export let getValidDateYear = function(strBirthday, endTime) {
  let fullAge
  let strBirthdayArr = strBirthday.split('-')
  let birthYear = strBirthdayArr[0]
  let birthMonth = strBirthdayArr[1]
  let birthDay = strBirthdayArr[2]

  //ios 时间显示NAN，
  let d = new Date(endTime.replace(/-/g, '/'))
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()

  if (nowYear == birthYear) {
    fullAge = 0 //同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay //日之差
        if (dayDiff <= 0) {
          fullAge = ageDiff - 1
        } else {
          fullAge = ageDiff
        }
      } else {
        let monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          fullAge = ageDiff - 1
        } else {
          fullAge = ageDiff
        }
      }
    } else {
      fullAge = -1
    }
  }
  return fullAge //返回周岁年龄
}

export let DateFormat = function(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

export let isEmptyObject = function(obj) {
  let objKeys = Object.keys(obj)
  return objKeys.length == 0 ? true : false
}
