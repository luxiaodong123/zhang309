// 禁用微信的分享功能
export let controlShare = option => {
  function onBridgeReady() {
    WeixinJSBridge.call(option)
  }
  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

/**
 * 微信分享配置
 * @param {*} scope this值 当前作用域
 */
export let wxShare = scope => {
  let currentPageUrl = location.href.split('#')[0]
  scope.$axios
    .get(`/wechat/wechat-config`, {
      params: {
        url: currentPageUrl
      }
    })
    .then(res => {
      if (res.data.errCode == 0) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appid, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        })
        wx.ready(() => {
          shareFunc();
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  
    //微信分享功能
    function shareFunc() {

    }
}

/**
 * 微信拍照配置
 * @param {*} scope this值 当前作用域
 * @param {*} callback 拍照页面逻辑
 */
export let wxImage = (scope) => {
  let currentPageUrl = location.href.split('#')[0]
  scope.$axios
    .get(`/wechat/wechat-config`, {
      params: {
        url: currentPageUrl
      }
    })
    .then(res => {
      if (res.data.errCode == 0) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appid, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: ['chooseImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表
        })
        wx.ready(() => {
        });
        wx.error((res) => {
          console.log('config失败' + res);
        });
      }
    })
    .catch(err => {
      console.log(err)
    })
}

