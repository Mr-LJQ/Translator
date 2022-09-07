/**
 * 纯函数，过滤掉无效查询
 *  - 字符串为空的情况
 *  - 查询主体并非英文
 *  - http/https开头的URL
 * @param text
 * @return 返回过滤后的字符，该字符应当是符合查询要求的
 */
export function validateText(text: string) {
  text = text.trim();

  //过滤为空的字符串
  if (!text) return false;

  //如果英文字母数量不足百分之五十，则认为其并非需要查询的内容
  const amount = text.match(/[a-z]+/gi)?.reduce((amount, item) => {
    return amount + item.length;
  }, 0);
  if (!amount || amount / text.length < 0.5) return false;

  //过滤用户对URL的复制的查询
  if (text.search(/http:|https:/gi) === 0) return false;

  return true;
}
