import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";
import "../index.css"

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
    setStorage({activeTabPane:"basis"},() => {
      chrome.runtime.openOptionsPage();
    })
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
        <header className="font-bold text-xl p-1 border rounded-tr-sm bg-blue-gray text-white">
          Options
          <span className="float-right mr-1 cursor-pointer" onClick={this.openOptionsPage}>
            ...
          </span>
        </header>
        <main className="bg-gray-200 rounded-tl-sm ">
          <div className="flex justify-between p-1 items-center">
            <span className="text-lg">开关插件</span>
            <SwitchButton isOpen={!!isOpen} onClick={this.handleSwitchOpen} />
          </div>
          <div className="flex justify-between p-1 items-center">
            <span className="text-lg">
              取词热键
            </span>
            <select
              className="rounded h-8 w-20"
              value={hotKey}
              onChange={this.handleChange}
            >
              {this.hotkeys.map((hotKey, index) => {
                if (!hotKey) return <option value="" key="default"></option>;
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

const root = document.getElementById("root") as HTMLElement
root.classList.add("w-44","m-1","text-sm")
getStorage(["isOpen","hotKey"],(props) => {
  ReactDOM.render(
    <Popup {...props} />,
    root
  );
});
