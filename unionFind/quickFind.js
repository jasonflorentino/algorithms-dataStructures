/** 
 * Class for a Union-Find data structure
 * that implements Quick Find.
 * Specifically, each array index stores that
 * vertex's root to make for a fast O(1) `find` operation.
 * On the other hand, more work needs to be done by
 * the `union` method to maintain this invariant, specifically O(n).
 */
class UnionFindQuickFind {
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
    return this.root[v];
  }

  /**
   * Performs a union on the two sets `x` and `y`
   * by updating `y`'s root, and all verticies whose 
   * have `y` as their root, to be `x`'s root.
   * @param {number} x - A vertex in a set to union with `y`
   * @param {number} y - A vertex in a set to union with `x`
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      for (let i = 0; i < this.root.length; i++) {
        if (this.root[i] === rootY) {
          this.root[i] = rootX;
        }
      }
    }
  }

  connected(x, y) {
    return this.root[x] === this.root[y];
  }
}

module.exports = UnionFindQuickFind;