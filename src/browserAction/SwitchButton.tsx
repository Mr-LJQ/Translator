import React from "react";
import classnames from "classnames";

interface Props {
  onClick?: () => void;
  isOpen: boolean;
}

export function SwitchButton(props: Props) {
  const { isOpen, onClick } = props;
  return (
    <div
      className="
        relative 
        flex 
        items-center
        justify-between
        h-8 
        w-20
        rounded-full 
        font-bold 
        bg-gray-700 
        select-none 
        cursor-pointer 
        "
      onClick={onClick}
    >
      <span
        className={classnames(
          `
            float-left
            duration-500
            transition-colors
            pl-3
            text-gray-50
          `,
          { "prior:text-green-viridity": isOpen }
        )}
      >
        开
      </span>
      <span
        className="
        float-right
        pr-3
        text-gray-50 
      "
      >
        关
      </span>
      <span
        className={classnames(
          `
            absolute
            left-0
            top-0
            transition-all
            duration-500
            m-1
            w-10
            h-6
            rounded-full
            bg-gray-50
          `,
          { "prior:bg-green-viridity prior:left-8": isOpen }
        )}
      ></span>
    </div>
  );
}
