import React from "react";
import classJoin from "classnames";
import { getStatusIcon } from "../../utils";
import { AnkiButtonInfo, Status } from "../../types";

interface Props extends AnkiButtonInfo {
  className?: string;
  updateAnki: () => void;
}

export const AnkiButton = function AnkiButton(props: Props) {
  const { status, message, updateAnki, className, cardIds } = props;
  return (
    <Button
      aria-label="AnkiButton"
      data-status={status}
      title={message}
      onClick={() => {
        /**
         * 如果当前状态是 loading、success，则退出
         */
        switch (status) {
          case Status.Loading:
          case Status.Success:
            return;
        }
        //@ts-ignore updateAnki不需要传入任何数据，这里传入数据只不过是为了便于测试
        return updateAnki(status, message, cardIds);
      }}
      className={classJoin(
        ` 
          relative w-8 
          m-1
          focus:outline-none  
          focus:ring-2  
          focus:ring-offset-2  
          focus:ring-slate-500  
          focus:ring-offset-slate-50 
        `,
        getStatusIcon(status),
        {
          "bg-emerald-600 hover:bg-emerald-700":
            status === Status.Add ||
            status === Status.Loading ||
            status === Status.Success,
          "bg-blue-500 hover:bg-blue-600":
            status === Status.LearnNow || status === Status.Forgotten,
          "bg-violet-600 hover:bg-violet-700":
            status === Status.Duplicate || status === Status.ConfigError,
          "bg-red-600 hover:bg-red-700":
            status === Status.Error || status === Status.Disconnect,
          "cursor-auto": status === Status.Loading || status === Status.Success,
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
