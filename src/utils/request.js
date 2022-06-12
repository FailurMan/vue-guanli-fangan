import axios from "axios";
import { ElMessage } from "element-plus";
import store from "../store/index";
import { isCheckTimeout } from "./auth";
const service = axios.create({
  timeout: 1000,
  baseURL:
    "https://console-mock.apipost.cn/app/mock/project/69865925-094d-484b-bdeb-a5104e2eeaf7/",
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (isCheckTimeout()) {
        //退出操作
        store.dispatch("user/logout");
        return Promise.reject(new Error("token失效了"));
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    //配置接口国际化
    config.headers["Accept-Language"] = store.getters.language;
    return config; // 必须返回配置
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response);
    if (JSON.stringify(response.data) == "{}") {
      return {};
    }
    let { success, message, data } = response.data;
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data;
    } else {
      // 业务错误
      ElMessage.error(message); // 提示错误消息
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    //token过期了
    if (
      error.message &&
      error.message.data &&
      error.response.data.code === 401
    ) {
      //token超时处理
      store.dispatch("user/logout");
    }
    // TODO: 将来处理 token 超时问题
    ElMessage.error(error.message); // 提示错误信息
    return Promise.reject(error);
  }
);

export default service;
