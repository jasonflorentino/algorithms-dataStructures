class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

//         a
//       /  \
//     b     c
//   /  \     \
// d     e     f

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;

//         3
//       /  \
//     2     5
//   /     /  \
// 1     4     6

// const a = new Node(3);
// const b = new Node(2);
// const c = new Node(5);
// const d = new Node(1);
// const e = new Node(4);
// const f = new Node(6);

// a.left = b;
// a.right = c;
// b.left = d;
// c.left = e;
// c.right = f;

const breadthFirstTraversal = (root) => {
  const queue = [ root ];
  while (queue.length !== 0) {
    const curr = queue.shift();
    console.log(curr.val);
    if (curr.left !== null) queue.push(curr.left);
    if (curr.right !== null) queue.push(curr.right);
  }
}

const bfs = (root, target) => {
  const queue = [ root ];
  while (queue.length !== 0) {
    const curr = queue.shift();
    if (curr.val === target) return true;
    if (curr.left !== null) queue.push(curr.left);
    if (curr.right !== null) queue.push(curr.right);
  }
  return false;
}

// console.log(bfs(a, "e")) // true
// console.log(bfs(a, "z")) // false

const bfsSumTree = (root) => {
  const queue = [ root ];
  let total = 0;
  while (queue.length !== 0) {
    const curr = queue.shift();
    total += curr.val;
    if (curr.left !== null) queue.push(curr.left);
    if (curr.right !== null) queue.push(curr.right);
  }
  return total;
}

// Don't forget to change the values
// of the nodes to Numbers!
// console.log(bfsSumTree(a));