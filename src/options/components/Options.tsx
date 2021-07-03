import React from "react";

interface Props {
  options?: string[];
  children?:React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
}

function Options(props: Props) {
  const { options,children } = props;
  return (
    <>
      {children}
      {options && options.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </>
  );
}

export { Options };
