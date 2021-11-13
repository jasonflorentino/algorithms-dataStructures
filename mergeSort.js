/**
 * JavaScript implementation of a simple Merge Sort
 * Returns a new array.
 * Runs O(n log n) and takes O(n) extra space.
 * 
 * To clearly demonstrate how the algorithm works, 
 * we split the input into two halves, call mergeSort 
 * on each, then finally use the merge subroutine to 
 * return the final sorted array.
 * 
 * In the same vein, we use a straightforward process
 * for the merge subroutine: While there are elements
 * in the input arrays, we take one off each and push
 * the smaller one into our output array.
 */
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const midIdx  = arr.length >> 1;
  const LHalf   = arr.slice(0, midIdx);
  const RHalf   = arr.slice(midIdx);
  const sortedL = mergeSort(LHalf);
  const sortedR = mergeSort(RHalf);
  return merge(sortedL, sortedR);
}

function merge(arr1, arr2) {
  const out = [];
  arr1.reverse(); arr2.reverse();
  while (arr1.length && arr2.length) {
    const end1 = arr1.length - 1;
    const end2 = arr2.length - 1;
    if (arr1[end1] <= arr2[end2]) {
      out.push(arr1.pop());
    } else {
      out.push(arr2.pop());
    }
  }
  while (arr1.length) out.push(arr1.pop());
  while (arr2.length) out.push(arr2.pop());
  return out;
}

module.exports = {
  mergeSort
}

