const tests = require("./tests");

// Import based on script args
const fileName = process.argv[2];
const UnionFind = require(`./${fileName}`);

// Commands
const UNION_FIND = "UnionFind";
const UNION = "union";
const FIND = "find";
const CONNECTED = "connected";

// Main driver
runTestSuites(UnionFind, tests);

// Function Defs
function runTestSuites(Class, tests) {
  console.log("Running tests...");
  let passes = 0;
  for (const test of tests) {
    const { inCmds, inVals, outExpd } = test;
    if (runTest(Class, inCmds, inVals, outExpd)) {
      passes++;
    }
  }
  console.log("Finished!");
  console.log(`${passes}/${tests.length} tests passed!`);
}

function runTest(Tester, inCmds, inVals, outExpd) {
  let instance;
  let result;
  let pass = true;
  for (let i = 0; i < inCmds.length; i++) {
    const c = inCmds[i];
    const x = inVals[i][0];
    const y = inVals[i][1];
    switch (c) {
      case UNION_FIND:
        instance = new Tester(x);
        break;
      case UNION:
        result = instance.union(x, y);
        if (!expect(result, outExpd[i], c, x, y)) pass = false;
        break;
      case FIND:
        result = instance.find(x);
        if (!expect(result, outExpd[i], c, x, y)) pass = false;
        break;
      case CONNECTED:
        result = instance.connected(x, y);
        if (!expect(result, outExpd[i], c, x, y)) pass = false;
        break;
      default:
        console.log(`Unrecognized command: ${c}`);
    }
  }
  return pass;
}

function expect(a, b, cmd, x, y) {
  let pass;
  if (b === null) {
    // Void returns should be defined as `null`.
    // So to handle `undefined` return values
    // from `a`, convert both `a` and `b` to
    // boolean before checking.
    pass = !!a === !!b;
  } else {
    pass = a === b;
  }
  if (!pass) {
    console.log(
      `Error running '${cmd}' (${x}, ${y}) - Expected '${b}', got '${a}'`
    );
  }
  return pass;
}
