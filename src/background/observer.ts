/**
 * 简单的订阅监听模式，用于转接消息。
 */
type callback = (data: unknown) => void;
export class Observer {
  callbacksCache:{[callback:string]:callback[]}
  constructor() {
    this.callbacksCache = {}
  }
  emit(name:string, data: unknown):this {
    const callbacks = this.callbacksCache[name]
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
    return this
  }
  on (name:string,callback:callback) {
    let callbacks = this.callbacksCache[name]
    if (!callbacks) {
      this.callbacksCache[name] = callbacks = []
    }
    callbacks.push(callback)
    return this
  }
  remove (name:string,callback:callback) {
    const callbacks = this.callbacksCache[name]
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index,1)
      }
    }
    return this
  }
  once(name:string,callback:callback) {
    return this.on(name,(data:unknown) => {
      callback(data)
      this.remove(name,callback)
    })

  }
}