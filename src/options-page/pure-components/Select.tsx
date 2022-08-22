import React from "react";
import classJoin from "classnames";

/**
 * 对select标签的封装,添加了一些默认样式
 */
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
>(function Select(props, ref) {
  const { className, children, ...other } = props;
  return (
    <select
      ref={ref}
      {...other}
      className={classJoin(
        className,
        `
          rounded
          border
          border-black
          focus:outline-none 
          focus:ring-2 
          focus:ring-offset-slate-50 
        `
      )}
    >
      {children}
    </select>
  );
});
