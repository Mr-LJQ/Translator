import React, { ReactNode } from "react";
import classnames from "classnames";
interface Props {
  title: string;
  name: string;
  value?: string;
  className?: string;
  children?: ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
function InputItem(props: Props) {
  const { title, name, value, className, onChange, children } = props;
  return (
    <>
      <span className="mx-2">{title}</span>
      <div className={classnames(className, "flex")}>
        <input
          className="flex-1 rounded border border-black outline-none px-1 mx-2"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
        />
        {children}
      </div>
    </>
  );
}

export { InputItem };
