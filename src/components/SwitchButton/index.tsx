import React from "react";
import "./index.less";

interface Props {
  onSwitchOpen?:(isOpen:boolean) => void
  defaultOpen?:boolean
}

export default class SwitchButton extends React.Component<Props> {
  state = {
    open: this.props.defaultOpen,
  };
  constructor(props:any) {
    super(props);
    this.switchOpen = this.switchOpen.bind(this)
  }

  switchOpen () {
    const {onSwitchOpen} = this.props
    const {open} = this.state
    this.setState({
      open:!open
    })
    onSwitchOpen && onSwitchOpen(!open)
  }

  render() {
    const { open } = this.state;
    let switchClass = "switch"
    let openTextClass = "left-text"
    if (open) {
      openTextClass += " open"
      switchClass += " open"
    }
    return (
      <div className="switch-button" onClick={this.switchOpen}>
        <span className={openTextClass}>开</span>
        <span className="right-text">关</span>
        <span className={switchClass}></span>
      </div>
    );
  }
}
