import React from "react";
import classnames from "classnames";

interface Props {
  title: string;
  name: string;
  options: string[];
  value?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

function SelectItem(props: Props) {
  const { onChange, className, name, title, options, value } = props;
  return (
    <>
      <span className="rounded mx-2">{title}</span>
      <select
        name={name}
        className={classnames(
          className,
          "rounded border border-black outline-none mx-2"
        )}
        value={value}
        onChange={onChange}
      >
        <option key="default" value=""></option>
        {options.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </>
  );
}

export { SelectItem };
