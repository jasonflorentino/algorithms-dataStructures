import { Test } from "../types";

export const test01: Test = {
  input: [
    [1, 2, 1], [1, 3, 7],
    [2, 3, 5], [2, 4, 4], [2, 5, 3],
    [3, 5, 6],
    [4, 5, 2]
  ],
  mst: [
    [1, 2, 1], [4, 5, 2], [2, 5, 3], [2, 3, 5]
  ],
}