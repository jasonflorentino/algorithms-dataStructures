#! Python3
# insertionSort.py - Practice with sorting algorithms

from random import randrange
import time

def makeArray(count, limit):
    a = []
    for _ in range(count):
        a.append(randrange(limit))
    return a

def insertionSort(array):
    for a in range(1,len(array)):
        b = a-1
        while array[b] > array[b+1] and b >= 0:
            array[b], array[b+1] = array[b+1], array[b]
            b -= 1
    return array

def runTest(tests, count, limit):
    print(f"\nRunning Insertion Sort {tests} times on")
    print(f"{count} numbers between 0 and {limit}...")
    totalTime = 0
    for test in range(tests):
        array = makeArray(count, limit)
        # print('\nSTARTING LIST: ', array)                   # PRINT STARTING LIST
        start = time.time()
        insertionSort(array)                                # ALGORITHM GOES HERE
        totalTime += time.time() - start
        # print('\nENDING LIST: ', array)                     # PRINT SORTED LIST
    avgTime = totalTime / tests
    print('\nAVERAGE TIME: ', round(avgTime, 4), 'seconds') # PRINT AVERAGE TIME

# Usage: How many tests, How many integers, Between 0 and ????
runTest(10, 1000, 1000)

