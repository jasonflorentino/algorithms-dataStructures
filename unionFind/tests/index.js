/**
 * @typedef Test
 * @property {Array<string>} inCmds       - Op commands to call
 * @property {Array<number[]>} inVals     - Values to provide for Ops
 * @property {Array<null | bool>} outExpd - Expected outputs
 */

/** @type Test */
const test01 = require("./test01");
const test02 = require("./test02");

/** @type Test[] */
 module.exports = [
   test01,
   test02,
 ];