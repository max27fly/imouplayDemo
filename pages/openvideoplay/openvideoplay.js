const app = getApp()

import {
  getKitToken
} from '../../service/deviceservice.js'
import {
  GLOBAL_TOKEN,
  APPID,
  APPSECRET
} from '../../utils/config.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    did: "",
    cid: "",
    kittoken: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.hideShareMenu()
    let deviceinfo = options.deviceinfo
    let did = deviceinfo.split("_")[0]
    let cid = deviceinfo.split("_")[1]
    this.setData({
      did: did,
      cid: cid
    })
    app.globalData.videoListRefresh=false;
    this._getKitToken()
  },
  _getKitToken: function () {
    getKitToken(wx.getStorageSync(GLOBAL_TOKEN), this.data.did, this.data.cid, wx.getStorageSync(APPID),wx.getStorageSync(APPSECRET)).then(res => {
      if (res.code == 0) {
        let playUrl = "imou://open.lechange.com/" + this.data.did + "/" + this.data.cid + "/1?streamId=1"
        this.setData({
          kittoken: res.data.kitToken,
          playurl:playUrl
        })
      } else {
        wx.showToast({
          title: res.msg,
          mask: true,
          icon: 'none'
        })
      }
    })
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
  }
})