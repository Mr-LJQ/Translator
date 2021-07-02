import React from "react";
import classnames from "classnames";

interface Props {
  onClick?: () => void;
  isOpen: boolean;
}

export default class SwitchButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { isOpen, onClick } = this.props;
    return (
      <div
        className="
        relative 
        flex 
        h-8 
        w-20
        items-center
        justify-between
        rounded-full 
        font-bold 
        select-none 
        cursor-pointer 
        bg-gray-700 
        "
        onClick={onClick}
      >
        <span className={classnames("left-text", { open: isOpen })}>开</span>
        <span className="float-right pr-3 text-gray-50 ">关</span>
        <span className={classnames("switch", { open: isOpen })}></span>
      </div>
    );
  }
}
