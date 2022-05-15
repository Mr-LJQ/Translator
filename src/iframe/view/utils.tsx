import React, { ReactNode } from "react";

/**
 * 纯函数，用于处理text中的 html标签，使其被正确解析
 * @param text 待处理的字符串
 * @returns 
 */
export function decodeBTag(text: string): ReactNode[] {
  const reg = new RegExp(`(<b>.+?)</b>`, "gi");
  const textArr = text.split(reg);
  return textArr.reduce((result, text, index) => {
    let reactNode: ReactNode = text;
    if (text.includes("<b>")) reactNode = <b key={index}>{text.slice(3)}</b>;
    result.push(reactNode);
    return result;
  }, [] as ReactNode[]);
}

