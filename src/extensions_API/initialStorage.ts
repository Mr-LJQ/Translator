import { Storage} from "../../types/index"

//缓存默认值对象，用于在用户刚刚加载拓展，没有进行任何配置时作为初始配置。
const initialStorage: Partial<Storage> = {
  isOpen: true,
  hotKey: "shiftKey",
  activeTabPane: "basis",
  ankiConnectionURL: "http://127.0.0.1:8765",
  ankiConnectionMethod:"AnkiConnection",
}

export default initialStorage