class doublyNode:
    def __init__(self, value, prev=None, next=None):
        self.value = value
        self.next = next
        self.prev = prev


class linkedLists:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def __len__(self):
        return self.size

    def __str__(self):
        currentNode = self.head
        if currentNode is None:
            return print("The list is empty")
        elements = []
        while True:
            elements.append(str(currentNode.value))
            currentNode = currentNode.next
            if currentNode == self.head:
                break
        return " <==> ".join(elements)

    def __chechValidIndex(self, index):
        if index < 0 or index > self.size - 1:
            return False
        return True

    def getNode(self, index):
        if self.head is None:
            print("Cannot get from empty list")
            return
        valid = self.__chechValidIndex(index)
        if not valid:
            raise IndexError("index Out Of Bounds")
        currentNode = self.head
        if index == 0:
            return currentNode
        else:
            for i in range(index):
                currentNode = currentNode.next
        return currentNode

    def append(self, value):
        newNode = doublyNode(value)
        if self.head is None:
            self.head = self.tail = newNode
            newNode.next = newNode
            newNode.prev = newNode
        else:
            lastNode = self.tail
            firstNode = self.head
            newNode.next = firstNode
            newNode.prev = lastNode
            lastNode.next = newNode
            firstNode.prev = newNode
            self.tail = newNode
        self.size += 1

    def display(self):
        print(self.__str__())

    def insert(self, value, index):
        valid = self.__chechValidIndex(index)
        if not valid:
            raise IndexError("index Out Of Bounds")
        newNode = doublyNode(value)
        if self.head is None:
            self.append(value)
            return
        if index == 0:
            firstNode = self.head
            lastNode = self.tail
            newNode.next = firstNode
            newNode.prev = lastNode
            firstNode.prev = newNode
            lastNode.next = newNode
            self.head = newNode
        else:
            currentNode = self.getNode(index)
            previousNode = self.getNode(index - 1)
            newNode.next = currentNode
            newNode.prev = previousNode
            currentNode.prev = newNode
            previousNode.next = newNode
        self.size += 1

    def search(self, value):
        currentNode = self.head
        if currentNode is None:
            return False
        while True:
            if currentNode.value == value:
                return True
            currentNode = currentNode.next
            if currentNode == self.head:
                break
        return False

    def unshift(self, value):
        self.insert(value, 0)

    def getNodeIndex(self, value):
        if self.head is None:
            print("Cannot get from empty list")
            return
        currentNode = self.head
        index = 0
        while True:
            currentNode = currentNode.next
            if currentNode == self.head:
                break
            index += 1
        return index

    def deleteByIndex(self, index):
        if self.head is None:
            print("Cannot delete from an empty list")
            return
        valid = self.__chechValidIndex(index)
        if not valid:
            raise IndexError("Index Out of Bounds")

        lastNode = self.tail
        firstNode = self.head
        if index == 0:
            nextNode = self.getNode(index + 1)
            lastNode.next = nextNode
            nextNode.prev = lastNode
            self.head = nextNode
        elif index == self.size - 1:
            previousNode = self.getNode(index - 1)
            previousNode.next = firstNode
            firstNode.prev = previousNode
            self.tail = previousNode
        else:
            previousNode = self.getNode(index - 1)
            nextNode = self.getNode(index + 1)
            previousNode.next = nextNode
            nextNode.prev = previousNode


d = linkedLists()
d.append(45)
d.append(88)
d.append(90)
d.display()
d.deleteByIndex(1)
d.display()
