const app = getApp()
import {
  WX_USERINFO,
  GLOBAL_TOKEN,
  GLOBAL_STATUSOPENBIND,
  APPSECRET,
  APPID
} from '../../utils/config.js'

import {
  unBindOpenAccount
} from '../../service/userservice.js'

Page({
  data: {
    appid: "",
    appsecret: "",
    wxUserInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    this.setData({
      appid: wx.getStorageSync(APPID),
      appsecret: wx.getStorageSync(APPSECRET)
    })
    console.log(wx.getStorageSync(WX_USERINFO))
    if (app.globalData.wxUserInfo) {
      this.setData({
        wxUserInfo: app.globalData.wxUserInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          wxUserInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.wxUserInfo = res.userInfo
          this.setData({
            wxUserInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.wxUserInfo = e.detail.userInfo
    this.setData({
      wxUserInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  openDialog: function (e) {
    wx.setStorageSync(WX_USERINFO, null)
    wx.setStorageSync(GLOBAL_TOKEN, null)
    wx.setStorageSync(GLOBAL_STATUSOPENBIND, null)
    wx.setStorageSync(APPID, null)
    wx.setStorageSync(APPSECRET, null)
    wx.switchTab({
      url: '/pages/video/video',
    })
  },
})