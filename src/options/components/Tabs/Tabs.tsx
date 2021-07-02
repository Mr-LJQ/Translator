import React, { Key, ReactElement, useMemo, useState } from "react";

import TabItem from "./TabItem";
import { TabPane, Props as TabPaneProps } from "./TabPane";

export interface Props {
  activeTabPane: string;
  children:
    | ReactElement<TabPaneProps, typeof TabPane>
    | ReactElement<TabPaneProps, typeof TabPane>[];
}

function Tabs(props: Props) {
  const { children, activeTabPane } = props;
  const [activeKey, setActiveKey] = useState<Key | null>(".$" + activeTabPane);

  const tabs = useMemo(() => {
    return React.Children.toArray(children).map((child) => {
      const element = child as ReactElement<TabPaneProps, typeof TabPane>;
      return {
        item: element.props.tabItem,
        pane: element.props.children,
        key: element.key,
      };
    });
  }, [children]);

  return (
    <div className="flex-1">
      <div className="flex border-b mb-0">
        {tabs.map((tabItem) => {
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
      {tabs.map((tab) => {
        const { key, pane } = tab;
        return (
          <div key={key} className={activeKey === key ? "black" : "hidden"}>
            {pane}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
