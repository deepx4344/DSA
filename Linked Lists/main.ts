class ListNode<T> {
  constructor(
    value: T,
    prev: ListNode<T> | null = null,
    next: ListNode<T> | null = null
  ) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
  value: T;
  prev: ListNode<T> | null;
  next: ListNode<T> | null;
}
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;
  private checkIndex(index: number): boolean {
    if (index >= 0 && index <= this.length - 1) {
      return true;
    }
    throw new Error("Index out of bounds");
  }
  private checkValue(value: T): boolean {
    if (value === null || value === undefined) {
      throw new Error("Invalid Value given");
    }
    return true;
  }
  getNode(index: number): ListNode<T> {
    if (this.head === null) {
      throw new Error("Cannot get from empty list");
    }
    this.checkIndex(index);
    let currentNode = this.head;

    if (index === 0) {
      return currentNode;
    } else {
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next!;
      }
      return currentNode;
    }
  }
  push(value: T): void {
    this.checkValue(value);
    const newNode: ListNode<T> = new ListNode(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      newNode.next = this.head;
      this.head.prev = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  display(): void {
    let currentNode = this.head;
    if (currentNode === null) {
      console.log("This is an empty list");
      return;
    }
    let elements = [];
    while (true) {
      elements.push(currentNode!.value);
      currentNode = currentNode!.next;
      if (currentNode === this.head) {
        break;
      }
    }
    console.log(elements.join(" <==> "));
  }
  insert(value: T, index: number): void {
    this.checkIndex(index);
    this.checkValue(value);
    const newNode = new ListNode(value);
    if (this.length === 0) {
      return this.push(value);
    }
    if (index === 0) {
      this.head!.prev = newNode;
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const NodeIndex = this.getNode(index);
      const NodeBeforeIndex = this.getNode(index - 1);
      NodeBeforeIndex.next = newNode;
      newNode.prev = NodeBeforeIndex;
      NodeIndex.prev = newNode;
      newNode.next = NodeIndex;
    }
    this.length++;
  }
    includes(value:T) {
    let currentNode = this.head;
    let found = false;
    this.checkValue(value)
    if (!currentNode) {
      return found;
    }
    if (currentNode.value === value) {
      found = true;
      return found;
    }
    while (true) {
      currentNode = currentNode!.next;
      if (currentNode!.value === value) {
        found = true;
        break;
      }
      if (currentNode === this.head) {
        break;
      }
    }
    return found;
  }
  getNodeIndex(value: T): number {
    this.checkValue(value);
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
      currentNode = currentNode!.next;
      index++;
      if (currentNode!.value === value) {
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
  delete(index:number) {
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
      lastNode!.next = nextNode;
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
  unshift(value:T) {
    this.insert(value, 0);
  }
}

const dop = new LinkedList();

dop.push(34);
dop.push(45);
dop.push(98);
dop.push(88);
dop.display();
dop.insert(34, 2);
dop.display();
console.log(dop.getNodeIndex(98));
console.log(dop.includes(988))
dop.delete(2)
dop.display()
