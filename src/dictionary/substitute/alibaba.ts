import { SentenceData } from "../types";
interface TokenData {
  token: string;
  parameterName: string;
  headerName: string;
}
/**
 * 获取阿里翻译所需要的 csrf_token 数据
 * @returns {
 *  "token": "c2722777-d7f4-4ba6-ba10-5a239d2f9074",
 *  "parameterName": "_csrf",
 *  "headerName": "X-XSRF-TOKEN_PROPERTY_ITEM"
 * }
 */
async function getToken(): Promise<TokenData> {
  const response = await fetch(
    "https://translate.alibaba.com/api/translate/csrftoken"
  );
  if (!response.ok)
    throw new Error(
      `获取tokenData的请求失败，状态码为${response.status},状态文本为:${response.statusText}`
    );
  const data = await response.json();
  return data;
}

let csrf_token: TokenData | undefined;

export async function translate_alibaba(
  text: string
): Promise<SentenceData | undefined> {
  try {
    if (csrf_token == null) {
      csrf_token = await getToken();
    }
    const { token, parameterName, headerName } = csrf_token;
    const formData = new FormData();
    formData.append("srcLang", "auto");
    formData.append("tgtLang", "zh");
    formData.append("domain", "general");
    formData.append(parameterName, token);
    formData.append("query", text);

    const response = await fetch(
      "https://translate.alibaba.com/api/translate/text",
      {
        headers: {
          [headerName.toLowerCase()]: token,
        },
        referrer: "https://translate.alibaba.com/",
        body: formData,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );
    if (!response.ok)
      throw new Error(
        `获取阿里翻译的请求失败，状态码为${response.status},状态文本为:${response.statusText}`
      );
    const result = await response.json();

    const sentence_translation = result?.data?.translateText;
    if (sentence_translation) {
      return {
        sentence: text,
        type: "SENTENCE",
        sentence_translation,
        sentence_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(
          text
        )}&le=eng`,
      };
    }
  } catch (e) {
    console.error(e);
  }
}
