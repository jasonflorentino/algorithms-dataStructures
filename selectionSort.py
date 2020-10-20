#! Python3
# selectionSort.py - Practice with sorting algorithms

from testing import runTest

def selectionSort(L):
    for i in range(0, len(L)):
        minIndex = i
        for j in range(i+1, len(L)):
            if L[j] < L[minIndex]:
                minIndex = j
        if L[minIndex] < L[i]:
            L[minIndex], L[i] = L[i], L[minIndex]
    return L

# Usage: (algo, tests=1, count=6, limit=10, printInputs=False, printOutputs=False, printTime=True)
runTest(selectionSort, 10, 1000, 1000)