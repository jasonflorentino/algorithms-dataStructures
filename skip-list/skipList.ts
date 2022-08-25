class SkipListNode {
  key: number;
  topLayer: number;
  nexts: SkipListNode[];
  marked: boolean;
  fullyLinked: boolean;
  locked: boolean;
  
  constructor(v: number, topLayer: number) {
    this.key = v;
    this.topLayer = topLayer;
    this.nexts = new Array(topLayer + 1).fill(null);
    this.marked = false;
    this.fullyLinked = false;
    this.locked = false;
  }

  lock() {
    return;
  }

  unlock() {
    return;
  }
}

class SkipList {
  MaxHeight: number;
  LSentinel: SkipListNode;
  RSentinel: SkipListNode;
  
  constructor(maxHeight = 4) {
    this.MaxHeight = maxHeight;
    this.LSentinel = new SkipListNode(-Infinity, this.MaxHeight - 1);
    this.RSentinel = new SkipListNode(Infinity, this.MaxHeight - 1);

    for (let layer = 0; layer < this.MaxHeight; layer++) {
      this.LSentinel.nexts[layer] = this.RSentinel;
    }
    this.LSentinel.fullyLinked = true;
  }
  
  findNode(v: number, preds: SkipListNode[], succs: SkipListNode[]) {
    let lFound = -1;
    let pred = this.LSentinel;

    for (let layer = this.MaxHeight - 1; layer >= 0; layer--) {
      let curr = pred.nexts[layer];
      while (v > curr.key) {
        pred = curr;
        curr = pred.nexts[layer];
      }
      if (lFound === -1 && v === curr.key) {
        lFound = layer;
      }
      preds[layer] = pred;
      succs[layer] = curr;
    }

    return lFound;
  }

  add(v: number) {
    // These arrays will be filled in by findNode()
    let preds: SkipListNode[] = this.newMaxHeightArray();
    let succs: SkipListNode[] = this.newMaxHeightArray();

    while (true) {
      let lFound = this.findNode(v, preds, succs);
      if (lFound !== -1) {
        let nodeFound = succs[lFound];
        if (!nodeFound.marked) {
          while (!nodeFound.fullyLinked) {
            // Wait until it is fully linked.
            // This is for multi-threaded environments, 
            // (ie. another thread is already adding this value)
          }
          return false;
        }
        // Node is already marked for deletion by another thread.
        // Retry add
        continue;
      }

      // Lock and validate all predeccessors returned by findNode()
      let nodeTopLayer = this.randomLevel();
      let highestLocked = -1;
      try {
        let pred: SkipListNode;
        let succ: SkipListNode;
        let prevPred: SkipListNode;
        let valid = true;
        for (let layer = 0; valid && (layer <= nodeTopLayer); layer++) {
          pred = preds[layer];
          succ = succs[layer];
          if (pred !== prevPred) {
            pred.lock();
            highestLocked = layer;
            prevPred = pred;
          }
          valid = !pred.marked && !succ.marked && pred.nexts[layer] === succ;
        }
        if (!valid) {
          // Couldn't validate -- retry
          continue;
        }

        // All predecessors are valid, create and link up new node
        let newNode = new SkipListNode(v, nodeTopLayer);
        for (let layer = 0; layer <= nodeTopLayer; layer++) {
          newNode.nexts[layer] = succs[layer];
          preds[layer].nexts[layer] = newNode;
        }
        newNode.fullyLinked = true;
        return true;
      }
      finally {
        // Release all locks (and retry if no return)
        this.unlock(preds, highestLocked);
      }
    }
  }

  remove(v: number) {
    let nodeToDelete: SkipListNode;
    let isMarked = false;
    let topLayer = -1;
    let preds = this.newMaxHeightArray();
    let succs = this.newMaxHeightArray();

    while (true) {
      let lFound = this.findNode(v, preds, succs);
      if (isMarked || (lFound !== -1 && this.okToDelete(succs[lFound], lFound))) {
        if (!isMarked) {
          nodeToDelete = succs[lFound];
          topLayer = nodeToDelete.topLayer;
          nodeToDelete.lock();

          if (nodeToDelete.marked) {
            nodeToDelete.unlock();
            return false;
          }

          nodeToDelete.marked = true;
          isMarked = true;
        }

        let highestLocked = -1;
        try {
          let pred: SkipListNode;
          let succ: SkipListNode;
          let prevPred: SkipListNode;
          let valid = true;

          for (let layer = 0; valid && layer <= topLayer; layer++) {
            pred = preds[layer];
            succ = succs[layer];
            if (pred !== prevPred) {
              pred.lock();
              highestLocked = layer;
              prevPred = pred;
            }
            valid = !pred.marked && pred.nexts[layer] === succ;
          }

          if (!valid) {
            continue;
          }

          for (let layer = topLayer; layer >= 0; layer--) {
            preds[layer].nexts[layer] = nodeToDelete.nexts[layer];
          }

          nodeToDelete.unlock();
          return true;
        } finally {
          this.unlock(preds, highestLocked)
        }
      } else {
        return false;
      }
    }
  }

  okToDelete(node: SkipListNode, layer: number) {
    return node.fullyLinked 
      && node.topLayer === layer 
      && !node.marked;
  }

  contains(v: number) {
    let preds = this.newMaxHeightArray();
    let succs = this.newMaxHeightArray();
    let lFound = this.findNode(v, preds, succs);

    return lFound !== -1
      && succs[lFound].fullyLinked
      && !succs[lFound].marked;
  }

  randomLevel() {
    return Math.floor(Math.random() * this.MaxHeight)
  }

  newMaxHeightArray() {
    return new Array(this.MaxHeight).fill(null);
  }

  unlock(node, highestLocked) {
    return;
  }

  print() {
    this._print(this.LSentinel);
  }

  _print(node) {
    if (!node) return;
    console.log(`Key:${node.key} Nexts:[${node.nexts.map(node => node ? node.key : '-').join('|')}]`);
    this._print(node.nexts[0])
  }
}

//@ts-ignore
module.exports = SkipList;
