import React, {
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from "react";
import classnames from "classnames";
import "./index.less";

import TabItem from "./TabItem";
import {Props as TabPaneProps} from "./TabPane"

export interface Props {
  initActiveKey: string;
  children: ReactElement<TabPaneProps> | ReactElement<TabPaneProps>[]
  tabsContainerClass?:string
}

function Tabs(props: Props) {
  const { children, initActiveKey ,tabsContainerClass} = props;
  const [activeKey, setActiveKey] = useState(".$"+initActiveKey);
  
  const tabs = useMemo(() => {
    return toArray(children);
  }, [children]);

  const tabItems = useMemo(() => {
    return tabs.map((tab) => {
      return {
        item: tab.item,
        key: tab.key,
      };
    });
  }, [tabs]);
  
  return (
    <div className={classnames(tabsContainerClass)}>
      <div className={classnames("tab-items-container")}>
        {tabItems.map((tabItem) => {
          const { key, item } = tabItem;
          return (
            <TabItem
              key={key}
              checked={key === activeKey}
              onClick={() => setActiveKey(key)}
            >
              {item}
            </TabItem>
          );
        })}
      </div>
      <div className={classnames("tabs-content-container")}>{tabs.map((tab) => {
        const {key,pane} = tab
        return (
          <div key={key} className={classnames("tab-panes-container",{active:activeKey === key})}>
            {pane}
          </div>
        )
      })}</div>
    </div>
  );
}

export default Tabs;

interface Tab {
  key: string;
  item: ReactNode;
  pane: ReactNode;
}

/**
 * 对React.Children.toArray的封装，其目的在于修正key
 */
function toArray(children: ReactNode | ReactNode[]): Tab[] {
  return React.Children.toArray(children).reduce((tabs: Tab[], child) => {
    if (!React.isValidElement(child)) return tabs;
    let key = child.key;
    if (!key) return tabs;
    tabs.push({
      key:String(key),
      item: child.props.tabItem,
      pane: child.props.children,
    });
    return tabs;
  }, []);
}
