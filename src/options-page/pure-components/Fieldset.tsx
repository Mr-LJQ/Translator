import React from "react";
import classJoin from "classnames";

/**
 * fieldset标签的UI封装
 */
export const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  >
>(function Fieldset(props, ref) {
  const { children, className, ...other } = props;

  return (
    <fieldset
      ref={ref}
      {...other}
      className={classJoin(
        "grid grid-cols-4 gap-y-1 gap-x-2 px-2 text-black text-base",
        className
      )}
    >
      {children}
    </fieldset>
  );
});
