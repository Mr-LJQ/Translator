/**
 * 纯类，实现历史记录的类，其特点是有最大上限，达到最大上限后，队列最后的元素会被取代
 */
type SubscribeCallback = (index: number, head: number, tail: number) => void;

export class History<T> {
  head: number;
  tail: number;
  index: number;
  maxAmount: number;
  store: Array<T>;
  subscribes: Array<SubscribeCallback>;

  constructor(maxAmount = 10) {
    this.head = 0;
    this.tail = -1;
    this.index = -1;
    this.store = [];
    this.subscribes = [];
    this.maxAmount = maxAmount;
  }
  prev() {
    const { head, index, maxAmount } = this;
    if (index <= head) return;
    this.index--;
    this.subscribes.forEach((fn) => {
      return fn(this.index, this.head, this.tail);
    });
    return this.store[this.index % maxAmount];
  }
  next() {
    const { tail, index, maxAmount } = this;
    if (index >= tail) return;
    this.index++;
    this.subscribes.forEach((fn) => {
      return fn(this.index, this.head, this.tail);
    });
    return this.store[this.index % maxAmount];
  }
  append(value: T) {
    this.index++;
    const { store, maxAmount, index, head } = this;
    this.tail = index;
    this.head = Math.max(index + 1 - maxAmount, head);
    this.subscribes.forEach((fn) => {
      return fn(this.index, this.head, this.tail);
    });
    store[index % maxAmount] = value;
    return value;
  }
  update(value: T) {
    const { index, maxAmount, store } = this;
    store[index % maxAmount] = value;
    return value;
  }
  subscribe(callback: SubscribeCallback) {
    this.subscribes.push(callback);
    return () => {
      this.subscribes = this.subscribes.filter(function (fn) {
        return fn !== callback;
      });
    };
  }
}
