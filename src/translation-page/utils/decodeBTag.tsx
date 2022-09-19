import React, { ReactNode } from "react";

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
