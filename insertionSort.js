/**
 * JavaScript implementation of Insertion Sort
 * Sorts in place.
 * Expect O(n^2) runtime but performs well
 * on small or nearly sorted inputs since
 * it runs O(n) on already sorted inputs.
 */
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let a = i; let b = i - 1; 
    while (arr[b] > arr[a] && b >= 0) {
      [arr[a], arr[b]] = [arr[b], arr[a]];
      a--; b--;
    }
  }
  return arr;
}

module.exports = {
  insertionSort
}