class LinkNode<K, V> {
  key: K;
  val: V;
  next: LinkNode<K, V> | null;
  prev: LinkNode<K, V> | null;
  constructor(key: K, val: V) {
    this.val = val;
    this.key = key;
    this.next = null;
    this.prev = null;
  }
}
export class Cache<K, V> {
  capacity: number;
  map: Map<K, LinkNode<K, V>> = new Map();
  head: LinkNode<K, V> = new LinkNode(null, null) as unknown as LinkNode<K, V>; //伪头部
  tail: LinkNode<K, V> = new LinkNode(null, null) as unknown as LinkNode<K, V>; //伪尾部
  constructor(capacity: number) {
    if (capacity < 1) throw RangeError("capacity 必须大于等于 1");
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: K): V | -1 {
    const node = this.map.get(key);
    if (!node) return -1;
    this.update(node);
    return node.val;
  }

  set(key: K, value: V): void {
    const { map, capacity, head } = this;
    const node = map.get(key);
    if (node) {
      node.val = value;
      this.update(node);
    } else {
      if (map.size >= capacity) {
        // head.next 是必定存在的，因为额外添加了伪尾部
        const node = head.next!;
        this.delete(node);
        map.delete(node.key);
      }
      const node = new LinkNode(key, value);
      map.set(key, node);
      this.moveToTail(node);
    }
  }

  private delete(node: LinkNode<K, V>): void {
    // node.prev/next 是必定存在的，因为额外添加了伪头部和伪尾部
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToTail(node: LinkNode<K, V>): void {
    const { tail } = this;
    // tail.prev 是必定存在的，因为额外添加了伪头部
    const temp = tail.prev!;
    tail.prev = node;
    node.next = tail;
    temp.next = node;
    node.prev = temp;
  }
  private update(node: LinkNode<K, V>) {
    this.delete(node);
    this.moveToTail(node);
  }
}
