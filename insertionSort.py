#! Python3
# insertionSort.py - Practice with sorting algorithms

import testing

def insertionSort(array):
    for a in range(1,len(array)):
        b = a-1
        while array[b] > array[b+1] and b >= 0:
            array[b], array[b+1] = array[b+1], array[b]
            b -= 1
    return array

# Usage: (algo, tests=1, count=6, limit=10, printInputs=False, printOutputs=False, printTime=True)
testing.runTest(insertionSort, 10, 1000, 1000)

