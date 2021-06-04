import {throttle} from "../utils/index"
import {Point} from "../../types/index"

export class MousePointWatcher {
  clientPoint:Point
  screenPoint:Point

  constructor () {
    this.clientPoint = {x:0,y:0}
    this.screenPoint = {x:0,y:0}
    
    this.onMouseMove = throttle(this.onMouseMove,100).bind(this)
    this.getClientPoint = this.getClientPoint.bind(this)
    this.getScreenPoint = this.getScreenPoint.bind(this)

  }
  install () {
    document.addEventListener("mousemove",this.onMouseMove,true)//避免被阻止冒泡导致失效
  }
  uninstall () {
    document.removeEventListener("mousemove",this.onMouseMove,true)
  }
  getClientPoint () {
    return this.clientPoint
  }
  getScreenPoint () {
    return this.screenPoint
  }
  private onMouseMove (event:MouseEvent) {
    const {clientX,clientY,screenX,screenY} = event
    this.clientPoint = {
      x:clientX,
      y:clientY
    }
    this.screenPoint = {
      x:screenX - window.screenX,
      y:screenY - window.screenY
    }
  }
}