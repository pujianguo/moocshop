import {
  _get,
  _post,
  joinURL
} from './util'

import jsonp from './jsonp'

export const commonParams = {
  format: 'jsonp'
}

export const jsonpOptions = {
  param: 'callback',
  timeout: 10000
}

export const ERR_OK = 0

export default {
  login (data) {
    let url = '/login'
    return _post(url, data)
  },

  listUser () {
    let url = joinURL('users')
    return _get(url)
  },

  listHomeSlider () {
    let url = joinURL('home', 'sliders')
    return _get(url)
  },

  getHomeRecommend (page = 1, psize = 20) {
    const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json'
    const params = Object.assign({}, commonParams, {
      page,
      psize,
      type: 0,
      frontCatId: ''
    })
    return jsonp(url, params, jsonpOptions)
  }
}
