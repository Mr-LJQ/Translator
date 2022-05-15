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
        h-8 
        w-20
        items-center
        justify-between
        rounded-full 
        font-bold 
        select-none 
        cursor-pointer 
        bg-gray-700 
        "
      onClick={onClick}
    >
      <span
        className={classnames(
          "float-left pl-3 text-gray-50 duration-500 transition-colors",
          { "prior:text-green-viridity": isOpen }
        )}
      >
        开
      </span>
      <span className="float-right pr-3 text-gray-50 ">关</span>
      <span
        className={classnames(
          "absolute left-0 top-0 transition-all duration-500 m-1 w-10 h-6 rounded-full bg-gray-50 ",
          { "prior:bg-green-viridity prior:left-8": isOpen }
        )}
      ></span>
    </div>
  );
}
