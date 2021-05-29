import React, { ReactNode } from "react";
import { TabPaneKey } from "../../../types/index";
import "./index.less"

export interface Props<T = string> {
  tabItem:ReactNode
  children:ReactNode
  key:T
}

export function TabPane(props:Props) {
  const {children} = props
  return (
    <>
      {children}
    </>
  );
}