/** 
 * Class for a Union-Find data structure
 * that implements Quick Union.
 * Specifically, each array index stores that
 * vertex's parent. A `find` operatrion would now
 * need to traverse up to `n` parent pointers to
 * find the root. Conversely, the `union` method
 * is simpler but still needs x2 O(n) `find` operations.
 * Determining if two vertices are part of the same set
 * now also takes O(n) because of this change to `find`.
 */
 class UnionFindQuickUnion {
  constructor(size) {
    this.root = new Array(size);

    for (let i = 0; i < size; i++) {
      this.root[i] = i;
    }
  }

  /**
   * Finds the root vertex of `v`
   * @param {number} v - The vertex for which to find the root
   * @returns {number} The root vertex of `v`
   */
  find(v) {
    while (v !== this.root[v]) {
      v = this.root[v];
    }
    return v;
  }

  /**
   * Performs a union on the two sets `x` and `y`
   * by updating `y`'s root, to be `x`'s root, BUT
   * does not update those vertices that hold `y` as their parent.
   * @param {number} x - A vertex in a set to union with `y`
   * @param {number} y - A vertex in a set to union with `x`
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      this.root[rootY] = rootX;
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

module.exports = UnionFindQuickUnion;