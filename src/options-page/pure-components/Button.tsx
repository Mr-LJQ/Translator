import React from "react";
import classJoin from "classnames";

/**
 * button标签的UI封装
 */
export const Button = React.forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>(function Button(props, ref) {
  const { children, className, ...other } = props;
  return (
    <button
      ref={ref}
      {...other}
      className={classJoin(
        `
          w-20 
          p-1 
          m-1 
          rounded 
          border-none 
          text-center
          text-white 
          bg-green-light 
          hover:bg-green-dark 
          cursor-pointer 
          focus:outline-none 
          focus:ring-2 
          focus:ring-green-800
        `,
        className
      )}
    >
      {children}
    </button>
  );
});
