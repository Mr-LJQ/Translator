import React, { Key, ReactElement, useMemo, useState, ReactNode } from "react";
import classnames from "classnames";

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

interface TabItemProps {
  children: ReactNode;
  checked: boolean;
  onClick: () => void;
}

function TabItem(props: TabItemProps) {
  const { children, checked, onClick } = props;
  return (
    <div
      className={classnames(
        "first:ml-0 mx-2 mt-1 px-2 text-base font-bold text-gray-600  cursor-pointer flex-shrink-0",
        { "text-red-600 border-red-600 border-b-2": checked }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface TabPaneProps {
  tabItem: ReactNode;
  children: ReactNode;
  key: Key;
}

export function TabPane(props: TabPaneProps) {
  const { children } = props;
  return <>{children}</>;
}

export default Tabs;
