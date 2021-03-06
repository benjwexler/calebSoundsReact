export class Node {
    constructor(value, next, prev) {
      this.value = value;
      this.next = next;
      this.prev = prev
    }
  }
  
 export class LinkedList {
    constructor() {
      this.head = undefined;
      this.tail = undefined;
    }
  
    addToHead = (value) => {
      const newNode = new Node(value, this.head, null);
      if (this.head) {
        this.head.prev = newNode
      } else {
        this.tail = newNode; 
      }
    this.head = newNode;
    }
  
    addToTail = (value) => {
      const newNode = new Node(value, null, this.tail);
      if (this.tail) {
        this.tail.next = newNode
      } else {
        this.head = newNode; 
      }
    this.tail = newNode;
    }
  }