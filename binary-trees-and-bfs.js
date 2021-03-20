class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

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

//         a
//       /  \
//     b     c
//   /  \     \
// d     e     f

const breadthFirstTraversal = (root) => {
  const queue = [ root ];
  while (queue.length !== 0) {
    const curr = queue.shift();
    console.log(curr.val);
    if (curr.left !== null) queue.push(curr.left);
    if (curr.right !== null) queue.push(curr.right);
  }
}

// console.log(breadthFirstTraversal(a));

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