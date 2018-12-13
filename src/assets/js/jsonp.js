import jsonp from 'jsonp'

const parseParam = param => {
  let params = []
  for (let [k, v] of Object.entries(obj)) {
    let value = v !== undefined ? v : ''
    params.push(k + '=' + encodeURIComponent(value))
  }
  return params.join('&')
}
export default (url, data, options) {
  url += (url.includes('?') ? '?' : '&') + parseParam(data)
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
