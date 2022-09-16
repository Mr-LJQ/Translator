export class Cache<K, V> {
  private map: Map<K, V>;
  private max: number;
  constructor(max: number) {
    this.map = new Map();
    this.max = max;
  }
  set(key: K, value: V) {
    const map = this.map;
    const max = this.max;
    if (map.size >= max) {
      map.delete(map.keys().next().value);
    }
    return map.set(key, value);
  }
  get(key: K) {
    return this.map.get(key);
  }
}
