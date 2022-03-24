import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";

import type { AxiosResponse } from "axios";
import { globalMessage, handleLogout } from "@/utils";
import { MESSAGE_MODE } from "@/types/common";

export interface IResponse<T> {
  code: 0 | 1 | 2;
  data: T;
  msg: string;
}

export let pendingRequests = new Map<string, AxiosRequestConfig>();

const instance = axios.create({
  // 非生产环境带上代理前缀
  baseURL: import.meta.env.MODE !== "production" ? "/api" : "",
  timeout: 5000,
  // 非生产环境允许跨域携带Cookie
  withCredentials: import.meta.env.MODE !== "production",
  // 处理2xx、3xx响应为resolve，其余为reject
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});

axiosRetry(instance, { retries: 3 });

instance.interceptors.request.use(
  (config) => {
    /* 请求记录：method url params data */
    const requestKey = `${config.method} ${config.url} ${JSON.stringify(
      config.params
    )} ${JSON.stringify(config.data)}`;

    config.cancelToken = new axios.CancelToken((cancel) => {
      config.cancel = cancel;
    });
    if (pendingRequests.has(requestKey) && config.cancel) {
      config.cancel(`重复的请求被主动拦截: ${requestKey}`);
    } else {
      pendingRequests.set(requestKey, config);
      config.requestKey = requestKey;
    }
    return config;
  },
  (err) => {
    console.error("请求时错误", err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse<IResponse<any>>) => {
    const requestKey = res.config.requestKey;
    requestKey && pendingRequests.delete(requestKey);
    const { code, msg } = res.data;
    switch (code) {
      case 0:
        return res;
      case 1:
        globalMessage(MESSAGE_MODE.error, msg);
        return Promise.reject(res);
      case 2:
        globalMessage(MESSAGE_MODE.success, msg);
        return res;
    }
  },
  (err) => {
    console.dir(err);
    if (axios.isCancel(err)) {
      return;
    }

    const requestKey = err.config.requestKey;
    pendingRequests.delete(requestKey);

    let { response } = err,
      msg;
    if (response) {
      switch (response.status) {
        case 401:
          msg = "登录已失效！";
          handleLogout();
          break;
        case 403:
          msg = "拒绝访问！";
          break;
        case 404:
          msg = "资源不存在！";
          break;
        default:
          msg = "请求失败，请稍后再试！！";
      }
    } else {
      msg = "请求失败，请检测网络状态！";
    }
    globalMessage(MESSAGE_MODE.error, msg);
    return Promise.reject(err);
  }
);

/**
 * 通用axios请求方法，传入Res、Req泛型，请用解构获取需要的值
 * @returns [data, AxiosResponse]
 */
export async function http<Res>(
  method: "post" | "get",
  url: string,
  data?: object
): Promise<[Res, AxiosResponse<IResponse<Res>>]> {
  let result;
  if (data) {
    result = await instance[method]<IResponse<Res>>(url, data);
  } else {
    result = await instance[method]<IResponse<Res>>(url);
  }
  return [result.data.data, result];
}
