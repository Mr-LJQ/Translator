import React, { ReactNode } from "react";
import "./index.less"

export interface Props {
  tabItem:ReactNode
  children:ReactNode
}

export function TabPane(props:Props) {
  const {children} = props
  return (
    <>
      {children}
    </>
  );
}