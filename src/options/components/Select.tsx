import React from "react";
import classnames from "classnames";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

/**
 * select标签的UI封装
 * 依赖：tailwindcss
 */
function Select(props: Props) {
  const { className,children, ...other } = props;
  return (
    <select
      {...other}
      className={classnames(
        className,
        " mx-2 rounded border border-black outline-none "
      )}
    >
      {children}
    </select>
  );
}

export { Select };
