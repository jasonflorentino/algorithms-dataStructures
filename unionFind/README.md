# Union-Find

For learning and studying the Union-Find data structure, otherwise known as a Disjoint Set data structure, which represents a collection of unique sets as rooted trees. Supported operations include `find` for identifying the unique set that contains a given element, and `union` which unites two sets.

This repo contains multiple versions of the data structure, starting from a simple *Eager Union* (or *Quick Find*) design and incrementally adds changes until reaching an optimal design that uses *Lazy Unions, Union By Rank, and Path Compression*.

My main resource for study was [Tim Roughgarden's](http://timroughgarden.org/) marvelous Stanford Algorithms lectures, during which he includes:

> ### "This is probably the first and maybe the only existing example of a simple algorithm with a very complicated running time ... I conjecture that there is *no* linear-time method, and that the algorithm considered here is optimal to within a constant factor."
**— Tarjan,** *"Efficiency of a Good But Not Linear Set Union Algorithm", Journal of the ACM, 1975*

The final version of this conjecture was proven by Fredman/Saks in 1989.

## Testing
To run tests on all implementations, run the included script file:
```bash
$ ./runTests.sh
```

To test a given implementation, you can run `test.js` and provide the file name as an argument:
```bash
$ node test.js quickFind
```
