import axios from 'axios'

/**
 * 数组去重
 * @param ar
 * @returns {Array}
 */
export function removeDuplicatedItem(ar) {
  let ret = [];
  ar.forEach(item => {
    if (ret.indexOf(item) === -1) {
      ret.push(item);
    }
  });
  return ret;
}

/**
 * 合并2个数组并且去重
 * @param arr1
 * @param arr2
 */
export function concatDisticnt(arr1, arr2) {
  let arr = arr1.concat();
  for (let i = 0; i < arr2.length; i++) {
    arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
  }
  //console.log("arr1",arr1,"arr2",arr2,"arr",arr);
  return arr;
}

/**
 *   功能:删除数组元素，元素为对象时候，判断的是引用地址是否相等，无法根据内容判断
 *   参数:arr,数组
 *   参数:ele,元素
 *   备注:需要jquery支持，用到inArray函数
 */
export function removeElement(arr, ele) {
  let index = -1;
  index = $.inArray(ele, arr);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}


/**
 *   功能:删除数组元素，元素为对象时候，判断的是引用地址是否相等，无法根据内容判断
 *   参数:target,目标数组（与参数数组中相等的元素将被删除）
 *   参数:param,要删除的数组
 *   备注:需要jquery支持，用到inArray函数
 */
export function removeArr(target, param) {
  param.forEach(item => {
    let index = $.inArray(item, target);
    if (index !== -1) {
      target.splice(index, 1);
    }
  })

}

/**
 *   功能:删除数组对象元素，根据对象的属性值
 *   参数:arr,数组
 *   参数:attr,属性名称
 *   参数:value,需要对比的属性值
 *   备注:需要jquery支持，用到inArray函数
 */
export function removeByValue(arr, attr, value) {
  arr.forEach((item, index) => {
    if (value!=undefined&&item[attr]!=undefined&&item[attr] === value) {
      // console.log("item[attr] = %o,value= %o",item[attr],value);
      arr.splice(index, 1);
    }
  })
}

/**
 *   功能:取出数组对象元素，根据对象的属性值
 *   参数:arr,数组
 *   参数:attr,属性名称
 *   参数:value,需要对比的属性值
 *   备注:需要jquery支持，用到inArray函数
 */
export function getByValue(arr, attr, value) {
  arr.forEach((item, index) => {
    if (item[attr] === value) {
      return item;
    }
  });
  return null;
}

/**
 * 对象深拷贝,递归  数组拷贝可使用slice 和concat，性能在各浏览器表现各不相同
 * @param myObj
 * @returns {*}
 */
export function clone(myObj) {
  if (typeof(myObj) !== 'object') return myObj;
  if (myObj === null) return myObj;

  let myNewObj = new Object();

  for (let i in myObj)
    myNewObj[i] = clone(myObj[i]);

  return myNewObj;
}

/**
 * 对象深拷贝，使用ES5 JSON.parse  数组拷贝可使用slice 和concat，性能在各浏览器表现各不相同
 * @param obj
 */
export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 *   功能:日期运算
 *   参数:interval,字符串表达式，表示要添加的时间间隔.
 *   参数:number,数值表达式，表示要添加的时间间隔的个数.
 *   参数:date,时间对象或本地时间string.
 *   返回:新的本地时间string..("yyyy-MM-dd") 格式
 *   var now = new Date();
 *   var newDate = DateAdd( "d", 5, now);
 *---------------   DateAdd(interval,number,date)   -----------------
 */
