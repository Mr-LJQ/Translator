import React from "react";

/**
 * label标签的UI封装
 */
export const Label = React.forwardRef<
  HTMLLabelElement,
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
>(function Label(props, ref) {
  const { children, ...other } = props;
  return (
    <label ref={ref} {...other}>
      {children}
    </label>
  );
});
