import React from "react";
import classnames from "classnames";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

/**
 * button标签的UI封装
 * 依赖：tailwindcss
 */
function Button(props: Props) {
  const { children, className, onClick, title, ...other } = props;
  return (
    <button
      className={classnames(
        "w-20 p-1 m-1 border-none rounded text-white bg-green-light hover:bg-green-dark cursor-pointer focus:outline-none",
        className
      )}
      onClick={onClick}
      title={title}
      {...other}
    >
      {children}
    </button>
  );
}

export default Button;
