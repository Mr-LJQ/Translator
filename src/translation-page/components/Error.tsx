/**
 * 在翻译返回错误时进行渲染的组件，实现以下功能：
 *  - 再次查询 、
 *  - 拼写错误建议
 */
import React, { useState } from "react";
import { Loading } from "./Loading";
import { useMessenger } from "../hooks";
import { ErrorData } from "@/dictionary";
import { Command } from "@/configuration";

export class ErrorComponent {
  constructor(props: ErrorData) {
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
              className="my-1.5 pl-8 text-base text-blue-600 cursor-pointer"
              onClick={() => {
                postMessage(Command.TranslateText, text);
              }}
            >
              <a href="#">{text}</a>
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
  return (
    <div className=" fixed inset-0  flex flex-col items-center pt-20 bg-green-loveEye">
      {isLoading && <Loading className="fixed inset-0 z-50" />}
      {queryText && (
        <button
          type="button"
          onClick={() => {
            if (isLoading) return;
            setIsLoading(true);
            setTimeout(function () {
              setIsLoading(false);
            }, 2000);
            postMessage(Command.TranslateText, queryText);
          }}
          className=" 
            px-4 py-2
            font-bold 
            leading-6  
            text-sm  
            shadow  
            rounded-md  
            text-white  
            bg-indigo-500  
            hover:bg-indigo-400  
            cursor-pointer 
            focus:outline-none  
            focus:ring-2  
            focus:ring-offset-2  
            focus:ring-slate-400  
            focus:ring-offset-slate-50 
          "
        >
          再次查询
        </button>
      )}
      <p className=" text-2xl text-center ">{message}</p>
    </div>
  );
}
