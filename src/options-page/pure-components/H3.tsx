import React from "react";
import classJoin from "classnames";

/**
 * h3标签的UI封装
 */
export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
>(function H3(props, ref) {
  const { children, className, ...other } = props;
  return (
    <h3
      ref={ref}
      {...other}
      className={classJoin(
        "mb-1 py-1 px-2 rounded-t text-white text-lg bg-blue-gray",
        className
      )}
    >
      {children}
    </h3>
  );
});
