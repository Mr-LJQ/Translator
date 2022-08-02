import type { Point } from "@/types";

export class CursorListener {
  private clientPoint:Point = { x: 0, y: 0 }
  private screenPoint:Point = { x: 0, y: 0 }
  getClientPoint = () => {
    return this.clientPoint;
  }
  getScreenPoint = () => {
    return this.screenPoint;
  }
  install = () => {
    document.addEventListener("mousemove", this.onMouseMove, true); //避免被阻止冒泡导致失效
  }
  uninstall = () => {
    document.removeEventListener("mousemove", this.onMouseMove, true);
  }
  private onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY, screenY, screenX } = event;
    this.clientPoint = {
      x: clientX,
      y: clientY,
    };
    this.screenPoint = {
      x: screenX,
      y: screenY,
    };
  }
}
