/**
 * 工具类的封装
 * @author wdd.
 **/
const $utils = {
  themeColor: '#63d5c4',

  //折线图秒数转换为小时
  formatHour(value) {
    var second = parseInt(value); // 秒
    if (second < 0) {
      return 0
    } else if (
      (second / 3600).toFixed(2).substr(1) == ".00 " ||
      (second / 3600).toFixed(1).substr(1) == ".0"
    ) {
      return (second / 3600).toFixed(2).substr(0, 1)
    } else if (second % 3600 == 0) {
      return second / 3600
    } else {
      return (second / 3600).toFixed(1)
    }
  },
  // 课堂学习时间秒数转换为时分秒
  formatTime(val) {
    let result = 0;
    if (val < 60) {
      return "未满1分钟";
    } else if (60 <= val && val < 3600) {
      return parseInt(val / 60) + "分钟";
    } else if (3600 <= val) {
      let hour = parseInt(val / 3600);
      let second = val % 3600;
      if (second < 60) {
        return hour + "小时";
      } else {
        let minute = parseInt(second / 60);
        result = hour + "小时" + minute + "分";
        return result;
      }
    }
  },
  /**
   * 获取当前时间
   */
  getDate: function(type, dayNum = 0) {
    var date = new Date();
    var targetday = date.getTime() + 1000 * 60 * 60 * 24 * dayNum;
    date.setTime(targetday);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (type === 'start') {
      year = year - 60;
    } else if (type === 'end') {
      year = year + 2;
    }
    month = month > 9 ? month : '0' + month;;
    day = day > 9 ? day : '0' + day;
    return `${year}-${month}-${day}`;
  },
  //获取近几天日期通用方法
  getDay(day) {
    //这里的day是时间（列如：7，-7）
    let today = new Date();
    let targetday_milliseconds =
      today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码，到这时间已经转行为毫秒
    return this.format(today);
  },
  //格式化日期
  format(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
      month = `0${month}`;
    }
    if (day >= 1 && day <= 9) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  },
  // 获得本月第一天日期
  getCurrentMonthFirst() {
    let date = new Date();
    date.setDate(1);
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  toast: function(text, mask, duration, success) {
    uni.showToast({
      title: text || "服务异常",
      icon: success ? 'success' : 'none',
      duration: duration || 2000,
      position: 'bottom',
      mask: mask || true
    })
  },
  /**
   * 过滤空值
   * @param {Object} array
   */
  filter: function(array) {
    return array.filter(item => !$utils.isEmpty(item))
  },

  /**
   * 深层检索
   * @param {Object} modelList
   * @param {Object} lists
   */
  deepRetrieval(modelList, list) {
    console.log(modelList.map(item => {
      console.log(item);
    }));
  },
  /**
   *
   * @param {Object} obj
   */
  isEmpty: function(obj) {
    let empty = true;
    for (let key in obj) {
      if (obj[key]) {
        empty = false;
        break;
      }
    }
    return empty
  },
  modal: function(title, content, showCancel, callback, cancelText, confirmColor, confirmText) {
    uni.showModal({
      title: title || '提示',
      content: content,
      showCancel: showCancel,
	  cancelText: cancelText || "取消",
      cancelColor: "#555",
      confirmColor: confirmColor || "#5677fc",
      confirmText: confirmText || "确定",
      success(res) {
        if (res.confirm) {
          callback && callback(true)
        } else {
          console.log('取消');
          callback && callback(false)
        }
      }
    })
  },
  /**
   * 设置导航栏按钮数字
   * @param {Object} index
   * @param {Object} show
   * @param {Object} text
   */
  setStyle(index, show, text) {
    // #ifdef APP-PLUS
    let pages = getCurrentPages()
    let page = pages[pages.length - 1]
    let currentWebview = page.$getAppWebview()
    currentWebview.setTitleNViewButtonBadge({
      index: index,
      text: text
    })
    // #endif
  },

  /**
   * 累加器: 计算价格
   * @param {Object} list
   * @param {Object} key
   */
  totalizer(list, key, num) {
    let result = 0
    if (list && list.length > 0) {
      list.filter((item, index) => {
        result += item[key] * item[num]
      })
    }
    return result
  },
  // 校验安卓
  isAndroid: function() {
    const res = uni.getSystemInfoSync();
    return res.platform.toLocaleLowerCase() == "android"
  },
  // 校验ios
  isIos: function() {
    const res = uni.getSystemInfoSync();
    return res.platform.toLocaleLowerCase() == "ios"
  },
  constNum: function() {
    let time = 0;
    // #ifdef APP-PLUS
    time = this.isAndroid() ? 300 : 0;
    // #endif
    return time
  },
  delayed: null,
  /**
   * 校验手机号
   * @param {Object} text	手机号
   */
  isPhone(text) {
    if ((/^[1][0-9]{10}$/.test(text))) {
      return true;
    }
    return false;
  },
  /**
   * 校验是否是非法字符
   * @param {Object} text	手机号
   */
  isEmoji(text) {
    if ((/[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\r\n\s/g.test(text))) {
      return true;
    }
    return false;
  },
  /**
   * 密码校验,(以字母开头，长度在6~12之间，只能包含字母、数字和下划线)
   * @param {Object} text	密码
   */
  isPassword(text) {
    if ((/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/.test(text))) {
      return true;
    }
    return false;
  },
  /**
   * 小组校验码,6位数字
   * @param {Object} text	校验码
   */
  isVerificationCode(text) {
    if ((/^\d{6}$/.test(text))) {
      return true;
    }
    return false;
  },
  /**
   * 小组组号,8位数字
   * @param {Object} text	组号
   */
  isGroupCode(text) {
    if ((/^\d{8}$/.test(text))) {
      return true;
    }
    return false;
  },
  /**
   * 组名和小组说明验证  中文、英文、数字
   * @param {Object} text	组名
   */
  isGroupName(text) {
    if ((/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(text))) {
      return true;
    }
    return false;
  },
  /**
   * 校验身份证号
   * @param {Object} code	身份证号
   */
  identityCodeValid(idCard) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(idCard) === false) {
      return false;
    } else {
      return true;
    }
  },
  // 每次跳转页面，校验登录状态，若没有用户信息自动跳转到登录页面
  href(url, isVerify) {
    if (isVerify && !$utils.isLogin()) {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      uni.navigateTo({
        url: url
      });
    }
  },
  /**
   * 上传图片
   */
  uploadImage(count, header) {
    uni.chooseImage({
      count: count, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: async (res) => {
        var tempFilePaths = res.tempFilePaths;
        uni.showLoading({
          title: '正在上传中...'
        })
        for (let temp of tempFilePaths) {
          // 图片上传服务器
          await uni.uploadFile({
            url: 'http://192.168.43.23:8889/platform-api/app/file/upload',
            filePath: temp,
            header: header,
            success: res => {
              // 上传完成后处理
              console.log(res)

              uni.hideLoading()
            },

          });
        }
      },
      fail: (e) => {
        this.toast("图片上传失败");
      }
    });
  },
  /**
   * 图片转base64
   * @param {Object} url	本地图片本身
   */
  imageTobase64(url, success) {
    //#ifdef MP-WEIXIN
    uni.getFileSystemManager().readFile({
      filePath: url,
      encoding: 'base64',
      success: res => {
        console.log(res);
        let base64 = 'data:image/jpeg;base64,' + res.data
        success(base64);
      },
      fail: (e) => {
        this.toast("图片转换失败");
      }
    })
    //#endif

    //#ifndef MP-WEIXIN
    uni.request({
      url: url,
      method: 'GET',
      responseType: 'arraybuffer',
      success: ress => {
        //把arraybuffer转成base64
        let base64 = wx.arrayBufferToBase64(ress.data);
        base64 = 'data:image/jpeg;base64,' + base64
        success(base64);
      },
      fail: (e) => {
        this.toast("图片转换失败");
      }
    })
    //#endif
  },
  // 路由跳转(可能会导致乱码，需要优化)
  togo(url, data) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + $utils.param(data)
    uni.navigateTo({
      url
    })
  },
  // 参数转换
  param(data) {
    let url = ''
    for (var k in data) {
      let value = data[k] !== undefined ? data[k] : ''
      url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
  },
  // 判断是否为空值: 
  isNotBlank(val) {
    return val !== undefined && val !== null && val !== ''
  },
  /**
   * 判断是否为空值
   * @param {Object} obj
   * @param {Array} keys
   */
  isNotEmpty(obj, keys) {
    let isParams = true
    for (let index in keys) {
      let key = keys[index]
      if (obj[key] == '' || obj[key] == null || obj[key] == undefined) {
        $utils.toast('必填参数为空！')
        isParams = false
        break;
      }
    }
    return isParams
  },
  //
  changeNull(obj) {
    for (let key in obj) {
      console.log(obj[key]);
      if (!obj[key]) {
        obj[key] = '无'
      }
    }
    return obj
  },
  removeEmptyField(list) {
    if (list instanceof Array) {
      for (var i = 0; i < list; i++) {
        $utils.removeNull(list[i])
      }
    }
    console.log(list);
    return list
  },
  removeNull(data, defaultStr = '--') {
    // 普通数据类型
    if (typeof data != 'object' || data == null) {
      if ((data == null || data == 'null')) {
        return defaultStr;
      } else {
        return data;
      }
    }
    // 引用数据类型
    for (const v in data) {
      if (data[v] == null || data[v] == 'null') {
        data[v] = defaultStr;
      }
      if (typeof data[v] == 'object') {
        $utils.removeNull(data[v])
      }
    }
  }
}

export default $utils
