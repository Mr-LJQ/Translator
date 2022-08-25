import React from "react";
import classJoin from "classnames";
import { AnkiButtonInfo, Status } from "../types";
import { Command } from "@/configuration";
import { useMessenger } from "../hooks";
interface Props extends AnkiButtonInfo {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const enum StatusIcon {
  Add = "ri-add-line",
  Loading = "ri-loader-line",
  Disconnect = "ri-link-unlink-m",
  Error = "ri-error-warning-line",
  Success = "ri-check-line",
  Forgotten = "ri-question-line",
  LearnNow = "ri-timer-flash-line",
  Duplicate = "ri-file-copy-2-line",
  ConfigError = "ri-settings-3-line",
}

export const AnkiButton = React.memo(function AnkiButton(props: Props) {
  const { status, message, onClick, className, cardIds } = props;
  const { postMessage } = useMessenger();
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
          postMessage(Command.OpenOptionsPage);
        }

        onClick(event);
      }}
      className={classJoin(
        "relative w-8",
        getStatusIcon(status),
        {
          "bg-emerald-600 hover:bg-emerald-700":
            status === Status.Add ||
            status === Status.Loading ||
            status === Status.Success,
          "prior:bg-blue-500 prior:hover:bg-blue-600":
            status === Status.LearnNow || status === Status.Forgotten,
          "prior:bg-violet-600 prior:hover:bg-violet-700":
            status === Status.Duplicate || status === Status.ConfigError,
          "prior:bg-red-600 prior:hover:bg-red-700":
            status === Status.Error || status === Status.Disconnect,
          "prior:bg-yellow-500 prior:hover:bg-yellow-600":
            status === Status.Forgotten,
          "prior:cursor-auto":
            status === Status.Loading || status === Status.Success,
        },
        className
      )}
    />
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

function getStatusIcon(state: Status) {
  return {
    [Status.Add]: StatusIcon.Add,
    [Status.Loading]: StatusIcon.Loading,
    [Status.Error]: StatusIcon.Error,
    [Status.Success]: StatusIcon.Success,
    [Status.LearnNow]: StatusIcon.LearnNow,
    [Status.Duplicate]: StatusIcon.Duplicate,
    [Status.Forgotten]: StatusIcon.Forgotten,
    [Status.Disconnect]: StatusIcon.Disconnect,
    [Status.ConfigError]: StatusIcon.ConfigError,
  }[state];
}
