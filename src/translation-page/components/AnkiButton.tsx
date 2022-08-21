import React from "react";
import classJoin from "classnames";
import { AnkiButtonInfo, Status } from "../types";
import { openOptionsPage } from "@/extensions-api";
interface Props extends AnkiButtonInfo {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const AnkiButton = React.memo(function AnkiButton(props: Props) {
  const { status, message, onClick, className, cardIds } = props;
  return (
    <Button
      title={message}
      onClick={(event) => {
        /**
         * 如果重复，则用户点击后可以复制一份用于在 Anki上查看到底有那些重复项
         */
        if (status === Status.Duplicate && cardIds) {
          const queryText = cardIds
            .map((item) => {
              return "cid:" + item;
            })
            .join(" OR ");
          navigator.clipboard.writeText(queryText);
          return;
        }

        /**
         * 如果出现配置错误，则点击打开配置页面
         */
        if (status === Status.ConfigError) {
          openOptionsPage();
        }

        onClick(event);
      }}
      className={classJoin(
        "relative w-8",
        {
          //"rounded-l-none":
          "bg-emerald-600 hover:bg-emerald-700": status === Status.Add,
          "prior:bg-red-600 prior:hover:bg-red-700": status === Status.Error,
          "prior:bg-blue-500 prior:hover:bg-blue-600":
            status === Status.LearnNow,
          "prior:bg-red-500 prior:hover:bg-red-600":
            status === Status.Disconnect || status === Status.ConfigError,
          "prior:bg-yellow-500 prior:hover:bg-yellow-600":
            status === Status.Forgotten,
          "prior:bg-orange-500 prior:hover:bg-orange-600":
            status === Status.Duplicate,
          "prior:cursor-auto bg-emerald-600 prior:hover:text-white":
            status === Status.Loading || status === Status.Success,
        },
        className
      )}
    >
      {status}
    </Button>
  );
});

/*
 * 纯组件，封装部分样式
 */
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(props, ref) {
  const { className, children, ...other } = props;
  return (
    <button
      ref={ref}
      {...other}
      className={classJoin(
        `
          rounded-full
          indent-0 
          text-base 
          text-center  
          text-white 
          hover:text-gray-200 
          select-none
          cursor-pointer
        `,
        className
      )}
    >
      {children}
    </button>
  );
});
