/**
 * 获取有道翻译HTML文件的DOM
 * @param input 需要进行翻译的内容
 * @returns 翻译内容对应的DOM文档
 */
 export default async function getPageDOM(input: string): Promise<Document> {
  return new Promise((resolve, reject) => {
    //词典基于有道网页版
    let BASE_URL = "http://dict.youdao.com/w/"
    let searchURL = BASE_URL + encodeURIComponent(input)
    let xhr = new XMLHttpRequest()
    xhr.open("GET", searchURL)
    xhr.responseType = "document"
    xhr.timeout = 3000
    xhr.addEventListener("load", function () {
      resolve(xhr.response)
    })
    xhr.addEventListener("error", function () {
      reject("翻译查询请求失败。")
    })
    xhr.addEventListener("timeout", function () {
      reject("翻译查询请求超时,请检查网络状况。")
    })
    xhr.send(null)
  })
}