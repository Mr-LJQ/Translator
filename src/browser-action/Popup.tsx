import React from "react";
import {
  setStorage,
  TabPanelName,
  openOptionsPage,
  onStorageChange,
  getStorageByArray,
} from "@/extensions-api";
import Switch from "./Switch";
import { HotKey } from "@/types";
import { HotKeySelect } from "./HotKeySelect";

interface State {
  hotKey: HotKey;
  switchHotkeyAndSelectionListener: boolean;
  switchStrengthenSelectionByPressedCtrl: boolean;
}
export class Popup extends React.Component<Record<string, never>, State> {
  state: State = {
    hotKey: "shiftKey",
    switchHotkeyAndSelectionListener: true,
    switchStrengthenSelectionByPressedCtrl: true,
  };

  handleOpenOptionsPage = () => {
    setStorage({ checkedTabPanel: TabPanelName.Home }, openOptionsPage);
  };

  handleSwitchOpen = () => {
    const { switchHotkeyAndSelectionListener } = this.state;
    setStorage({
      switchHotkeyAndSelectionListener: !switchHotkeyAndSelectionListener,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const hotKey = event.target.value as HotKey;
    setStorage({ hotKey });
  };

  handleStrengthenSelectionByPressedCtrl = () => {
    const { switchStrengthenSelectionByPressedCtrl } = this.state;
    setStorage({
      switchStrengthenSelectionByPressedCtrl:
        !switchStrengthenSelectionByPressedCtrl,
    });
  };
  componentDidMount() {
    getStorageByArray(
      [
        "hotKey",
        "switchHotkeyAndSelectionListener",
        "switchStrengthenSelectionByPressedCtrl",
      ],
      ({
        hotKey,
        switchHotkeyAndSelectionListener,
        switchStrengthenSelectionByPressedCtrl,
      }) => {
        this.setState({
          hotKey,
          switchHotkeyAndSelectionListener,
          switchStrengthenSelectionByPressedCtrl,
        });
      }
    );
    onStorageChange({
      switchHotkeyAndSelectionListener: (
        _,
        switchHotkeyAndSelectionListener
      ) => {
        return this.setState({
          switchHotkeyAndSelectionListener,
        });
      },
      hotKey: (_, hotKey) => {
        return this.setState({
          hotKey,
        });
      },
      switchStrengthenSelectionByPressedCtrl: (
        _,
        switchStrengthenSelectionByPressedCtrl
      ) => {
        return this.setState({
          switchStrengthenSelectionByPressedCtrl,
        });
      },
    });
  }
  render() {
    const {
      hotKey,
      switchHotkeyAndSelectionListener,
      switchStrengthenSelectionByPressedCtrl,
    } = this.state;
    const {
      handleChange,
      handleSwitchOpen,
      handleOpenOptionsPage,
      handleStrengthenSelectionByPressedCtrl,
    } = this;
    return (
      <>
        <Header openOptionsPage={handleOpenOptionsPage}></Header>
        <main className=" bg-gray-200  rounded-tl-sm ">
          <Switch
            enabled={switchHotkeyAndSelectionListener}
            setEnabled={handleSwitchOpen}
            title="停用划词功能与热键选词功能"
          >
            开关插件
          </Switch>
          <Switch
            enabled={switchStrengthenSelectionByPressedCtrl}
            setEnabled={handleStrengthenSelectionByPressedCtrl}
            title="增强划词功能的效果，使其在按住Ctrl键时，能够查询可编辑框中的文本并且可以选中部分本来不可以选中的文本"
          >
            划词增强
          </Switch>
          <HotKeySelect hotKey={hotKey} handleChange={handleChange} />
        </main>
      </>
    );
  }
}

const Header = React.memo(function Header(props: {
  openOptionsPage: () => void;
}) {
  const { openOptionsPage } = props;
  return (
    <header className="p-1 border rounded-tr-sm text-xl  font-bold text-white bg-blue-gray ">
      <h1 className="inline">Options</h1>
      <button
        onClick={openOptionsPage}
        title="打开配置页,进行更多配置"
        className=" float-right mr-1 outline-none cursor-pointer focus:text-blue-400 "
      >
        ...
      </button>
    </header>
  );
});