export function dateAdd(interval, number, date) {
  if (typeof date == "string") {
    date = new Date(date);
  }
  switch (interval) {
    case "y": {
      date.setFullYear(date.getFullYear() + number);
      date.format
      return date.Format("yyyy-MM-dd");
      break;
    }
    case "q": {
      date.setMonth(date.getMonth() + number * 3);
      return date.Format("yyyy-MM-dd");
      break;
    }
    case "M": {
      date.setMonth(date.getMonth() + number);
      return date.Format("yyyy-MM-dd");
      break;
    }
    case "w": {
      date.setDate(date.getDate() + number * 7);
      return date.Format("yyyy-MM-dd");
      break;
    }
    case "d": {
      date.setDate(date.getDate() + number);
      return date.Format("yyyy-MM-dd");
      break;
    }
    case "h": {
      date.setHours(date.getHours() + number);
      return date.Format("yyyy-MM-dd");
      break;
    }
    case "m": {
      date.setMinutes(date.getMinutes() + number);
      return date.Format("yyyy-MM-dd");
      break;
    }
    case "s": {
      date.setSeconds(date.getSeconds() + number);
      return date.Format("yyyy-MM-dd");
      break;
    }
    default: {
      date.setDate(date.getDate() + number);
      return date.Format("yyyy-MM-dd");
      break;
    }
  }
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

//时间转化 格式YYYYMMDDHHMM
export function dateConvert(times) {
  const datetime = new Date(times);

  //获取年月日时分秒
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1;
  var date = datetime.getDate();
  var hour = datetime.getHours();
  var minutes = datetime.getMinutes();
  var second = datetime.getSeconds();

  //月，日，时，分，秒 小于10时，补0
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (second < 10) {
    second = "0" + second;
  }

  //拼接日期格式【例如：yyyymmddHHMM】
  const time = year + "/" + month + "/" + date + " " + hour + ":" + minutes + ":" + second;

  //返回处理结果
  return time;
}

// function commafy( num){
//   var parts = (''+ (num<0?-num:num)).split("."), s=parts[0], i=L= s.length, o='',c;
//   while(i--){ o = (i==0?'':((L-i)%3?'':','))
//     +s.charAt(i) +o }
//   return (num<0?'-':'') + o + (parts[1] ? '.' + parts[1] : '');
// }

/**
 * 数字格式转换成千分位
 *@param{Object}num,{int}scale
 */
export function commafy(num,scale){
  if((num+"").trim() === ""){
    return "";
  }
  if(/(^[-]?[1-9]\d{0,2}(,\d{3})*(\.\d+)?)$/.test(num)){
    return num;
  }
  if(isNaN(num)){
    return "";
  }
  num = num+"";
  if(/^.*\..*$/.test(num)){
    var pointIndex =num.lastIndexOf(".");
    var intPart = num.substring(0,pointIndex);
    var pointPart;
    if(!scale){
      pointPart = num.substring(pointIndex+1,num.length);
    }else{
      pointPart =num.substring(pointIndex+1,pointIndex+scale+1);
    }
    intPart = intPart +"";
    var re =/(-?\d+)(\d{3})/;
    while(re.test(intPart)){
      intPart =intPart.replace(re,"$1,$2")
    }
    num = intPart+"."+pointPart;
  }else{
    num = num +"";
    var re =/(-?\d+)(\d{3})/;
    while(re.test(num)){
      num =num.replace(re,"$1,$2")
    }
  }
  //
  // console.log("intPart %o",intPart);
  // console.log("pointPart %o",pointPart);

  return num;
}

/**
 * 去除千分位
 *@param{Object}num
 */

export function delcommafy(num){
  num = num +"";
  if(num.trim()==""){
    return"";
  }
  num = num.replace(/,/gi,'');
  return num;
}

/**
 * 保留几位小数，num为空为undefined为null为NaN 都返回0
 * @param num
 * @param scale
 */
export function toFixed(num,scale){
  if(num==undefined){
    return 0;
  }
  if(num==null){
    return 0;
  }
  if((num+"").trim() === ""){
    return 0;
  }
  if(isNaN(num)){
    return 0;
  }
  return new Number(num).toFixed(scale);
}

/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

export const isStore = name => {
  if (!name) return;
  let key= JSON.parse(window.sessionStorage.getItem(name));
  if(key==""||key==null){
    return false;
  }else{
    return  true;
  }
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}

/**
 * 设置cookie
 */
export const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}


/**
 * 获取cookie
 */
export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

/**
 * 清除cookie
 * @param cname
 */
export const clearCookie = (cname) => {
  setCookie(cname, "", -1);
}

/**
 * 判断两个对象的值是否相等
 *
 */
const isObjectValueEqual = (a, b) => {
    //取对象a和b的属性名
   var aProps = Object.getOwnPropertyNames(a);
   var bProps = Object.getOwnPropertyNames(b);
    //判断属性名的length是否一致
   if (aProps.length != bProps.length) {
       return false;
   }
    //循环取出属性名，再判断属性值是否一致
   for (var i = 0; i < aProps.length; i++) {
       var propName = aProps[i];
       if (a[propName] !== b[propName]) {
           return false;
       }
   }
   return true;
}


/**
 * 判断回显的评估方案是否属于模板中的其中一个
 */
export const inActivityPlan = (obj,arr) => {
  if(obj) {
    let type = 4;
    arr.forEach((val,i)=>{
      let validateSuccessMsg = obj.successMsg.successChannel==val.successMsg.successChannel && obj.successMsg.successIndex==val.successMsg.successIndex
      let validateAnalysisMsg = obj.analysisMsg.analysisChannel==val.analysisMsg.analysisChannel && obj.analysisMsg.analysisType==val.analysisMsg.analysisType && obj.analysisMsg.analysisName.toString()==val.analysisMsg.analysisName.toString();
      if(validateSuccessMsg&&validateAnalysisMsg){
        type = i;
      }
    })
    return type;
  } else {
    return -1;
  }
}
/**
 * 2:判断回显的评估方案是否属于模板中的其中一个
 */
export const inActivityPlan2 = (obj, arr) => {
  if (obj) {
    let type = 4;
    arr.forEach((val, i) => {
      let validateSuccessMsg = obj.successMsg.successChannel == val.successMsg.successChannel && obj.successMsg.successIndex == val.successMsg.successIndex;
      let validateAnalysisMsg = obj.analysisMsg.analysisChannel == val.analysisMsg.analysisChannel && obj.analysisMsg.analysisName.toString() == val.analysisMsg.analysisName.toString();
      if (validateSuccessMsg && validateAnalysisMsg) {
        type = i;
      }
    })
    return type;
  } else {
    return -1;
  }
}
/**
 * 如果页面中有信息没有填写，获取校验不通过的元素让其获取焦点
 */
export const isError = () => {
  let isError= document.getElementsByClassName("is-error");
  let textarea = isError[0].querySelector('textarea');
  let input = isError[0].querySelector('input')
  if(textarea){textarea.focus();}
  if(input){input.focus();}
}

/**
 * 数组去重
 */
export const unique = (arr) => {
    return Array.from(new Set(arr))
}

/**
 * 数组对象中某个属性进行排序
 */
export const compare = (prop) => {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
