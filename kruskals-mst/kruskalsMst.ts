// Imports
import { EdgeList, LookUpTable, } from "./types";
const UnionFind = require("../unionFind");

/**
 * Straightforward implementation - O(mn)
 * Uses graph search to check for cycles in O(n),
 * which is better than checking the exponentially 
 * many spanning trees, but we can do better!
 */
export function kruskalsMstSimple(graph: EdgeList): EdgeList {
  sortEdgesByWeight(graph);
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
 * the overall running time is now bounded above by the 
 * sorting we do at the beginning.
 */
export function kruskalsMst(graph: EdgeList): EdgeList {
  sortEdgesByWeight(graph);
  const V = getMaxVfromEdgeList(graph);
  const disjointSet = new UnionFind(V + 1); // our UnionFind[i] >= 0, but our EdgeList[i] >= 1
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

/**
 * Used to get the 'number of vertices' from our edge list
 * for initializing out Disjoint Set
 */
function getMaxVfromEdgeList(g: EdgeList): number {
  let highest = 0;
  for (const edge of g) {
    const [u, v] = edge;
    if (u > highest) highest = u;
    if (v > highest) highest = v;
  }
  return highest;
}

/**
 * Sorts edges by weight in ascending order
 */
 function sortEdgesByWeight(g: EdgeList): void {
  g.sort((a, b) => a[2] - b[2]);
}