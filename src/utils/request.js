/****   request.js   ****/
// 导入axios
import axios from 'axios'
import qs from 'qs'
import {
  baseUrl,
  appBaseUrl
} from "../api/api_config.js";
import {
  queryToBool
} from "../utils/util.js";
import localStorageEx from "../utils/localStorageEx.js";
import {
  key_accessToken,
  key_expireTime,
  key_refreshToken,
  key_needFreshToken
} from '../utils/localStorageEx.js'
import {
  Toast
} from 'vant';


// axios.defaults.withCredentials = true;

//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: baseUrl,
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 5 * 1000
})
// 2.请求拦截器

service.interceptors.request.use(config => {
  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  // Toast.loading({
  //   message: "加载中...",
  //   forbidClick: true,
  //   duration:0
  // });
  config.data = JSON.stringify(config.data);
  var refreshToken = localStorage.getItem(key_refreshToken);
  var expireTime = localStorage.getItem(key_expireTime);
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded', //配置请求头
  }

  var accessToken = localStorage.getItem(key_accessToken);
  if (accessToken) {
    config.headers['Authorization'] = "Bearer " + accessToken;
  }
  if (refreshToken) {
    config.headers[key_refreshToken] = refreshToken;
  }
  return config;
}, error => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
  Toast.clear()
  var tokenStatus = response.headers['token-status'];
  if (tokenStatus) {
    console.log('token-status:' + tokenStatus);
    localStorage.setItem('token-status', tokenStatus);
  } else {
    localStorage.removeItem('token-status');
  }
  var needRefresh = response.headers[key_needFreshToken];
  if (needRefresh) {
    needRefresh = queryToBool(needRefresh);
    if (needRefresh) {
      localStorage.setItem(key_needFreshToken, true); //设置标识 接口请求时通过这个标识确定是否主动更新Token
    } else
      localStorage.setItem(key_needFreshToken, false);
  }
  //如果有响应的新的Token信息 直接更新
  var tokenModel = response.headers[key_accessToken];


  return response;
}, error => {

  Toast.clear()
  // console.log('error:', error.response.data.Value.Message)
  /***** 接收到异常响应的处理开始 *****/
  if (error.response) {

    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 505:
        Toast('http版本不支持该请求')
        break;
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      console.log(error);
      return
      JSON.stringify({
        status: 408,
        code: 408,
        message: '数据访问超时',
        data: {},
        isSuccessCode: false
      });
    }
    // Toast('连接服务器失败')

    return error;
  }

  console.error(error);
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)
})
//4.导入文件
export default service