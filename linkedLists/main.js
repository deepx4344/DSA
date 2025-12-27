class DoublyNode {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class LinkedLists {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  checkIndex(index) {
    if (index >= 0 && index <= this.length - 1) {
      return true;
    }
    throw new Error("Index out of range");
  }
  getNode(index) {
    if (this.head === null) {
      throw new Error("Cannot get from empty list");
    }
    let valid = this.checkIndex(index);
    let currentNode = this.head;
    if (valid) {
      if (index === 0) {
        return currentNode;
      } else {
        for (let i = 0; i < index; i++) {
          currentNode = currentNode.next;
        }
        return currentNode;
      }
    }
  }
  getNodeIndex(value) {
    let currentNode = this.head;
    if (currentNode === null) {
      return -1;
    }
    if (currentNode.value === value) {
      return 0;
    }
    let index = 0;
    let found = false;
    while (true) {
      currentNode = currentNode.next;
      index++;
      if (currentNode.value === value) {
        found = true;
        break;
      }
      if (currentNode === this.head) {
        break;
      }
    }
    if (!found) {
      return -1;
    }
    return index;
  }
  includes(value) {
    let currentNode = this.head;
    let found = false;
    if (!value) {
      throw new Error("cannot perform operation on none");
    }
    if (!currentNode) {
      return found;
    }
    if (currentNode.value === value) {
      found = true;
      return found;
    }
    while (true) {
      currentNode = currentNode.next;
      if (currentNode.value === value) {
        found = true;
        break;
      }
      if (currentNode === this.head) {
        break;
      }

    }
  }
  push(value) {
    if (value === null || value === undefined) {
      throw new Error("cannot add null or undefined values");
    }
    let newNode = new DoublyNode(value);
    if (this.head === null) {
      this.head = this.tail = newNode;
      newNode.prev = newNode;
      newNode.next = newNode;
    } else {
      let lastNode = this.tail;
      let firstNode = this.head;
      newNode.next = firstNode;
      newNode.prev = lastNode;
      lastNode.next = newNode;
      firstNode.prev = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  insert(value, index) {
    if (this.head === null) {
      return this.push(value);
    }
    this.checkIndex(index);
    let NewNode = new DoublyNode(value);
    if (index === 0) {
      let firstNode = this.head;
      let lastNode = this.tail;
      firstNode.prev = NewNode;
      lastNode.next = NewNode;
      NewNode.prev = lastNode;
      NewNode.next = firstNode;
      this.head = NewNode;
    } else {
      let NodeInIndex = this.getNode(index);
      let NodeBeforeIndex = this.getNode(index - 1);
      NodeInIndex.prev = NewNode;
      NodeBeforeIndex.next = NewNode;
      NewNode.next = NodeInIndex;
      NewNode.prev = NodeBeforeIndex;
    }
    this.length++;
  }
  delete(index) {
    if (this.head === null) {
      throw new Error("Cannot delete from empty list");
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return;
    }
    this.checkIndex(index);
    let lastNode = this.tail;
    let firstNode = this.head;
    if (index === 0) {
      let nextNode = this.getNode(index + 1);
      lastNode.next = nextNode;
      nextNode.prev = lastNode;
      this.head = nextNode;
    } else if (index === this.length - 1) {
      let previousNode = this.getNode(index - 1);
      firstNode.prev = previousNode;
      previousNode.next = firstNode;
      this.tail = previousNode;
    } else {
      let previousNode = this.getNode(index - 1);
      let nextNode = this.getNode(index + 1);
      previousNode.next = nextNode;
      nextNode.prev = previousNode;
    }
    this.length--;
  }
  unshift(value) {
    this.insert(value, 0);
  }

  display() {
    let currentNode = this.head;
    if (currentNode === null) {
      console.log("This list is empty");
      return;
    }
    let allNodeValues = [];
    while (true) {
      allNodeValues.push(currentNode.value);
      currentNode = currentNode.next;
      if (currentNode === this.head) {
        break;
      }
    }
    console.log(allNodeValues.join(" <==> "));
  }
  size() {
    return this.length;
  }
}

const dop = new LinkedLists();

dop.push(34);
dop.push(45);
dop.push(98);
dop.push(88);
dop.display();
dop.insert(77, 2);
dop.display();
dop.insert(67, 0);
dop.display();
console.log(dop.getNodeIndex(34));
console.log(dop.getNodeIndex(45));
console.log(dop.getNodeIndex(98));
console.log(dop.getNodeIndex(88));
console.log(dop.getNodeIndex(77));
console.log(dop.getNodeIndex(988));
console.log(dop.includes(988));
dop.delete(2);
dop.display();
dop.delete(0);
dop.display();
dop.delete(3);
dop.display();
console.log(dop.size());