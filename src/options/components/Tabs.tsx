import React, {
  useMemo,
  useState,
  useImperativeHandle,
  ReactNode,
  forwardRef,
  ReactElement,
} from "react";
import classnames from "classnames";
import { TabPaneKey } from "../../utils/extensions-api";

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
  key: TabPaneKey;
}

export function TabPane(props: TabPaneProps) {
  const { children } = props;
  return <>{children}</>;
}

interface Props {
  activeKey: TabPaneKey;
  changeActiveKey: (activeKey: TabPaneKey) => void;
  children:
    | ReactElement<TabPaneProps, typeof TabPane>
    | ReactElement<TabPaneProps, typeof TabPane>[];
}

export default function Tabs(props: Props) {
  const { children, activeKey, changeActiveKey } = props;
  const tabs = useMemo(() => {
    return React.Children.map(children, (child) => {
      const element = child;
      return {
        item: element.props.tabItem,
        pane: element.props.children,
        key: element.key as TabPaneKey,
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
              onClick={() => changeActiveKey(key)}
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
