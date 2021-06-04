import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";
import "./index.less";

import { CachedOptions } from "../../types/index";

import SwitchButton from "../components/SwitchButton/index";
import {
  onStorageChange,
  setStorage,
  getStorage,
} from "../extensions_API/storage";

type Props = Pick<CachedOptions, "hotKey" | "isOpen">;
type State = Pick<CachedOptions, "hotKey" | "isOpen">;

class Popup extends React.Component<Props, State> {
  state: State = {
    isOpen: this.props.isOpen,
    hotKey: this.props.hotKey,
  };

  hotkeys: Array<CachedOptions["hotKey"]> = [
    undefined,
    "shiftKey",
    "ctrlKey",
    "altKey",
  ];

  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.openOptionsPage = this.openOptionsPage.bind(this);
    this.handleSwitchOpen = this.handleSwitchOpen.bind(this);
  }

  componentDidMount() {
    onStorageChange({
      isOpen: (_, isOpen) => this.setState({ isOpen }),
      hotKey: (_, hotKey) => this.setState({ hotKey }),
    });
  }

  openOptionsPage() {
    chrome.runtime.openOptionsPage();
  }
  handleSwitchOpen() {
    let { isOpen } = this.state;
    isOpen = !isOpen;
    this.setState({ isOpen });
    setStorage({ isOpen });
  }
  handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const hotKey = event.target.value as CachedOptions["hotKey"];
    this.setState({ hotKey });
    setStorage({ hotKey });
  }
  render() {
    const { hotKey, isOpen } = this.state;
    return (
      <>
        <header className="header">
          Options
          <span id="more" onClick={this.openOptionsPage}>
            ...
          </span>
        </header>
        <main className="main">
          <div className="flex-container">
            <span className="title">打开/关闭插件</span>
            <SwitchButton isOpen={!!isOpen} onClick={this.handleSwitchOpen} />
          </div>
          <div className="flex-container">
            <label className="title" htmlFor="hotkey">
              自动取词热键
            </label>
            <select
              name="hotkey"
              id="hotkey"
              value={hotKey}
              onChange={this.handleChange}
            >
              {this.hotkeys.map((hotKey, index) => {
                if (!hotKey) return <option value=""></option>;
                return (
                  <option value={hotKey} key={index}>
                    {hotKey
                      .slice(0, -3)
                      .replace(/^[a-z]/gi, (letter) => letter.toUpperCase())}
                  </option>
                );
              })}
            </select>
          </div>
        </main>
      </>
    );
  }
}

getStorage({
  isOpen: null,
  hotKey: null,
},(props) => {
  ReactDOM.render(
    <Popup {...props} />,
    document.getElementById("root")
  );
});
