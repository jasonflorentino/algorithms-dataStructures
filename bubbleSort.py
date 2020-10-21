#! Python3
# bubbleSort.py - Practice with sorting algorithms

from testing import runTest

def bubbleSort(L):
    for a in range(0, len(L)-1):
        for b in range(0, len(L)-1-a):
            if L[b] > L[b+1]:
                L[b], L[b+1] = L[b+1], L[b]
    return L

# Usage: (algo, tests=1, count=6, limit=10, printInputs=False, printOutputs=False, printTime=True)
runTest(bubbleSort, 1, 6, 10, True, True)