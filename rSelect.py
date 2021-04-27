#! Python3
import random

def partitionAroundAPivot(arr, a, b, pivotIndex):
  arr[pivotIndex], arr[b] = arr[b], arr[pivotIndex]
  pivot = arr[b]
  l = g = a
  while a <= b:
    if arr[g] > pivot:
      g += 1
    else:
      arr[g], arr[l] = arr[l], arr[g]
      g += 1
      l += 1
    a += 1
  return l - 1

def rSelect(arr, a, b, targetOrder):
  pivotIndex = random.randint(a, b)
  indexOfPivot = partitionAroundAPivot(arr, a, b, pivotIndex)
  if indexOfPivot == targetOrder-1: return arr[indexOfPivot]
  
  if targetOrder <= indexOfPivot:
    return rSelect(arr, a, indexOfPivot-1, targetOrder)
  else:
    return rSelect(arr, indexOfPivot+1, b, targetOrder)


# Tester 1
# arr = [10,20,30,40,50,60,70,90,90]
# random.shuffle(arr)

# Tester 2
arr = []
for i in range(50):
  num = random.randrange(1000)
  arr.append(num)

print("Input:", arr)
target = 2
print("Output:", rSelect(arr, 0, len(arr)-1, target))