const fs = require("fs");

/** Class for a Hash Map */
class MyHashMap {
  constructor() {
    this.mod = 2069;
    this.store = new Array(this.mod);
  }
  /**
   * Value will always be non-negative. 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
   put(key, value) {
    // Get head node for this key
    const hash = this._getHashCode(key);
    const head = this._getListHeadFromHash(hash);
    // Create a new linked list if it doesn't already exist
    if (!head) {
        this.store[hash] = this._createListNode(key, value);
        return null;
    }
    // There is already a LL here, either add a new node
    // or overwrite a value at the same key.
    else {
        return this._addOrOverwrite(head, key, value);
    }
  };
  /**
   * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const head = this._getListHeadFromKey(key);
    if (!head) return -1;
    else return this._getValFromList(head, key);
  };
  /**
   * Removes the mapping of the specified value key if this map contains a mapping for the key 
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    const head = this._getListHeadFromKey(key);
    if (!head) return null;
    else return this._removeNodeByKey(head, key);
  };
  _getListHeadFromKey(key) {
    const hash = key % this.mod;
    return this.store[hash] || null;
  }
  _getHashCode(key) {
    return key % this.mod;
  }
  _getListHeadFromHash(hash) {
    return this.store[hash] || null;
  }
  _createListNode(key, val) {
    return {
        key,
        val,
        next: null,
    }
  }
  _addOrOverwrite(head, key, val) {
    let prev = null;
    let node = head;
    // Check all nodes in list and update val
    // if key already exists;
    while (node) {
        if (node.key === key) {
            node.val = val;
            return null;
        }
        prev = node;
        node = node.next;
    }
    // If we make it through the whole list and don't
    // discover an existing key, prev will be pointing
    // to the last node in the list.
    prev.next = this._createListNode(key, val);
    return null;
  }
  _getValFromList(head, key) {
    let node = head;
    while (node) {
        if (node.key === key) return node.val;
        node = node.next;
    }
    return -1;
  }
  _removeNodeByKey(head, key) {
    // If we need to delete the head,
    // we need to store head.next as the new head
    // at the same index in the store.
    if (head.key === key) {
        const hashCode = this._getHashCode(key);
        this.store[hashCode] = head.next;
        return null;
    }
    // Else find and remove node
    // by rewiring pointers around it.
    let prev = head;
    let node = head.next;
    while (node) {
        if (node.key === key) {
            prev.next = node.next;
            return null;
        }
        prev = node;
        node = node.next;
    }
    return null;
  }
};

const inCmd = JSON.parse(fs.readFileSync("test1.input_cmd.json"));
const inVal = JSON.parse(fs.readFileSync("test1.input_val.json"));
const expected = JSON.parse(fs.readFileSync("test1.output.json"));

runHashMapTest(inCmd, inVal, expected);

function runHashMapTest(cmds, cmdVals, expectedOutputs) {
  console.log("Running test...")
  let hashMap;
  let output;
  for (let i = 0; i < cmds.length; i++) {
    switch(cmds[i]) {
      case "MyHashMap":
        hashMap = new MyHashMap();
        break;
      case "put":
        output = hashMap.put(cmdVals[i][0], cmdVals[i][1]);
        expect(output, expectedOutputs[i], i);
        break;
      case "get":
        output = hashMap.get(cmdVals[i][0]);
        expect(output, expectedOutputs[i], i);
        break;
      case "remove":
        output = hashMap.remove(cmdVals[i][0]);
        expect(output, expectedOutputs[i], i);
        break;
      default:
        break;
    }
  }
  console.log("Finished!")
}

function expect(a, b, opIdx) {
  // Print outouts if incorrect
  if (a !== b) {
    console.log("CMD:", inCmd[opIdx], "VALS:", inVal[opIdx]);
    console.log("OUTPUT:", a, "EXPECTED:", b);
  }
}