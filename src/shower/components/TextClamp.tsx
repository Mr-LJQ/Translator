import React, { useRef, useState, useCallback, Key } from "react";

import { measureTextWidth } from "../../utils/index";

interface Props {
  children: string[];
  key: Key;
}

//魔法字符串
const RETRACT = "收起";
const OPEN = "展开";

export function TextClamp(props: Props) {
  const { children } = props;
  const [title, setTitle] = useState("");
  const clampText = useRef<string[]>([]);
  const [translations, setTranslations] = useState(children.slice()); //避免副作用
  const measureRef = useCallback((element: HTMLUListElement) => {
    if (!element) return;
    const ulHeight = element.clientHeight;
    //确保element高度在一定范围内
    if (ulHeight < 120) return;
    //最多展现3条条目
    let newTranslations = translations.slice(0, 3);
    newTranslations = newTranslations.map((text) => {
      const width = element.clientWidth;
      let TextWidth = measureTextWidth(text);
      //该文本会导致换行行为发生,所以裁短
      while (TextWidth > width) {
        const textArr = text.split("；");
        const length = textArr.length;
        text = textArr.slice(0, length / 2).join("；");
        TextWidth = measureTextWidth(text);
      }
      return text;
    });
    clampText.current = newTranslations;
    setTitle(OPEN);
    setTranslations(newTranslations);
  }, []);

  return (
    <ul ref={measureRef} className="text-base">
      {translations.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
      {title && (
        <li
          className="bg-green-400 cursor-pointer mt-1 text-center"
          onClick={() => {
            if (title === OPEN) {
              setTranslations(children);
              setTitle(RETRACT);
            } else {
              setTranslations(clampText.current);
              setTitle(OPEN);
            }
          }}
        >
          {title}
        </li>
      )}
    </ul>
  );
}
