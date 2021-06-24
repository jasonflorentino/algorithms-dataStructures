class HeapNode {
  key: number;
  val: any;

  constructor(key: number, val: any) {
    this.key = key;
    this.val = val;
  }
}

class Heap {
  len: number = 0;
  arr: HeapNode[] = [];

  constructor() {
    // Allow construction with arbitrary number 
    // of Number arguments.
    for (let i = 0; i < arguments.length; i++) {
      const val = arguments[i];
      if (typeof val !== typeof 1) {
        console.log(`Cannot add ${val} with type ${typeof val}. Must add a Number value.`)
        continue;
      }
      this.insert(val, val);
    }
  }

  extractMin() {
    if (!this.arr[this.len]) throw 'Empty heap';
    const val = this.arr[1].val;
    this.arr[1] = this.arr[this.len--];
    this.bubbleDown(1);
    return val;
  }

  insert(key: number, val: any) {
    const i = ++this.len;
    const n = new HeapNode(key, val);
    this.arr[i] = n;
    this.bubbleUp(i);
  }

  bubbleUp(i: number) {
    if (i <= 1) return;
    const pIndex = i >> 1;
    const c = this.arr[i];
    const p = this.arr[pIndex];
    if (p.key < c.key) return;
    this.swap(i, pIndex);
    this.bubbleUp(pIndex);
  }

  bubbleDown(i: number) {
    if (i === this.len) return;
    const lIndex = i * 2;
    const rIndex = i * 2 + 1;
    const cKey = this.arr[i].key;
    const lNode = this.arr[lIndex];
    const rNode = this.arr[rIndex];
    // Return if current has no children
    if (!lNode && ! rNode) return;
    // Return if both children are larger than current
    if (cKey < lNode?.key && cKey < rNode?.key) return;
    // Determine index of smallest child
    const smallChildIndex = lNode?.key < rNode?.key ? lIndex : rIndex;
    this.swap(i, smallChildIndex);
    this.bubbleDown(smallChildIndex);
  }

  print() {
    let output = "";
    for (let i = 1; i <= this.len; i++) {
      output += `${this.arr[i].val}, `
    }
    console.log(output);
  }

  swap(a: number, b: number) {
    const temp = this.arr[a];
    this.arr[a] = this.arr[b];
    this.arr[b] = temp;
  }
}

const heap = new Heap(9,8,7,6,5,4,3,2,1);
// heap.insert(1000, "1000")
// heap.insert(100, "100")
// heap.insert(10, "10")
// heap.insert(1, "1")
// heap.insert(30, "30")
// heap.insert(15, "15")
let min = heap.extractMin();
heap.print();
console.log(min);