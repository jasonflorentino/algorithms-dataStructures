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

// const a = new Node("a");
// const b = new Node("b");
// const c = new Node("c");
// const d = new Node("d");
// const e = new Node("e");
// const f = new Node("f");

// a.left = b;
// a.right = c;
// b.left = d;
// b.right = e;
// c.left = f;

//         3
//       /  \
//     2     5
//   /     /  \
// 1     4     6

const a = new Node(3);
const b = new Node(2);
const c = new Node(5);
const d = new Node(1);
const e = new Node(4);
const f = new Node(6);

a.left = b;
a.right = c;
b.left = d;
c.left = e;
c.right = f;

const depthFirstTraversal = (root) => {
  const stack = [ root ];
  while (stack.length !== 0) {
    const curr = stack.pop();
    console.log(curr.val);
    if (curr.right !== null) stack.push(curr.right);
    if (curr.left !== null) stack.push(curr.left);
  }
}
// depthFirstTraversal(a); // abdecf

const depthFirstRecursive = (root) => {
  if (root === null) return;
  console.log(root.val);
  if (root.left !== null) depthFirstRecursive(root.left);
  if (root.right !== null) depthFirstRecursive(root.right);
}
// depthFirstRecursive(a); // abdecf

const depthFirstSum = (root) => {
  if (root === null) return 0;
  return depthFirstSum(root.left) + root.val + depthFirstSum(root.right);
}
console.log(depthFirstSum(a))