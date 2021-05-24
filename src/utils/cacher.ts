export class Cacher {
  private cacheSpace:any[]
  private cacheIndex:any[]
  private maxAmount:number
  constructor (amount = 5) {
    this.cacheSpace = []
    this.cacheIndex = []
    this.maxAmount = amount
  }
  set (key:any,value:any) {
    const {cacheIndex,cacheSpace,maxAmount} = this
    cacheIndex.push(key)
    cacheSpace.push(value)
    if (cacheIndex.length > maxAmount) {
      cacheIndex.shift()
      cacheSpace.shift()
    }
  }
  get (key:any) {
    const {cacheIndex,cacheSpace} = this
    const index = cacheIndex.lastIndexOf(key)
    return cacheSpace[index]
  }
  setMaxAmount (amount:number) {
    this.maxAmount = amount
  }
}