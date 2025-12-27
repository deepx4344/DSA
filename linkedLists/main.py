class DoublyNode:
    def __init__(self, value, prev=None, next=None):
        self.value = value
        self.next = next
        self.prev = prev


class LinkedLists:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def __len__(self):
        return self.size

    def __str__(self):
        currentNode = self.head
        if currentNode is None:
            return "The list is empty"
        elements = []
        while True:
            elements.append(str(currentNode.value))
            currentNode = currentNode.next
            if currentNode == self.head:
                break
        return " <==> ".join(elements)

    def __checkValidIndex(self, index):
        if index < 0 or index > self.size - 1:
            return False
        return True

    def getNode(self, index):
        """
        Gets the Node at specified Index.

        Args:
            Index: The index to return.

        Raises:
            ValueError: If List is Empty.
            IndexError: If Index is out of bounds.
        Returns:
            Node: Node At Valid Index provided.
        """
        if self.head is None:
            raise ValueError("Cannot get from empty list")
        valid = self.__checkValidIndex(index)
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
        """
        Adds a value to the end of the list.

        Args:
            value: The value to append.

        Raises:
            ValueError: If value is None.
        """
        if value is None:
            raise ValueError("Cannot append None Value")
        newNode = DoublyNode(value)
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
        """
        Prints the Lists to stdout.
        """
        print(self.__str__())

    def insert(self, value, index):
        """
        inserts a value at a specific index.

        Args:
            value: The value to insert.
            index: The position of Insertion.

        Raises:
            IndexError: If Index is Out of bounds.
        """
        valid = self.__checkValidIndex(index)
        if not valid:
            raise IndexError("index Out Of Bounds")
        newNode = DoublyNode(value)
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

    def contains(self, value):
        """
        Returns True if the lists conatins a node with the value given.

        Args:
            value: The value to search for.

        Raises:
            ValueError: If value is None.
        """
        if value is None:
            raise ValueError("cannot search for None values")
        found = False
        currentNode = self.head
        if currentNode is None:
            return found
        if currentNode.value == value:
            found = True
            return found
        while True:
            currentNode = currentNode.next
            if currentNode.value == value:
                found = True
                break
            if currentNode == self.head:
                break
        return found

    def getNodeIndex(self, value):
        """
        Returns the index of the first occurence of the value given.

        Args:
            value: The value to search for.

        Raises:
            ValueError: If value is None.
        """
        if self.head is None:
            return -1
        currentNode = self.head
        if currentNode.value == value:
            return 0
        index = 0
        found = False
        while True:
            currentNode = currentNode.next
            index += 1
            if currentNode.value == value:
                found = True
                break
            if currentNode == self.head:
                break
        if found is False:
            return -1
        return index

    def deleteByIndex(self, index):
        """
        Deletes from the list by its index.

        Args:
            Index: The index to be deleted.

        Raises:
            ValueError: If List is empty.
            IndexError: If index given is out of bounds.
        """
        if self.head is None:
            raise ValueError("Cannot delete from an empty list")
        valid = self.__checkValidIndex(index)
        if not valid:
            raise IndexError("Index Out of Bounds")
        if self.size == 1:
            self.head = None
            self.tail = None
            self.size -= 1
            return
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
        self.size -= 1

    def length(self):
        return self.size

    def clear(self):
        """
        Clears the entire list.
        """
        self.head = None
        self.tail = None
        self.size = 0


dop = LinkedLists()

dop.append(34)
dop.append(45)
dop.append(98)
dop.append(88)
dop.display()
dop.insert(77, 2)
dop.display()
dop.insert(67, 0)
dop.display()
print(dop.getNodeIndex(34))
print(dop.getNodeIndex(45))
print(dop.getNodeIndex(98))
print(dop.getNodeIndex(88))
print(dop.getNodeIndex(77))
print(dop.getNodeIndex(988))
print(dop.contains(988))
dop.deleteByIndex(2)
dop.display()
dop.deleteByIndex(0)
dop.display()
dop.deleteByIndex(3)
dop.display()
print(dop.length())