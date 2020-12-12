// pages/openbindSuccess/openbindSuccess.js

const app = getApp()
import {
  WX_USERINFO
} from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusScopeUser: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.wxUserInfo ) {
      console.log(wx.getStorageSync(WX_USERINFO))
      console.log("已有授权信息，则不需要判断授权直接进入设备列表")
      wx.switchTab({
        url: '/pages/video/video',
      })
      return
    }
    if (app.globalData.statusScopeUser == null) {
      // 由于app.js的onLaunch事件中有网络请求，可能会在 Page.onLoad 之后才返回
      //所以此处加入 callback 以防止这种情况
      app.wxUserScopeReadyCallback = res => {
        console.log("wxUserScopeReadyCallback进入callback流程")
        if (res.authSetting['scope.userInfo']) {
          app.globalData.statusScopeUser = true
          console.log("并且发现已经授权")
          this.getUserInfo()
        } else {
          app.globalData.statusScopeUser = false
          console.log("并且发现未授权")
          //显示授权按钮
          this.setData({
            statusScopeUser: false
          })
        }
      }
    } else if (app.globalData.statusScopeUser) {
      console.log("wxbind页面onLoad执行前，app.js已经完成网络交互,并且发现已经授权")
      //已经授权，则获取用户信息
      this.getUserInfo()
    } else {
      //未授权，显示按钮
      console.log("wxbind页面onLoad执行前，app.js已经完成网络交互,并且发现还未授权")
      this.setData({
        statusScopeUser: false
      })
    }
  },

  getUserInfo: function () {
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.wxUserInfo = res.userInfo
        wx.setStorageSync(WX_USERINFO, res.userInfo)
        console.log("微信用户授权信息获取成功，跳转到列表页面")
        wx.switchTab({
          url: '/pages/video/video',
        })
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      console.log("用户点击授权按钮,跳转到设备列表页面")
      app.globalData.wxUserInfo = e.detail.userInfo
      this.setData({
        wxUserInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.switchTab({
        url: '/pages/video/video',
      })
    } else {
      //用户按了拒绝按钮
      console.log("用户按了拒绝按钮")
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})