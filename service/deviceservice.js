import {
  request,
  requestnoload
} from './network.js'



export function getKitToken(accessToken, deviceId, channelId,appId,appSecret) {
  return request({
    msg: "数据加载中ing",
    url: 'getKitToken',
    data: {
      accessToken,
      deviceId,
      channelId,
      appId,
      appSecret
    }
  })
}




/**
 * 加载设备列表
 * @param {*} token 
 * @param {*} page 
 * @param {*} msg 
 */
export function videoList(accessToken, page, msg, appId, appSecret) {
  return request({
    msg: msg,
    url: 'videoList',
    data: {
      accessToken,
      queryRange: (page * 10 + 1) + "-" + ((page + 1) * 10),
      appId,
      appSecret
    }
  })
}

/**
 * 搜索设备列表
 * @param {*} token 
 * @param {*} deviceId 
 * @param {*} msg 
 */
export function searchVideoList(accessToken, deviceId, msg, appId, appSecret) {
  return request({
    msg: msg,
    url: 'searchVideoList',
    data: {
      accessToken,
      deviceId,
      appId,
      appSecret
    }
  })
}

