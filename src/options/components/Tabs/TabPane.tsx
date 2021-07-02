import React, { ReactNode } from "react";
import { TabPaneKey } from "../../../../types/index";

export interface Props{
  tabItem:ReactNode
  children:ReactNode
  key:TabPaneKey
}

export function TabPane(props:Props) {
  const {children} = props
  return (
    <>
      {children}
    </>
  );
}