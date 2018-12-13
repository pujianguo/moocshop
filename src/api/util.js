import axios from 'axios'
// import qs from 'qs'
import Vue from 'vue'
import router from '@/router'

// import localStore from './localStore'

let vm = new Vue({ router })
const ENV = process.env.NODE_ENV

const baseUrl = ENV === 'development'
  ? 'http://www.imooc.com/api'
  : ENV === 'production'
    ? 'http://www.imooc.com/api'
    : 'http://www.imooc.com/api'
axios.defaults.baseURL = baseUrl

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 防止ie缓存
if (navigator.userAgent.indexOf('MSIE 9') > -1) {
  axios.defaults.headers.common['If-Modified-Since'] = '0'
}

export const uaFlag = function () {
  return true
  // let idToken = localStore.getLocalStore('token')
  // if (idToken) {
  //   return true
  // } else {
  //   console.warn('require user_auth')
  //   window.location.href = LOGIN_URL(true)
  //   return false
  // }
}

// 统一设置token信息
// const idToken = localStore.getLocalStore('token')
// if(idToken){
//   axios.defaults.headers.common['AUTHORIZATION'] = idToken
// }

// request
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    // 序列化
    // config.data = qs.stringify(config.data);
  }
  if (uaFlag) {
    // 上面统一设置了token，也可以在这里设置
    // let idToken = localStore.getLocalStore('token')
    // config.headers['AUTHORIZATION'] = idToken
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// response
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  return res.data
}, (error) => {
  if (error.response) {
    if (error.response.status === 401) { // 未登陆
      vm.$router.push({
        name: 'login'
      })
    }
    return Promise.reject(error.response.data.message)
  } else {
    return Promise.reject(error.message)
  }
})

export const joinURL = function (...urls) {
  return '/' + urls.join('/')
}

export const _get = (url, params = null) => {
  const promise = axios.get(url, { params: params })
  return new Promise((resolve, reject) => {
    promise.then((result) => {
      resolve(result)
    }).catch((error) => {
      // 一般会有弹框显示错误信息
      console.log('err: ', error)
      reject(error) // 拦截器已过滤，这里是错误信息
    })
  })
}

export const _post = (url, data) => {
  const promise = axios.post(url, data)
  return new Promise((resolve, reject) => {
    promise.then((result) => {
      resolve(result)
    }).catch((error) => {
      // 一般会有弹框显示错误信息
      console.log('err: ', error)
      reject(error) // 拦截器已过滤，这里是错误信息
    })
  })
}

export const _patch = (url, data) => {
  const promise = axios.patch(url, data)
  return new Promise((resolve, reject) => {
    promise.then((result) => {
      resolve(result)
    }).catch((error) => {
      // 一般会有弹框显示错误信息
      console.log('err: ', error)
      reject(error) // 拦截器已过滤，这里是错误信息
    })
  })
}

export const _delete = (url) => {
  const promise = axios.delete(url)
  return new Promise((resolve, reject) => {
    promise.then((result) => {
      resolve(result)
    }).catch((error) => {
      // 一般会有弹框显示错误信息
      console.log('err: ', error)
      reject(error) // 拦截器已过滤，这里是错误信息
    })
  })
}
