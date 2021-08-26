/** 
 * Class for a Union-Find data structure
 * that implements Lazy Unions and Union By Rank.
 * We now maintain a rank for each vertex which counts
 * the number of 'hops' to get to its deepest child.
 * Ie. The rank of a vertex `x` is the largest number of parent
 * pointers that need to be traversed to get from some leaf to `x`.
 * The biggest rank amongst all the objects gives an upper bound on 
 * the worst-case running time of `find`.
 * And in fact, with Union By Rank, the maximum rank of any node is
 * bounded above by log2(n) where `n` is the number of objects in the
 * data structure. Thus now giving us a logarithmic running time bound 
 * on `find`, `union`, and `connected`.
 */
 class UnionFindUnionByRank {
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
   * @param {number} v - The vertex for which to find the root
   * @returns {number} The root vertex of `v`
   */
  find(v) {
    while (v !== this.parent[v]) {
      v = this.parent[v];
    }
    return v;
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

module.exports = UnionFindUnionByRank;