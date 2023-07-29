import axios from "axios";
import store from "../mobx/store";

export const Service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000, //延迟时间

  method: "POST"
});

/* 添加一个计数器 */
let needLoadingRequestCount = 0

function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    store.changeProjectloadingShow()
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {

    store.changeProjectloadingHide()
  }
}


// 请求拦截

Service.interceptors.request.use(
  config => {
    // config 请求配置

    // 可用于
    // 发送网络请求时，在界面显示一个请求的同步动画
    // 某些请求（比如登录（token））必须携带一些特殊的信息

    config.headers.Authorization = localStorage.getItem("accessToken");


    // 可用于
    // 发送网络请求时，在界面显示一个请求的同步动画
    // 某些请求（比如登录（token））必须携带一些特殊的信息

    // 请求成功拦截
    //loading


    showFullScreenLoading()
    store.changeloadingShow()

    return config;
  },
  err => {
    // 请求失败拦截
    store.changeloadingShow()
    showFullScreenLoading()

    return Promise.reject(err.response);
  }
);

// 响应拦截

Service.interceptors.response.use(
  response => {
    // 隱藏loading
    tryHideFullScreenLoading()
    store.changeloadingHide()

    return response;
  },
  // err => {
  //   store.changeloadingHide();

  //   // 隱藏loading
  //   store.changeloadingHide();

  //   return response;
  // },
  err => {
    store.changeloadingHide()
    tryHideFullScreenLoading()
    return Promise.reject(err.response);
  }
);
