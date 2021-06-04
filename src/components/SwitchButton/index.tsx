import React from "react";
import classnames from "classnames"
import "./index.less";

interface Props {
  onClick?: () => void;
  isOpen: boolean;
}

export default class SwitchButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { isOpen,onClick } = this.props;
    let switchClass = classnames("switch",{open:isOpen})
    let openTextClass = classnames("left-text",{open:isOpen})
    return (
      <div className="switch-button" onClick={onClick}>
        <span className={openTextClass}>开</span>
        <span className="right-text">关</span>
        <span className={switchClass}></span>
      </div>
    );
  }
}

