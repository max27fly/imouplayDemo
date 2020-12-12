//app.js

App({
  globalData: {
    token: '', //session token
    statusOpenBind: false, //开发者账号是否已经登录
    wxUserInfo: null, //微信授权后的scope信息
    statusScopeUser: null, //是否已经微信授权
    appId: null, //乐橙开放平台开发者appid
    appSecret: null, //乐橙开放平台开发者appsecret
    videoListRefresh:true//默认每次点击”我的视频“都刷新设备列表页面，除了从视频播放页面返回不刷新
  },

  onLaunch: function () {
    //进入授权判断页面
    this.checkWxUserInfo()
  },


  checkWxUserInfo() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.globalData.statusScopeUser = true
          console.log("微信用户已经授权")
        } else {
          this.globalData.statusScopeUser = false
          console.log("微信用户未经授权")
        }
        if (this.wxUserScopeReadyCallback) {
          this.wxUserScopeReadyCallback(res)
        }
      }
    })
  }

})