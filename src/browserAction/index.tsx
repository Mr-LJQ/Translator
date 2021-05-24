import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";
import "./index.less";

import {CachedOptions, HotKey} from "../../types/index"

import SwitchButton from "../components/SwitchButton/index";

type Props = Pick<CachedOptions,"hotKey" | "isOpen">

type State = Pick<CachedOptions,"hotKey">

class Popup extends React.Component<Props,State> {
  state:State = {
    hotKey:this.props.hotKey
  }
  
  hotkeys:Array<HotKey> = [undefined,"shiftKey","ctrlKey","altKey"]

  constructor (props:Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.openOptionsPage = this.openOptionsPage.bind(this)
    this.handleSwitchOpen = this.handleSwitchOpen.bind(this)
  }

  openOptionsPage () {
    chrome.runtime.openOptionsPage()
  }
  handleSwitchOpen (isOpen:boolean) {
    chrome.storage.local.set({
      isOpen
    })
  }
  handleChange (event:ChangeEvent<HTMLSelectElement>) {
    const hotKey = event.target.value as HotKey
    this.setState({
      hotKey
    })
    chrome.storage.local.set({
      hotKey
    })
  }
  render () {
    const {hotKey} = this.state
    const {isOpen} = this.props
    return (
      <>
        <header className="header">
          Options
          <span id="more" onClick={this.openOptionsPage}>...</span>
        </header>
        <main className="main">
          <div className="flex-container">
            <span className="title">打开/关闭插件</span>
            <SwitchButton defaultOpen={isOpen} onSwitchOpen={this.handleSwitchOpen}/>
          </div>
          <div className="flex-container">
            <label className="title">自动取词热键</label>
            <select name="hotkey" id="hotkey" value={hotKey} onChange={this.handleChange}>
              {
                this.hotkeys.map((hotKey,index) => {
                  if (!hotKey) return <option value=""></option>
                  return <option value={hotKey} key={index}>{hotKey.slice(0,-3).replace(/^[a-z]/ig,(letter)=>letter.toUpperCase())}</option>
                })
              }
            </select>
          </div>
        </main>
      </>
    );
  }
}

const cachedOptions:Partial<CachedOptions> = {
  hotKey:"shiftKey",
  isOpen:true,
}

chrome.storage.local.get(cachedOptions,({
  hotKey,
  isOpen
}:Partial<CachedOptions>) => {
  ReactDOM.render(<Popup 
    hotKey={hotKey}
    isOpen={!!isOpen}
  />, document.getElementById("root"));
  
})

