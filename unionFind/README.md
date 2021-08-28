# Union-Find

For learning and studying the Union-Find data structure otherwise known as the Disjoint Set data structure.

Currently this repo contains multiple versions of the data structure, starting from a basic *Eager Union* or *Quick Find* design and incrementally adding optimizations until reaching an optimal design that uses *Lazy Unions, Union By Rank, and Path Compression*.

> "This is probably the first and maybe the only existing example of a simple algorithm with a very complicated running time ... I conjecture that there is *no* linear-time method, and that the algorithm considered here is optimal to within a constant factor."
*-- Tarjan, "Efficiency of a Good But Not Linear Set Union Algorithm", Journal of the ACM, 1975*

The final version of this conjecture was proven by Fredman/Saks in 1989.

My main resource for study was [Tim Roughgarden's](http://timroughgarden.org/) Stanform Algorithms lectures on Union-Find data strucutres.

## Testing
To run tests on all implementations, run the included script file:
```bash
$ ./runTests.sh
```

To test a given implementation, you can run `test.js` and provide the file name as an argument:
```bash
$ node test.js quickFind
```