export class Cacher<K = any, T = any> {
  private cacheSpace: T[]
  private cacheIndex: K[]
  private maxAmount: number
  private index: number
  constructor(amount = 5) {
    this.cacheSpace = []
    this.cacheIndex = []
    this.maxAmount = amount
    this.index = 0
  }
  set(key: K, value: T) {
    const { cacheIndex, cacheSpace, maxAmount, index } = this
    cacheIndex[index] = key
    cacheSpace[index] = value
    this.index++
    if (this.index >= maxAmount) {
      this.index -= maxAmount
    }
  }
  get(key: K) {
    const { cacheIndex, cacheSpace } = this
    const index = cacheIndex.lastIndexOf(key)
    return cacheSpace[index]
  }
  setMaxAmount(amount: number) {
    this.maxAmount = amount
  }
}

/**
 * prev：获取当前指针的上一个历史，并将指针移动到目标位置
 * next：获取当前指针的下一个历史，并将指针移动到目标位置
 * update：更新当前指针的历史，指针不动
 * append:添加一个新历史到下一个指针位置，并将指针移动到目标位置
 */
export class History<T> {
  private cacheSpace: T[]
  private maxAmount: number
  private tail: number
  private head: number
  private index: number
  constructor(maxAmount = 10) {
    this.cacheSpace = []
    this.head = 0
    this.tail = -1
    this.index = -1
    this.maxAmount = maxAmount
  }
  prev() {
    const { head, index } = this
    if (index <= head) return
    this.index--
    return this.cacheSpace[this.index]
  }
  next() {
    const { tail, index } = this
    if (index >= tail) return
    this.index++
    return this.cacheSpace[this.index]
  }
  append(value: T) {
    this.index++
    const { cacheSpace, maxAmount, tail, index } = this
    if (index > tail) {
      this.tail = index
      this.head = Math.max(index - maxAmount + 1, 0)
    }
    cacheSpace[index % maxAmount] = value
    return value
  }
  update(value: T) {
    const { index, maxAmount, cacheSpace } = this
    cacheSpace[index % maxAmount] = value
    return value
  }
}