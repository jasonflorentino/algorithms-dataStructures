import { EdgeList, Test, } from "./types";
import { tests } from "./tests";
import { kruskalsMstSimple, kruskalsMst } from "./kruskalsMst";
const K_MST_FNS = [kruskalsMstSimple, kruskalsMst];

// Main script
function main() {
  for (const test of tests) {
    runKruskalsMstFns(test);
  }
}

/**
 * Runs the Kruskal's MST functions against a given test
 */
function runKruskalsMstFns(test: Test): void {
  const { input, mst } = test;
  const fns = K_MST_FNS;
  for (const fn of fns) {
    console.log(`Running ${fn.name}...`);
    const output = fn(input);
    const result = assertEdgeListsMatch(mst, output);
    console.log("Output matches:", result);
  }
}

/**
 * Used to check if output is correct
 */
function assertEdgeListsMatch(a: EdgeList, b: EdgeList): boolean {
  sortEdgesByWeight(a); sortEdgesByWeight(b);
  let passing = true;
  for (let i = 0; i < a.length; i++) {
    let edgeMatch = true;
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) {
        passing = edgeMatch = false;
      };
    }
    if (!edgeMatch) {
      console.log(`Error: Expected ${a[i]} - Got ${b[i]}`);
    }
  }
  return passing;
}

/**
 * Sorts edges by weight in ascending order
 */
function sortEdgesByWeight(g: EdgeList): void {
  g.sort((a, b) => a[2] - b[2]);
}

if (require.main === module) {
  main();
}