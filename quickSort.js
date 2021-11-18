/**
 * JavaScript implementation of Quick Sort
 * 
 * Sorts in place
 * Runs O(n log n) in avergae case
 * Note: This implementation doesn't sort duplicates
 * 
 * Quick Sort uses a partition subroutine to divide the 
 * input array around a randomly chosen pivot element `p`
 * such that if `x` < `p` then `xi` < `pi`, and 
 * if `x` > `p` then `xi` > `pi`. It then recursively
 * sorts the two parts.
 * 
 * Sorting around a pivot can result in O(n^2) comparisons 
 * if not done carefully. Given we know nothing about the 
 * input data, chosing a pivot at random is crucial to 
 * fast average running time of Quick Sort.
 * 
 * Call with: input array, is first idx, and last idx
 */
function quickSort(arr, a, b) {
  if (b - a < 1) return arr;
  const randIdx  = a + Math.floor(Math.random() * (b - a));
  const pivotIdx = partition(arr, a, b, randIdx);
  quickSort(arr, a, pivotIdx - 1);
  quickSort(arr, pivotIdx + 1, b);
  return arr;
}

function partition(arr, a, b, p) {
  const pivotEl = arr[p];
  while (a < b) {
    while (arr[a] < pivotEl) a++;
    while (arr[b] > pivotEl) b--;
    swap(arr, a, b);
  }
  return a;
}

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

/**
 * Quick Sort V2 - Handle Duplicates
 * 
 * Since we allow the existence of more than one of the same
 * element, a random pivot can mean we must now correctly
 * place multiple elements when partitioning the array.
 * 
 * This solution does some work beforehand to collect and place
 * a pivot section before partitioning the remaining elements
 * as normal. And to avoid this extra work while bottom-ing out 
 * ther recursion, we now switch insertion sort when the input
 * array becomes small, in this case < 16 elements.
 */
function quickSortV2(arr, a, b) {
  if (b - a < 16) return insertionSort(arr, a, b);
  const randIdx  = a + Math.floor(Math.random() * (b - a));
  const [p1, p2] = partitionV2(arr, a, b, randIdx);
  quickSortV2(arr, a, p1 - 1);
  quickSortV2(arr, p2 + 1, b);
  return arr;
}

/**
 * Creates a 'Pivot Section' in the correct
 * position of the array and returns its
 * starting and ending indicies.
 */
function partitionV2(arr, a, b, p) {
  const pivotEl = arr[p];
  let   i       = a;
  let   pivotLn = 0;
  let   lessThn = 0;
  // Put pivot El in first position
  swap(arr, i, p);
  i++;
  // Collect all pivot elements together
  // keeping track of space needed for left
  // side of pivot area, and size of pivot section
  while (i <= b) {
    if (arr[i] < pivotEl) lessThn++;
    if (arr[i] === pivotEl) {
      pivotLn++;
      swap(arr, i, a + pivotLn);
    }
    i++;
  }
  // Move pivot section into proper part
  // of the array
  const p1  = a + lessThn;
  const p2  = p1 + pivotLn;
  let moved = 0;
  while (pivotLn >= 0) {
    swap(arr, a + moved, p1 + pivotLn);
    pivotLn--;
    moved++;
  }
  // Now that there are no pivot elements
  // in the way, partition elements as normal
  // but around the pivot section
  while (a < p1 && b > p2) {
    while (arr[a] < pivotEl) a++;
    while (arr[b] > pivotEl) b--;
    swap(arr, a, b);
  }
  // Return beginning and ending idx
  // of pivot section.
  return [p1, p2];
}

function insertionSort(arr, s, e) {
  for (let i = s + 1; i <= e; i++) {
    let a = i; let b = i - 1; 
    while (arr[b] > arr[a] && b >= 0) {
      swap(arr, a, b);
      a--; b--;
    }
  }
  return arr;
}

module.exports = {
  quickSort,
  quickSortV2
}