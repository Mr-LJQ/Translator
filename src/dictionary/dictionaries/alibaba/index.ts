/**
 * 该翻译源对于翻译句子的支持非常优秀，翻译准确率高。而对于其它（word、phrase）的支持则没有那么好。
 */
import { SentenceData } from "../../types";
import { NEXT_HANDLER, request } from "../../utils";

/**
 * 返回的数据结构的其中一个实例
 * {
 *   "requestId": "E3B864C9-1707-4C80-AC6C-501BE9F035B6",
 *   "success": true,
 *   "httpStatusCode": 200,
 *   "code": "",
 *   "message": "",
 *   "data": {
 *       "translateText": "这是句子",
 *       "detectLanguage": "en"
 *   }
 * }
 */
interface TranslationData {
  requestId: string;
  success: boolean;
  httpStatusCode: number;
  code: "";
  message: "";
  data: {
    translateText: string;
    detectLanguage: string;
  };
}
/**
 * 返回的数据结构的其中一个实例
 * {
 *  "token": "c2722777-d7f4-4ba6-ba10-5a239d2f9074",
 *  "parameterName": "_csrf",
 *  "headerName": "X-XSRF-TOKEN_PROPERTY_ITEM"
 * }
 */
interface TokenData {
  token: string;
  headerName: string;
  parameterName: string;
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
  const response = (await request(
    "https://translate.alibaba.com/api/translate/csrftoken",
    { responseType: "json", timeout: 4000 }
  )) as TokenData;
  return response;
}

let csrf_token: TokenData | null = null;

export async function translateSentence(
  text: string,
  targetLanguage: "zh" | "en" = "zh"
): Promise<SentenceData | typeof NEXT_HANDLER> {
  if (csrf_token == null) {
    csrf_token = await getToken();
  }
  const { token, parameterName, headerName } = csrf_token;
  const formData = new FormData();
  formData.append("srcLang", "auto");
  formData.append("tgtLang", targetLanguage);
  formData.append("domain", "general");
  formData.append(parameterName, token);
  formData.append("query", text);

  const response = (await request(
    "https://translate.alibaba.com/api/translate/text",
    {
      timeout: 4000,
      body: formData,
      method: "POST",
      credentials: true,
      responseType: "json",
      headers: {
        [headerName.toLowerCase()]: token,
      },
    }
  )) as TranslationData;

  const sentence_translation = response?.data?.translateText;
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
  //可能是csrf_token过期导致不能够获取到翻译数据，那么在用户下次重试时获取一个新的csrf_token，
  csrf_token = null;
  return NEXT_HANDLER;
}

export const alibaba = {
  translateSentence,
  translateChinese: (text: string) => {
    return translateSentence(text, "en");
  },
};
