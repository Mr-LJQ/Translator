import React, { ReactNode } from "react";
import classnames from "classnames";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
  title: string;
  disabled?: boolean;
  className?: string;
}

function FieldSet(props: Props) {
  const { children, title, disabled, className } = props;
  return (
    <fieldset
      disabled={disabled}
      className={classnames(
        className,
        "grid grid-cols-4 gap-1 text-black text-base "
      )}
    >
      <Header className="col-span-4">{title}</Header>
      {children}
    </fieldset>
  );
}

export { FieldSet };
