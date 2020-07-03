const app = getApp()
// const baseUrl = app.globalData.httpUrl;
const baseUrl = 'https://record.weday.xyz/api.php/game/';



const http = ({
  url = '',
  param = {},
  ...other
} = {}) => {
  wx.showLoading({
    title: '获取中..'
  });
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
        'token': wx.getStorageSync('token') || ''
      },
      ...other,
      complete: (res) => {
        wx.hideLoading();
        // console.log(`耗时${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param
  })
}

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}
module.exports = {
  baseUrl,
  _get,
  _post,
  _put,
  _delete
}