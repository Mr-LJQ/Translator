import React from "react"
import classnames from "classnames"


import "./AddButton.less"

import { AnkiCallback, AnkiResponse } from "../../../types/index"

interface Props {
  hidden?:boolean,
  initStatusText:string
  onClick:(
    callback:AnkiCallback
  ) => void
}

interface State {
  status:0 | 1 | 2 | 3 
  statusText:string
}

export default class AddButton extends React.Component<Props> {
  state:State = {
    status:0,
    statusText:this.props.initStatusText
  }

  statusIcons = ["➕","✔","✖","..."]

  repeatFlag = false

  constructor(props:Props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (this.repeatFlag) return
    this.repeatFlag = true
    const {onClick} = this.props
    this.setState({
      status:3,
      statusText:"正在添加..."
    })
    
    onClick(({status,statusText}:AnkiResponse) => {
      this.setState({
        status,
        statusText
      })
      //如果错误则在两秒后重新展示添加按钮，以引导用户再次添加
      if (status === 2) {
        setTimeout(() => {
          this.setState({
            status:0,
            statusText:this.props.initStatusText
          })
          this.repeatFlag = false
        }, 5000);
      }
    })
  }

  render () {
    const {hidden} =  this.props
    const {status,statusText} = this.state
    return (
      <span 
        hidden={hidden}
        title={statusText} 
        className={classnames("add_note",{error:status === 2,success:status === 1})} 
        onClick={this.handleClick}
      >{this.statusIcons[status]}</span>
    )
  }
}