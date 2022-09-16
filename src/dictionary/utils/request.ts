import { createNoCacheError, NEXT_HANDLER } from ".";

interface Options {
  timeout: number;
  responseType: "document" | "json";
  credentials?: boolean;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: Document | XMLHttpRequestBodyInit | null | undefined;
}

let xhr: XMLHttpRequest;
export async function request(url: string, options: Options) {
  //短时间内快速查询的情况下，如果上一个未返回，则直接中止
  //if (xhr)是需要的，在第一次调用该方法时，xhr为 undefined
  if (xhr) xhr.abort();
  return new Promise((resolve, reject) => {
    const {
      timeout,
      headers,
      responseType,
      body = null,
      method = "GET",
      credentials = false,
    } = options;
    xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.timeout = timeout;
    xhr.responseType = responseType;
    xhr.withCredentials = credentials;
    if (headers) {
      Object.keys(headers).forEach((key) => {
        const val = headers[key]!;
        xhr.setRequestHeader(key, val);
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status < 200 || xhr.status >= 400) reject(NEXT_HANDLER);
      resolve(xhr.response);
    });
    xhr.addEventListener("error", () => {
      reject(createNoCacheError(`网络连接错误，请检查网络连接状态`));
    });
    xhr.addEventListener("timeout", () => {
      reject(createNoCacheError("请求超时,请再次尝试"));
    });
    xhr.addEventListener("abort", () => {
      reject(createNoCacheError("请求被取消"));
    });
    xhr.send(body);
  });
}
