import React,{useContext} from 'react'
import {MessengerContext} from "../context"

//声明
import type {ErrorData} from "../../../dictionary"
import {Command} from "../../../utils/command"

export function Error(props: ErrorData) {
  let { possibleSpelling, errorMessage } = props;
  let { postMessage } = useContext(MessengerContext);
  if (possibleSpelling)
    return (
      <div className="bg-green-150">
        <p className="font-bold text-gray-700 text-lg">你要找的是否是：</p>
        <ul>
          {possibleSpelling.map((text) => {
            return (
              <li
                key={text}
                className="my-1.5 pl-8 cursor-pointer text-base text-blue-600"
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

  return (
    <p className="bg-green-150 fixed flex inset-0 justify-center pt-20 text-2xl text-center">
      {errorMessage}
    </p>
  );
}