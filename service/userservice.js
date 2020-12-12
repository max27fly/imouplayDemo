import {
  request,
  requestnoload
} from './network.js'



export function openlogin( appid, appsecret) {
  return request({
    msg:"账户登录中ing",
    url: 'openLogin',
    data: {
      appid,
      appsecret
    }
  })
}

