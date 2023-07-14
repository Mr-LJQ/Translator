import * as cheerio from "cheerio";
import { createNoCacheError, NEXT_HANDLER } from ".";

interface Options {
  timeout: number;
  responseType: "document" | "json";
  credentials?: boolean;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: XMLHttpRequestBodyInit | null | undefined;
}

let controller: AbortController;
export async function request(url: string, options: Options) {
  //短时间内快速查询的情况下，如果上一个未返回，则直接中止
  //if (controller)是需要的，在第一次调用该方法时，xhr为 undefined
  if (controller) controller.abort();
  controller = new AbortController();
  const signal = controller.signal;
  const {
    timeout,
    headers,
    responseType,
    body = null,
    method = "GET",
    credentials = false,
  } = options;
  let response;
  try {
    response = await fetch(url, {
      body,
      method,
      headers: new Headers(headers),
      credentials: credentials ? "include" : "omit",
      signal:
        //@ts-ignore
        typeof signal.timeout === "function" ? signal.timeout(timeout) : signal,
    });
  } catch (e) {
    switch ((e as Error).name) {
      case "AbortError": {
        throw createNoCacheError("请求被取消");
      }
      case "TimeoutError": {
        throw createNoCacheError("请求超时,请再次尝试");
      }
      default: {
        throw createNoCacheError(`网络连接错误，请检查网络连接状态`);
      }
    }
  }
  if (!response.ok) throw NEXT_HANDLER;
  switch (responseType) {
    case "document": {
      const text = await response.text();
      const $ = cheerio.load(text);
      return $;
    }
    case "json": {
      return response.json();
    }
  }
}
