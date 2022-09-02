# Skip-List

A skip-list data structure is like a linked list, but where operations like searching can be done in time logarithmic in the length. (vs. linear like a canonical linked list). This is achieved by allowing us to 'skip' nodes when doing our search.

```
|_|-------------------------------------------->|_|
|_|---------------|_|-------------->|_|-------->|_|
|_|-------------->|_|-------->|_|-->|_|-------->|_|
|_|-->|_|-->|_|-->|_|-->|_|-->|_|-->|_|-->|_|-->|_|
-∞     3     4     5     6     7     8     9     ∞
```

Above is a skip-list with a MaxHeight of 4. The key of each node is noted below it, with Left and Right Sentinel nodes of the Min and Max key.
Nodes are given a random height, and each layer points to the next node with a matching height.
Searching in the list is done by traversing nodes while descending their levels, using their next-pointers to find a key <= to the target key.

This implementation is built from the one described in [A Simple Optimistic skip-list Algorithm (2007)](https://people.csail.mit.edu/shanir/publications/LazySkipList.pdf) by Herlihy, Lev, Luchangco, Shavit. Alongside reading the paper, I made this implementation to more closely understand the workings of the data structure. Note that, like the pseudocode in the paper, it's focussed on clarity rather than efficiency -- I've not even bothered with the locking mechanisms.

## Test

You'll need node and typescript installed.

Compile the ts file

```
tsc ./skipList.ts --target esnext
```

Run the test file

```
node skipList.test.js
```

## Usage

```javascript
const SkipList = require("./skipList");

let mySkipList = new SkipList(4);

mySkipList.add(5);
mySkipList.contains(5);
mySkipList.print();
mySkipList.remove(5);
```
