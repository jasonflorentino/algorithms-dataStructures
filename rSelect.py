#! Python3
import random

def partitionAroundAPivot(arr, a, b, pivotIndex):
  # Place pivot at "end" of the array
  arr[pivotIndex], arr[b] = arr[b], arr[pivotIndex]
  pivot = arr[b]

  # Maintain a less than pivot section (j),
  # a larger than pivor section (a),
  # and unsorted section (between a and b).
  j = a
  while a <= b:
    if arr[a] > pivot:
      a += 1
    else:
      arr[a], arr[j] = arr[j], arr[a]
      a += 1
      j += 1
  return j - 1

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
for i in range(1000):
  num = random.randrange(1000)
  arr.append(num)

print("Input:", arr)
target = 2
print("Output:", rSelect(arr, 0, len(arr)-1, target))