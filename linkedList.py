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
            return 1
        
        curr = self.head
        while(curr.next != None):
            curr = curr.next
        curr.next = Node(val)

    def print(self):
        if self.head == None:
            print("")
            return 1
        
        curr = self.head
        output = ""
        while(curr != None):
            output += curr.val + " -> "
            curr = curr.next
        
        print(output)
        return 1

    def contains(self, target):
        if self.head == None:
            return False
        
        curr = self.head
        while(curr != None):
            if curr.val == target:
                return True
            curr = curr.next
        
        return False

    def delete(self, target):
        if self.head == None:
            return False
        if self.head.val == target:
            self.head = self.head.next
            return True
        
        prev = None
        curr = self.head
        while curr != None:
            if curr.val == target:
                prev.next = curr.next
                return True
            n = curr.next
            prev = curr
            curr = n
        return False
        
        
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

# myList.delete('a')
# myList.print()