import React from "react";
import classnames from "classnames";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

/**
 * span标签的UI封装
 * 依赖：tailwindcss
 */
function Span(props: Props) {
  const { children, className, ...other } = props;
  return (
    <span {...other} className={classnames("mx-2", className)}>
      {children}
    </span>
  );
}

export { Span };
