const SkipList = require('./skipList')

let mySkipList = new SkipList();

console.log('add 5', mySkipList.add(5));
mySkipList.print(); // 5 between Infinities

console.log('\nadd 5', mySkipList.add(5)); // false, already there
console.log('contains 5', mySkipList.contains(5));
console.log('add 3', mySkipList.add(3));
console.log('remove 5', mySkipList.remove(5));
console.log('remove 5', mySkipList.remove(5)); // false, doesn't exist
console.log('contains 5', mySkipList.contains(5)); // false, doesn't exist
console.log('add 5', mySkipList.add(5));
console.log('add 1', mySkipList.add(1));
console.log('add 2', mySkipList.add(2));
console.log('add 9', mySkipList.add(9));
console.log('add 6', mySkipList.add(6));
console.log('add 8', mySkipList.add(8));
console.log('add 7', mySkipList.add(7));
console.log('add 4', mySkipList.add(4));
console.log('remove 5', mySkipList.remove(5));
mySkipList.print(); // keys in order, no 5

// Sry but you'll have to visually check the skip-list invariant
// ie. That each list is a sublist of the list at lower layers.
