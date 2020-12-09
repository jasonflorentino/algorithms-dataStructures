#! Python3
# fib.py - Writing a memoized fib function for myself after starting to learn about dynamic programming.

from time import time

def fib(n):
    if n <= 2:
        return 1
    else:
        return fib(n-1) + fib(n-2)

def fibMem(n, memo={}):
    if n in memo:
        return memo[n]
    elif n <= 2:
        return 1
    else:
        memo[n] = fibMem(n-1, memo) + fibMem(n-2, memo)
        return memo[n]

start = time()
print(fib(40)) # 23 seconds!!
print("Runtime: " + str(time() - start))

start = time()
print(fibMem(40)) # 0.000006 seconds
print("Runtime: " + str(time() - start))