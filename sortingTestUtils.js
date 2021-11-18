/**
 * Testing and comparing sorting functions.
 * Exports utils and contains example script.
 */

//
// Imports 
//

const { quickSort, quickSortV2 } = require('./quickSort');
const { insertionSort } = require('./insertionSort');
const { mergeSort } = require('./mergeSort');

//
// Exports
//

module.exports = {
  assertIsSorted,
  fisherYates,
  logCorrectness,
  logRuntime,
  orderedNumbers,
  randomNumbers,
  uniqueShuffledNumbers
}

//
// Example Tests
//

// Correctness
console.log('\nTesting Correctness');
const test1 = uniqueShuffledNumbers(50);
logCorrectness(insertionSort, test1);
logCorrectness(quickSort, test1, [0, test1.length - 1]);
logCorrectness(mergeSort, test1);

// Running time
console.log("\n10,000 Random Numbers");
const test2 = randomNumbers(10000, 10000);
logRuntime(insertionSort, test2);
logRuntime(quickSortV2, test2, [0, test2.length - 1]);
logRuntime(mergeSort, test2);

console.log("\n10,000,000 Random Numbers");
const test3 = randomNumbers(1000000, 1000000);
logRuntime(quickSortV2, test3, [0, test3.length - 1]);
logRuntime(mergeSort, test3);

//
// Utils
//

/**
 * Array of random numbers between 0 and `z`
 * that contains `n` elements.
 * 
 * Note: Will have duplicates
 * @returns {number[]}
 */
function randomNumbers(n, z) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(Math.floor(Math.random() * z));
  }
  return out;
}

/** 
 * Array of unique numbers, 
 * shuffled from 1 to `n`
 * @returns {number[]}
 */
function uniqueShuffledNumbers(n) {
  return fisherYates(orderedNumbers(n));
}

/** 
 * Unique values, in order from 1 to n 
 */
function orderedNumbers(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push(i);
  }
  return out;
}

/**
 * Fisher Yates shuffle
 * Randomizes input array in place.
 */
function fisherYates(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i--;
  }
  return arr;
}

/**
 * returns `true` if input array is sorted,
 * false otherwise.
 */
 function assertIsSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

/**
 * Tests correctness of given sort function
 * and logs result to std out.
 * 
 * Will copy the input array beforehand in case
 * fn sorts in place, and will call `fn` with `arr`,
 * and `args` if they are provided.
 */
function logCorrectness(fn, arr, args = []) {
  const copy = arr.slice();
  console.log(`Testing ${fn.name}`);
  console.log('Is correct? -', assertIsSorted(fn(copy, ...args)));
}

/**
 * Log the time it takes to run given 
 * sorting fn to the std output.
 * 
 * Will copy the input array beforehand in case
 * fn sorts in place, and will call `fn` with `arr`,
 * and `args` if they are provided.
 */
function logRuntime(fn, arr, args = []) {
  console.log(`Running ${fn.name}`)
  const copy = arr.slice();
  const start = Date.now();
  fn(copy, ...args);
  console.log(Date.now() - start, 'ms');
}