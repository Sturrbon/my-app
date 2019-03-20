import axios from 'axios'
import { message } from 'antd'

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data) {
    // 运营商
    if (response.data.retCode && response.data.retCode === 1) {
      return response.data
    }
    // 电商网站
    if (response.data.code) {
      const status = response.data.code.toString()
      if (status === '200' || status === '300' || status === '301' || status === '302') {
        return response.data
      }else {
        message.error(response.data.m)
        return false
      }
    }
  }
}, function (error) {
  message.error('服务异常')
  return Promise.reject(error);
});

export default axios