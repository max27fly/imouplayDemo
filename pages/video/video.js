const app = getApp()
import {
  videoList,
  searchVideoList
} from '../../service/deviceservice.js'

import {
  GLOBAL_TOKEN,
  GLOBAL_STATUSOPENBIND,
  BACK_TOP_POSITION,
  APPID,
  APPSECRET
} from '../../utils/config.js'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    videolist: [],
    page: 0,
    topPosition: 0,
    scrollH: 0,
    showBackTop: false,
    loadingMsg: "视频列表加载中",
    searchLoadinMsg: "视频搜索中",
    inputShowed: false,
    inputVal: "", //搜索框的内容
    searchbarShowed: false, //子框是否展示
    searchShowed: false, //搜索框是否展示
    statusOpenBind: false //微信用户是否绑定开发者账号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log(wx.getStorageSync(GLOBAL_STATUSOPENBIND))
    console.log(wx.getStorageSync(GLOBAL_TOKEN))
    console.log(wx.getStorageSync(APPID))
    console.log(wx.getStorageSync(APPSECRET))
    if (wx.getStorageSync(GLOBAL_STATUSOPENBIND)  &&  wx.getStorageSync(GLOBAL_TOKEN)&&  wx.getStorageSync(APPID)&&  wx.getStorageSync(APPSECRET)) {
      console.log("登录状态下，直接进入设备列表页面.....")
      this.setData({
        statusOpenBind: true,
        searchShowed: true
      })
      var self = this;
      wx.getSystemInfo({
        success: function (res) {
          let scrollH = res.windowHeight;
          self.setData({
            scrollH: scrollH
          });
        }
      });
      if(app.globalData.videoListRefresh){
        this.setData({
          videolist: [],
          page: 0
        })
        this.showVideoList()
      }
    } else {
      //若没有绑定开发者账号则跳转到绑定页面
      this.setData({
        statusOpenBind: false
      })
    }
    app.globalData.videoListRefresh=true;

  },

  onBindOpenAccount: function () {
    wx.navigateTo({
      url: '/pages/openbind/openbind',
    })
  },
  /**
   * 
   * @param {*} refresh :是否清空设备列表后从第一页开始展示设备列表
   */
  showVideoList: function (refresh) {
    videoList(wx.getStorageSync(GLOBAL_TOKEN), this.data.page, this.data.loadingMsg, wx.getStorageSync(APPID), wx.getStorageSync(APPSECRET)).then(res => {
      if (res.code == 0) {
        if (refresh) {
          console.log("refreshdata....")
          this.setData({
            videolist: res.data.videolist
          })
        } else {
          this.setData({
            videolist: this.data.videolist.concat(res.data.videolist)
          })
        }
        this.setData({
          page: this.data.page + 1
        })
      } 
      else if (res.code=='1001')
      {
        console.log('token过期，需要重新登录，去掉缓存后，重新刷新页面')
        wx.setStorageSync(GLOBAL_TOKEN, null)
        wx.showToast({
          title: res.msg,
          mask: true,
          icon: 'none'
        })
        this.onShow();
      }
      else {
        wx.showToast({
          title: res.msg,
          mask: true,
          icon: 'none'
        })
      }
    })
  },

  /**
   * 触底加载更多设备列表
   */
  loadMore() {
    console.log("触底加载更多....")
    this.setData({
      loadingMsg: "视频列表加载中"
    })
    this.showVideoList()
  },

  scrollPosition(e) {
    // 1.获取滚动的顶部
    const position = e.detail.scrollTop;

    // 2.设置是否显示
    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })
  },
  onBackTop() {
    this.setData({
      showBackTop: false,
      topPosition: 0
    })
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

  },
  showInput: function () {
    console.log("showInput....")
    this.setData({
      inputShowed: true,
      searchbarShowed: true
    });
  },
  hideInput: function () {
    console.log("hideInput....")
    this.setData({
      inputVal: "",
      inputShowed: false,
      searchbarShowed: false
    });
  },
  clearInput: function () {
    console.log("clearInput....")
    this.setData({
      inputVal: "",
      searchbarShowed: true
    });
  },
  inputTyping: function (e) {
    console.log("inputTyping....")
    this.setData({
      inputVal: e.detail.value,
      searchbarShowed: false
    });
  },
  searchAll: function (e) {
    console.log("searchAll....")
    this.hideInput();
    this.setData({
      page: 0
    })
    this.showVideoList(true)
  },
  /**
   * 点击搜索
   * @param {*} e 
   */
  handlerSearchConfirm: function (e) {
    console.log("handlerSearchConfirm...." + e.detail.value)
    this.hideInput();
    this.showSearchVideoList(e.detail.value)
  },

  showSearchVideoList: function (deviceId) {
    searchVideoList(wx.getStorageSync(GLOBAL_TOKEN), deviceId, this.data.searchLoadinMsg,wx.getStorageSync(APPID),wx.getStorageSync(APPSECRET)).then(res => {
      if (res.code == 0) {
        console.log("refreshdata....")
        this.setData({
          videolist: res.data.videolist,
          page: 0
        })
      } else {
        wx.showToast({
          title: res.msg,
          mask: true,
          icon: 'none'
        })
      }
    })
  }
})