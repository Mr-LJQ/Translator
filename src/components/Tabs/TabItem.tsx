import React, { ReactNode } from "react"
import classnames  from "classnames"

interface Props {
  children:ReactNode
  className?:string
  checked:boolean
  onClick:() => void
}

function TabItem(props:Props) {
  const {children,className,checked,onClick} = props
  const tabItemClass = classnames("tab-item",{active:checked},className)
  return (
    <div className={tabItemClass} onClick={onClick}>
      {children}
    </div>
  )
}

export default TabItem