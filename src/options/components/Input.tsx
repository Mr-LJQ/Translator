import React from "react";
import classnames from "classnames";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function Input(props: Props) {
  const { className, ...other } = props;
  return (
    <input
      className={classnames(
        className,
        "px-1 mx-2 rounded border border-black outline-none "
      )}
      {...other}
    />
  );
}

export { Input };
