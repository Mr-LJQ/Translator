import React, { useEffect, useState, useRef } from "react";
import { Loading } from "../Loading";
import { useMessenger } from "../Context";
import { ErrorData } from "@/dictionary";
import { Command } from "@/configuration";
/**
 * 在翻译返回错误时进行渲染的组件，实现以下功能：
 *  - 再次查询
 *  - 拼写错误建议
 */
export function ErrorSection(props: ErrorData) {
  const { possibleSpelling, message, queryText } = props;
  if (possibleSpelling) {
    return <PossibleSpelling possibleSpelling={possibleSpelling} />;
  }

  return (
    <TranslationAgain
      queryText={queryText}
      message={message}
    ></TranslationAgain>
  );
}
function PossibleSpelling(props: { possibleSpelling: string[] }) {
  const { possibleSpelling } = props;
  const { postMessage } = useMessenger();

  return (
    <div className="bg-green-loveEye">
      <p className="font-bold text-gray-700 text-lg">你要找的是否是：</p>
      <ul>
        {possibleSpelling.map((text) => {
          return (
            <li
              key={text}
              className="my-1.5 pl-8 text-base text-blue-700 cursor-pointer"
              onClick={() => {
                postMessage(Command.TranslateText, text);
              }}
            >
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TranslationAgain(props: { queryText?: string; message?: string }) {
  const { postMessage } = useMessenger();
  const { queryText, message } = props;
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<any>();
  useEffect(() => {
    return () => {
      const timerId = timeoutRef.current;
      timerId != null && clearTimeout(timerId);
    };
  }, []);
  return (
    <div className="absolute flex inset-0 flex-col items-center justify-center bg-green-loveEye">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 cursor-not-allowed select-none">
          <Loading color="white" size={40} />
        </div>
      )}
      {queryText && (
        <button
          type="button"
          onClick={() => {
            if (isLoading) return;
            setIsLoading(true);
            timeoutRef.current = setTimeout(function () {
              setIsLoading(false);
            }, 2000);
            postMessage(Command.TranslateText, queryText);
          }}
          className={`
            px-4 py-2
            font-bold 
            leading-6  
            text-sm  
            shadow  
            rounded-md  
            text-white  
            bg-indigo-600  
            hover:bg-indigo-700  
            cursor-pointer 
            focus:outline-none  
            focus:ring-2  
            focus:ring-offset-2  
            focus:ring-slate-400  
            focus:ring-offset-slate-50 
          `}
        >
          再次查询
        </button>
      )}
      <p className=" text-2xl text-center mt-2">{message}</p>
    </div>
  );
}
