import React from "react";
import classJoin from "classnames";
import { AnkiButtonInfo, Status } from "../../types";
import { getStatusIcon } from "../../utils";
import { warning } from "@/utils";

interface Props extends AnkiButtonInfo {
  className?: string;
  updateAnki: () => void;
}

export const AnkiButton = function AnkiButton(props: Props) {
  const { status, message, updateAnki, className, cardIds } = props;
  return (
    <Button
      title={message}
      onClick={() => {
        /**
         * 如果当前状态是 loading、success，则退出
         */
        switch (status) {
          case Status.Loading:
          case Status.Success:
            return;
          case Status.Add:
          case Status.Error:
          case Status.LearnNow:
          case Status.Forgotten:
          case Status.Disconnect:
          case Status.ConfigError:
            break
          case Status.Duplicate: {
            if (cardIds) {
              const queryText = cardIds
                .map((item) => {
                  return "cid:" + item;
                })
                .join(" OR ");
              navigator.clipboard.writeText(queryText);
            }
            break
          }
          default:{
            warning(false,`存在未处理的 ${status}`)
          }
        }
        //@ts-ignore updateAnki不需要传入任何数据，这里传入数据只不过是为了便于测试
        return updateAnki(status, message, cardIds);
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
          "prior:cursor-auto":
            status === Status.Loading || status === Status.Success,
        },
        className
      )}
    />
  );
};

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
