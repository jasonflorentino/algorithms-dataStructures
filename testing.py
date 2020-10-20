#! Python3
# testing.py - module containing test functions

from random import randrange
import time

def makeArray(count, limit):
    a = []
    for _ in range(count):
        a.append(randrange(limit))
    return a

def runTest(algo, tests=1, count=6, limit=10, printInputs=False, printOutputs=False, printTime=True):
    print(f"\nRunning {algo.__name__} {tests} times on")
    print(f"{count} numbers between 0 and {limit}...")
    totalTime = 0
    for test in range(tests):
        array = makeArray(count, limit)
        if printInputs == True:
            print('\nSTARTING LIST: ', array)               # PRINT STARTING LIST
        start = time.time()
        algo(array)                                         # ALGORITHM GOES HERE
        totalTime += time.time() - start
        if printOutputs == True:
            print('\nENDING LIST: ', array)                 # PRINT SORTED LIST
    avgTime = totalTime / tests
    print('Complete!')
    print('\nAVERAGE TIME: ', round(avgTime, 5), 'seconds') # PRINT AVERAGE TIME