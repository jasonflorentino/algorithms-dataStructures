#! Python3

class Node():
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList():
    def __init__(self):
        self.head = None

    def append(self, val):
        if self.head == None:
            self.head = Node(val)
            return
        self._append(val, self.head)
        
    def _append(self, val, curr):
        if curr.next == None:
            curr.next = Node(val)
            return
        self._append(val, curr.next)

    def print(self):
        print(self._print(self.head))

    def _print(self, curr):
        if curr == None:
            return ''
        return curr.val + ' -> ' + self._print(curr.next)

    def contains(self, target):
        if self.head == None:
            return False
        return self._contains(target, self.head)
    
    def _contains(self, target, curr):
        if curr.val == target:
            return True
        if curr.next == None:
            return False
        return self._contains(target, curr.next)

    def delete(self, target, curr=None, prev=None):
        if curr == None:
            curr = self.head
        if curr.next == None:
            return False
        if curr.val == target:
            if prev == None:
                self.head = curr.next
                return True
            prev.next = curr.next
            return True
        return self.delete(target, curr.next, curr)

        
myList = LinkedList()
myList.append('a')
myList.append('b')
myList.append('c')
myList.append('d')
myList.append('e')

myList.print()

# print(myList.contains('a'))
# print(myList.contains('b'))
# print(myList.contains('c'))
# print(myList.contains('d'))
# print(myList.contains('e'))
# print(myList.contains('z'))

myList.delete('a')
myList.print()