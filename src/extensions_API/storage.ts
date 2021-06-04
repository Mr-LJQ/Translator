import { pick } from "../utils/index"

import { CachedOptions } from "../../types/index"

type GetStorageHandler = ((value: any) => void) | null
type StorageChangedHandler = (oldValue:any,newValue:any) => void

type StorageHandlers<T> = Partial<Record<keyof CachedOptions, T>>
type CachedOptionsKeys = Array<keyof CachedOptions>

//缓存默认值对象，用于在用户刚刚加载拓展，没有进行任何配置时作为初始配置。
const initialStorage: Partial<CachedOptions> = {
  isOpen: true,
  hotKey: "shiftKey",
  ankiConnectionURL: "http://127.0.0.1:8765",
}

/**
 * 注意：仅在其键存在相应的缓存/初始值时，回调才会调用
 * 注意：不保证调用顺序
 * @param handlers 一个对象，其键为缓存属性的名称，其值为用于处理的回调
 *  
 */
export function getStorage(handlers: StorageHandlers<GetStorageHandler>, callback?: (cacheItem: Partial<CachedOptions>) => void) {
  const cacheKeys = <CachedOptionsKeys>Object.keys(handlers)
  const storage = pick(initialStorage, cacheKeys)
  chrome.storage.local.get(storage, (cacheItem) => {
    (<CachedOptionsKeys>Object.keys(cacheItem)).forEach((cacheKey) => {
      const handler = handlers[cacheKey]
      const cacheValue = cacheItem[cacheKey]
      if (handler) {
        handler(cacheValue)
      }
    })
    callback && callback(cacheItem as Partial<CachedOptions>)
  })
}

export function onStorageChange(handlers: StorageHandlers<StorageChangedHandler>) {
  chrome.storage.onChanged.addListener((changes) => {
    (<CachedOptionsKeys>Object.keys(changes)).forEach((cacheKey) => {
      const handler = handlers[cacheKey]
      if (handler) {
        const { oldValue, newValue } = changes[cacheKey]
        handler(oldValue, newValue)
      }
    })
  })
}

export function setStorage(items: Partial<CachedOptions>, callback?: () => void) {
  chrome.storage.local.set(items, callback)
}
