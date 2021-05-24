import React from "react"
import "./index.less"

interface Props {
  children:string
}

export default function Header(props:Props) {
  const {children} = props
  return (
    <header className="header-container">
      <h3 className="header-title">{children}</h3>
    </header>
  )
}