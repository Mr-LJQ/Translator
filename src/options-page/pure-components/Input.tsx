import React from "react";
import classJoin from "classnames";

/**
 * input标签的UI封装
 */
export const Input = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(function Input(props, ref) {
  const { className, ...other } = props;
  return (
    <input
      ref={ref}
      {...other}
      className={classJoin(
        `
          px-1
          rounded 
          border
          border-black
          outline-none 
          focus:outline-none 
          focus:ring-2 
          focus:ring-offset-slate-50 
        `,
        className
      )}
    />
  );
});
