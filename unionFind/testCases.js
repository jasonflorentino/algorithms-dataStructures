/**
 * @typedef Test
 * @property {Array<string>} inCmds       - Op commands to call
 * @property {Array<number[]>} inVals     - Values to provide for Ops
 * @property {Array<null | bool>} outExpd - Expected outputs
 */

/**
 * @type Test[]
 */
module.exports = [
  {
    inCmds: [
      "UnionFind",
      "union",
      "union",
      "union",
      "union",
      "union",
      "union",
      "connected",
      "connected",
      "connected",
      "union",
      "connected",
    ],
    inVals: [
      [10],
      [1, 2],
      [2, 5],
      [5, 6],
      [6, 7],
      [3, 8],
      [8, 9],
      [1, 5],
      [5, 7],
      [4, 9],
      [9, 4],
      [4, 9],
    ],
    outExpd: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true,
      true,
      false,
      null,
      true,
    ],
  },
  {
    inCmds: [
      "UnionFind",
      "union",
      "union",
      "union",
      "connected",
      "union",
      "union",
      "connected",
      "union",
      "connected",
      "connected",
    ],
    inVals: [
      [7],
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [4, 5],
      [4, 6],
      [5, 6],
      [1, 5],
      [2, 4],
      [6, 3],
    ],
    outExpd: [
      null,
      null,
      null,
      null,
      false,
      null,
      null,
      true,
      null,
      true,
      true,
    ],
  },
];