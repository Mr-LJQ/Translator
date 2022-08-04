
export enum TabPaneKey {
  Home = "HOME",
  Word = "WORD",
  Phrase = "PHRASE",
  Sentence = "SENTENCE"
}

export type WordConfig = Partial<CardInfoFields & WordFields>
export type PhraseConfig = Partial<CardInfoFields & PhraseFields>
export type SentenceConfig = Partial<CardInfoFields & SentenceFields>
export interface Storage extends Partial<AnkiConnectionFields> {
  wordConfig?: WordConfig,
  phraseConfig?: PhraseConfig,
  sentenceConfig?: SentenceConfig,
  isOpen?: boolean, //是否启用插件
  hotKey?: "shiftKey" | "ctrlKey" | "altKey"  //自动选词热键,必须与KeyboardEvent的属性一样
  activeTabPane?: TabPaneKey //打开options后，首先展示的选项卡
  openSelection?: boolean
  hiddenChinese?: boolean
}

type StorageHandlers<T extends any> = {
  [P in keyof T]: (value: T[P]) => void;
};
type StorageKeys = keyof Storage

//缓存默认值对象，用于在用户刚刚加载拓展，没有进行任何配置时作为初始配置。
export const initialStorage: Required<Storage> = {
  isOpen: true,
  hotKey: "shiftKey",
  activeTabPane: TabPaneKey.Home,
  ankiConnectionURL: "http://127.0.0.1:8765",
  ankiConnectionMethod: "AnkiConnection",
  wordConfig: {},
  phraseConfig: {},
  sentenceConfig: {},
  hiddenChinese: false,
  openSelection: true,
}

function handlersIsArray(handlers: StorageHandlers<Storage> | StorageKeys[]): handlers is StorageKeys[] {
  return Array.isArray(handlers)
}

/**
 * 当handlers是一个对象
 *  注意：仅在其键存在相应的缓存/初始值时，回调才会调用
 *  注意：不保证调用顺序
 * @param handlers object / array
 */
export function getStorage(handlers: StorageKeys[], callback: (item: Partial<Storage>) => void): void
export function getStorage(handlers: StorageHandlers<Storage>, callback?: (item: Partial<Storage>) => void): void
export function getStorage(handlers: StorageHandlers<Storage> | StorageKeys[], callback?: (item: Partial<Storage>) => void): void {
  let storageKeys = handlersIsArray(handlers) ? handlers : Object.keys(handlers)
  const storage = pick(initialStorage, storageKeys)
  chrome.storage.local.get(storage, (storage) => {
    if (!handlersIsArray(handlers)) {
      (Object.keys(storage)).forEach((key) => {
        const handler = handlers[key as keyof Storage]
        const cacheValue = storage[key]
        if (handler) {
          handler(cacheValue)
        }
      })
    }
    callback && callback(storage)
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

type StorageToCallback<T extends any> = {
  [P in keyof T]: (oldVal: T[P], newVal: T[P]) => void;
};

export function onStorageChange(handlers: StorageToCallback<Storage>) {
  let listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (changes) => {
    Object.keys(changes).forEach((key) => {
      const handler = handlers[key as StorageKeys]
      if (handler) {
        const { oldValue, newValue } = changes[key]
        handler(oldValue, newValue)
      }
    })
  }
  chrome.storage.onChanged.addListener(listener)
  return () => {
    chrome.storage.onChanged.removeListener(listener)
  }
}

export function setStorage(items: Partial<Storage>, callback?: () => void) {
  chrome.storage.local.set(items, callback)
}

