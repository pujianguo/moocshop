import jsonp from 'jsonp'

const parseParam = param => {
  let params = []
  for (let [k, v] of Object.entries(param)) {
    let value = v !== undefined ? v : ''
    params.push(k + '=' + encodeURIComponent(value))
  }
  return params.join('&')
}

export default (url, data, options) => {
  url += (url.includes('?') ? '&' : '?') + parseParam(data)
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (!err) {
        if (data) {
          if (data.code === '200') {
            resolve(data)
          } else {
            reject('code不是200, 错误信息可能是res.message')
          }
        } else {
          reject('接口无响应数据,貌似是url无效')
        }
      } else {
        reject(err.message)
      }
    })
  })
}
