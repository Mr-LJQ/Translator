export class Cacher<K = any,T = any> {
  private cacheSpace:T[]
  private cacheIndex:K[]
  private maxAmount:number
  constructor (amount = 5) {
    this.cacheSpace = []
    this.cacheIndex = []
    this.maxAmount = amount
  }
  set (key:K,value:T) {
    const {cacheIndex,cacheSpace,maxAmount} = this
    cacheIndex.push(key)
    cacheSpace.push(value)
    if (cacheIndex.length > maxAmount) {
      cacheIndex.shift()
      cacheSpace.shift()
    }
  }
  get (key:K) {
    const {cacheIndex,cacheSpace} = this
    const index = cacheIndex.lastIndexOf(key)
    return cacheSpace[index]
  }
  setMaxAmount (amount:number) {
    this.maxAmount = amount
  }
}


export class History<T> {
  private cacheSpace:T[]
  maxAmount:number
  tail:number
  head:number 
  constructor (maxAmount = 10) {
    this.cacheSpace = []
    this.head = 0
    this.tail = -1
    this.maxAmount = maxAmount
  }
  
  get (index:number) {
    const {head,tail} = this
    //index出界时返回undefined
    if (index < head || index > tail) return 
    //保证最多只能够有maxAmount个
    return this.cacheSpace[index % this.maxAmount]
  }
  set (index:number,value:T) {
    const {cacheSpace,maxAmount,tail,head} = this
    
    if (index > tail) {
      this.tail = index
      this.head = Math.max(index - maxAmount + 1,0)
    } 

    cacheSpace[index % maxAmount] = value
    return this
  }
  size () {
    return this.cacheSpace.length
  }
  setMaxAmount (maxAmount:number)  {
    this.maxAmount = maxAmount
    return this
  }
}