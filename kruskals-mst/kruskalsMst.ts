const UnionFind = require("../unionFind");

// Types
type WeightedEdge = [number, number, number]
type EdgeList = Array<WeightedEdge>
interface LookUpTable { [prop: number]: undefined | true }

// Sample Input
const G: EdgeList = [
  [1,2,1], [1,3,7],
  [2,3,5], [2,4,4], [2,5,3],
  [3,5,6],
  [4,5,2]
]

// Expected Output
const MST: EdgeList = [ 
  [1,2,1], [4,5,2], [2,5,3], [2,3,5] 
]

// Main script
const fns = [kruskalsMstSimple, kruskalsMst];
for (const fn of fns) {
  console.log(`Running ${fn.name}...`);
  const output = fn(G);
  const result = assertEdgeListsMatch(MST, output);
  console.log("Output matches:", result);
}

/**
 * Straightforward implementation - O(mn)
 * Uses graph search to check for cycles in O(n),
 * which is better than checking the exponentially 
 * many spanning trees, but we can do better!
 */
function kruskalsMstSimple(graph: EdgeList): EdgeList {
  graph.sort((a, b) => a[2] - b[2]);
  const T = [];
  for (const edge of graph) {
    if (!wouldMakeCycle(T, edge[0], edge[1])) {
      T.push(edge);
    }
  }
  return T;
}

/**
 * Implementation with Union-Find - O(m log m)
 * By using a Union-Find data structure to check for 
 * cycles in O(1) time (Actually O(alpha(n)) per Tarjan, 1975),
 * the overall running time is now constrained by the sorting
 * we do at the beginning.
 */
 function kruskalsMst(graph: EdgeList): EdgeList {
  graph.sort((a, b) => a[2] - b[2]);
  const V = getMaxVfromEdgeList(graph);
  const disjointSet = new UnionFind(V + 1);
  const T = [];
  for (const edge of graph) {
    const [u, v] = edge;
    if (!disjointSet.connected(u, v)) {
      T.push(edge);
      disjointSet.union(u, v);
    }
  }
  return T;
}

/**
 * Given a graph represented as an Edge List `g`, 
 * a starting vertex `s` and a target vertex `t`, 
 * use DFS to determine if `t` is reachable from `s`. 
 * This means that adding an edge between 
 * `s` and `t` would create a cycle in `g`.
 * @returns {boolean} True if `s` is reachable from `t`. False otherwise
 */
function wouldMakeCycle(g: EdgeList, s: number, t: number): boolean {
  const stack = [s];
  const visited: LookUpTable = {};
  while (stack.length) {
    const v = stack.pop();
    if (v === t) return true;
    if (!visited[v]) {
      visited[v] = true;
      for (const e of g) {
        if (e[0] === v && !visited[e[1]]) stack.push(e[1]);
        if (e[1] === v && !visited[e[0]]) stack.push(e[0]);
      }
    }
  }
  return false;
}

// Used to get the 'number of vertices' from our edge list
// for initializing out Disjoint Set
function getMaxVfromEdgeList(g: EdgeList): number {
  let highest = 0;
  for (const edge of g) {
    const [u, v] = edge;
    if (u > highest) highest = u;
    if (v > highest) highest = v;
  }
  return highest;
}

// Used to check if output is correct
function assertEdgeListsMatch(a: EdgeList, b: EdgeList): boolean {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}