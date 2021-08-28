/** 
 * Class for a Union-Find data structure
 * that implements Lazy Unions, Union By Rank, and Path Compression.
 * Since the running time of `find` is proportional to the number of
 * parent pointers we need to traverse, the worst case is calling `find`
 * on the leaf furthest away from its root. Since we're using Union By Rank,
 * this is at most O(log n) hops away, but if we need to run `find` on this
 * same object over and over again, we'll be doing that work every time.
 * To optimize this we'll now update an object's parent pointer to its
 * roots once we find it, essentially caching the information and 
 * avoiding re-computing the root in future calls to `find`.
 * 
 * Hopcroft-Ullman proved in 1973 that the performance of this 
 * data structure over `m` operations is O(m log\*n) -- log* being 
 * the Iterated Logarithm Function, which is at most 5 for pretty much 
 * any value of `n`.
 * 
 * Then in 1975, Tarjan proved a O(m alpha(n)) performance guarantee 
 * on this data structure. (alpha is the Inverse Ackermann Function)
 * In general for pretty much any value of `n`, alpha(n) is at 
 * most 4, so (like Hopcroft-Ullman proved) this is practically a 
 * linear time bound but not technically.
 */
 class UnionFindPathCompression {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  /**
   * Finds the root vertex of `v`
   * If the parent of `v` is itself, then it is the root, return `v`.
   * Otherwise we call `find` on the parent of `v`, and assign the
   * returned root to be the direct parent of `v`, thus avoiding
   * having to find it again in future calls.
   * @param {number} v - The vertex for which to find the root
   * @returns {number} The root vertex of `v`
   */
  find(v) {
    if (this.parent[v] === v) return v;
    return this.parent[v] = this.find(this.parent[v]);
  }

  /**
   * Performs a union on the two sets involving `x` and `y`
   * using Union By Rank: The tree whose root has the smaller 
   * rank gets installed as a subtree under the root with 
   * the larger rank. In the case the both ranks are equal, we
   * arbitrarily choose one to be the new root but must increment 
   * its rank by 1.
   * @param {number} x - A vertex in a set to union with `y`
   * @param {number} y - A vertex in a set to union with `x`
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      }
      else if (this.rank[rootY] > this.rank[rootX]) {
        this.parent[rootX] = rootY;
      }
      else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

module.exports = UnionFindPathCompression;