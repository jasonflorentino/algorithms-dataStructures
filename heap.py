#! Python3

class Heap:
	def __init__(self):
		self.heap = []
		self.size = 0
	
	def print(self):
		print("Heap:", self.heap)
		print("Size:", self.size)
  
	def parent(self, elem):
		if elem == 1: return -1
		else: return elem // 2
  
	def youngChild(self, elem):
		return 2 * elem

	def swap(self, elem, parentElem):
		self.heap[elem-1], self.heap[parentElem-1] = self.heap[parentElem-1], self.heap[elem-1]
  
	def bubbleUp(self, size):
		if self.parent(size) == -1: return
		if self.heap[self.parent(size)-1] > self.heap[size-1]:
			self.swap(size, self.parent(size))
			self.bubbleUp(self.parent(size))

	def bubbleDown(self, currElem):
		c = i = minElem = 0
		c = self.youngChild(currElem)
		minElem = currElem

		for i in range(2):
			if (c+i) <= self.size:
				if self.heap[minElem-1] > self.heap[c-1+i]:
					minElem = c+i
		
		if minElem != currElem:
			self.swap(currElem, minElem)
			self.bubbleDown(minElem)

	def insert(self, val):
		self.size += 1
		self.heap.append(0)
		self.heap[self.size-1] = val
		self.bubbleUp(self.size)

	def makeHeap(self, vals):
		for val in vals:
			self.insert(val)

	def extractMin(self):
		minVal = -1

		if self.size <= 0: print("Warning: Empty heap")
		else:
			minVal = self.heap[0]
			self.heap[0] = self.heap[self.size-1]
			self.size -= 1
			del self.heap[-1]
			self.bubbleDown(1)
      
		return minVal
	
def heapsort(arr):
	pq = Heap()
	pq.makeHeap(arr)
	for i in range(len(arr)):
		arr[i] = pq.extractMin()

vals = [6,5,23,56,14,13,64,123,3,1233,10,2,1]
print("Input:", vals)

# Test extract min and heapify
foo = Heap()
foo.makeHeap(vals)
foo.print()
print(foo.extractMin())
foo.print()

# Test heapsort
heapsort(vals)
print("Output:", vals)
