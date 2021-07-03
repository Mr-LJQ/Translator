import initialStorage from "./initialStorage"
import { pick } from "../utils/index"

import { Storage } from "../../types/index"

type StorageHandlers<T> = Partial<Record<keyof Storage, T>>
type StorageKeys = keyof Storage
type StorageValues = Storage[StorageKeys]

/**
 * 当handlers是一个对象
 *  注意：仅在其键存在相应的缓存/初始值时，回调才会调用
 *  注意：不保证调用顺序
 * @param handlers object / array
 */
export function getStorage(handlers: StorageKeys[], callback: (item: Partial<Storage>) => void): void
export function getStorage(handlers: StorageHandlers<(value: StorageValues) => void>, callback?: (item: Partial<Storage>) => void): void
export function getStorage(handlers: StorageHandlers<(value: StorageValues) => void> | StorageKeys[], callback?: (item: Partial<Storage>) => void): void {
  let storageKeys = handlersIsArray(handlers) ? handlers : Object.keys(handlers)
  const storage = pick(initialStorage, storageKeys)
  chrome.storage.local.get(storage, (_item) => {
    let item = _item as Partial<Storage>
    if (!handlersIsArray(handlers)) {
      (Object.keys(item)).forEach((key) => {
        const handler = handlers[key]
        const cacheValue = item[key]
        if (handler) {
          handler(cacheValue)
        }
      })
    }
    callback && callback(item)
  })
}

/**
 * 根据名称数组获取其对应的缓存对象
 * @param names array,需要获取的缓存项的名称数组
 * @returns object,对应的缓存对象
 */
export function getStorageItems<K extends StorageKeys>(names: K[]): Promise<Partial<Storage>> {
  return new Promise((resolve) => {
    getStorage(names, resolve)
  })
}

export function onStorageChange(handlers: StorageHandlers<(oldValue: StorageValues, newValue: StorageValues) => void>) {
  chrome.storage.onChanged.addListener((changes) => {
    Object.keys(changes).forEach((key) => {
      const handler = handlers[key as StorageKeys]
      if (handler) {
        const { oldValue, newValue } = changes[key]
        handler(oldValue, newValue)
      }
    })
  })
}

export function setStorage(items: Partial<Storage>, callback?: () => void) {
  chrome.storage.local.set(items, callback)
}

function handlersIsArray(handlers: StorageHandlers<(value: any) => void> | StorageKeys[]): handlers is StorageKeys[] {
  return Array.isArray(handlers)
}