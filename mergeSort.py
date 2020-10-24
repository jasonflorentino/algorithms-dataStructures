#! Python3
# bubbleSort.py - Practice with sorting algorithms

from testing import runTest

def mergeSort(A):
    if len(A) > 1:
        mid = len(A)//2
        L = A[:mid]
        R = A[mid:]

        mergeSort(L)
        mergeSort(R)

        leftIndex = rightIndex = parentIndex = 0

        while leftIndex < len(L) and rightIndex < len(R):
            if L[leftIndex] < R[rightIndex]:
                A[parentIndex] = L[leftIndex]
                leftIndex += 1
            else:
                A[parentIndex] = R[rightIndex]
                rightIndex += 1
            parentIndex += 1
        
        while leftIndex < len(L):
             A[parentIndex] = L[leftIndex]
             leftIndex += 1
             parentIndex += 1
        
        while rightIndex < len(R):
            A[parentIndex] = R[rightIndex]
            rightIndex += 1
            parentIndex += 1
    return A

input()
a=[1,6,2,5,3,4]
print(mergeSort(a))
# Usage: (algo, tests=1, count=6, limit=10, printInputs=False, printOutputs=False, printTime=True)
# runTest(mergeSort, 1, 1000000, 1000000)