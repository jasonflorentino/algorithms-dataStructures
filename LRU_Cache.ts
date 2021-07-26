/**
 * My implementation of an LRU Cache
 * for the LeetCode problem:
 * https://leetcode.com/problems/lru-cache/
 * 
 * At first I had a hard time getting a Linked List idea to work
 * correctly. After also trying (and failing) to apply a heap,
 * I made my first working implementation simply have each 
 * value keep track of when it was last accessed, and eviction 
 * happened by iterating through all values to find the oldest.
 * That O(n) implementation ran in 3044 ms on LeetCode,
 * but at least it was correct.
 * 
 * After another day of being tortured by this problem, 
 * I finally was able to get my linked list implementation to run
 * without error. Now O(1), this implementation ran in 668 ms with 
 * only a 4% increase in memory usage -- even after I 
 * added more comments, variables, and functions for clarity.
 * 
 * —Jason, Jul 16, 2021.
 */

/**
 * Struct def for the linked list nodes 
 * All keys will be numbers, but I label the HEAD
 * and TAIL node for easy debugging.
 */
class LLNode {
  key: number | string;
  val: number;
  next:LLNode | null = null;
  prev:LLNode | null = null;
}

/**
 * Maintain a doubly linked list to get
 * the least recently used in O(1).
 * `tail.prev` points to oldest accessed key.
 * `head.next` points to latest accessed key.
 * `head.next` continually gets updated to
 * the latest for each get/put operation.
 * `this.cache` allows for O(1) access to a key's value.
 */
class LRUCache {
  capacity: number;
  load  = 0;
  cache = {};
  head  = new LLNode();
  tail  = new LLNode();

  constructor(c: number) {
    this.capacity  = c;
    this.head.key  = "HEAD"; // Labelled for debugging
    this.head.next = this.tail;
    this.tail.key  = "TAIL"; // Labelled for debugging
    this.tail.prev = this.head;
  }

  put(key: number, val: number): void {
    let node = this.cache[key];
    if (node) return this._updateCache(node, key, val);
    else this._createNewNode(key, val);
    if (this._isFull()) this._evict();
  }

  get(key: number): number {
    let node = this.cache[key];
    if (!node) return -1;
      
    const val = node.val;
    this._updateCache(node, key, val);
    return val;
  }

  _updateCache(old: LLNode, key: number, val: number): void {
    this._deleteNode(old);
    this._createNewNode(key, val);
  }

  _isFull(): boolean {
    return this.load > this.capacity;
  }

  _evict(): void {
    const oldest = this.tail.prev;
    this._deleteNode(oldest);
  }
  
  _deleteNode(node: LLNode): void {
    const key = node.key;

    // De-reference node by connecting node's 
    // prev and next to each other instead of node
    const earlier = node.prev;
    const later   = node.next;
    earlier.next  = later;
    later.prev    = earlier;

    delete this.cache[key];
    this.load--;
  }
  
  _createNewNode(key: number, val: number): void {
    let node = new LLNode();
    node.key = key;
    node.val = val;
      
    this.cache[key] = node;
    this._addToFront(node);
    this.load++;
  }
  
  _addToFront(node: LLNode): void {
    if (this._isAlreadyInFront(node)) return;

    // Splice node between Head and Head's next
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next      = node;
  }

  _isAlreadyInFront(node: LLNode): boolean {
    const latest = this.head.next;
    return node === latest;
  }
}
