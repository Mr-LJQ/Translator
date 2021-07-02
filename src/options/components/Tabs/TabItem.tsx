import React, { ReactNode } from "react";
import classnames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
  checked: boolean;
  onClick: () => void;
}

function TabItem(props: Props) {
  const { children, className, checked, onClick } = props;
  return (
    <div
      className={classnames(
        "text-base font-bold text-gray-600 first:ml-0 mx-2 mt-1 px-2 cursor-pointer flex-shrink-0",
        { "text-red-600 border-red-600 border-b-2": checked },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default TabItem;
