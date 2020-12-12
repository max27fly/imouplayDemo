import {
  BASE_URL,
  TIMEOUT
} from '../utils/config.js'

export function request(options) {
  wx.showLoading({
    title: options.msg,
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url,
      method: 'post',
      timeout: TIMEOUT,
      data: options.data,
      success: function(res) {
        resolve(res.data)
      },
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}


