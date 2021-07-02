import React, { Children, ReactNode } from "react";
import classnames from "classnames";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button(props: Props) {
  const { children, className, onClick, title, ...other } = props;
  return (
    <button
      className={classnames(
        "focus:outline-none w-20 p-1 m-1 rounded border-none cursor-pointer text-white bg-green-light hover:bg-green-dark",
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
