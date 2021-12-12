/**
 * A class representing a Circular Queue
 * 
 * A queue is an abstract data type where elements
 * are removed in the same order they are put in.
 * In other words, a queue is "First in, first out".
 * 
 * In a simple array implementation, where elements can
 * only be enqueued at the back of the array, and a head
 * pointer is used to mark the next element to be processed,
 * we would not be able to add more elements to a full array
 * until the array has been emptied.
 * 
 * A circular queue is a type of queue that lets us
 * reuse space in the array once it is no longer needed. 
 * If some elements at the front of a 'full' queue have
 * been processed, the tail pointer can wrap back around 
 * to the front and start re-filling the space in the
 * array before head pointer.
 */
class CircularQueue {
    queue: number[];
    head:  number | null;
    tail:  number | null;
    size:  number;

    constructor(k: number) {
        if (k <= 0) throw new Error('Must initialize with a value > 0');
        this.queue = new Array(k);
        this.head  = null; // index of front el
        this.tail  = null; // index of rear el
        this.size  = k;    // length of queue
    }
    
    /** 
     * Circularly increment an index:
     * Taking the mod of the new index using the
     * initialized size will 'wrap' the index back 
     * around if it is greater than the size.
     */
    _increment = (i) => { 
        return (i + 1) % this.size; 
    }

    /**
     * Checks if the queue is full.
     * It's full if incrementing the tail
     * pointer would place it in the same
     * position as the head pointer.
     */
    isFull = (): boolean => { 
        return this._increment(this.tail) === this.head; 
    }
    
    /**
     * Checks if the queue is empty.
     * We use null to represent the empty state.
     */
    isEmpty = (): boolean => { 
        return this.tail === null; 
    }

    /** 
     * Alias for `enqueue`.
     * Adds an element to the queue.
     * Returns `true` if successful,
     * `false` if the queue is full.
     */
    push = (val: number): boolean => { 
        return this.enqueue(val); 
    }

    /**
     * Handles adding a new value to the queue.
     * If the queue is empty, the value will be
     * set at index 0 as both head and tail.
     * Otherwise, increment the tail pointer
     * before setting the new value.
     */
    enqueue = (value: number): boolean => {
        if (this.isFull()) return false;
        // Initialize pointers to 0 if empty
        // otherwise increment normally
        if (this.isEmpty()) {
            this.head = 0;
            this.tail = 0;
        } else {
            this.tail = this._increment(this.tail);
        }
        this.queue[this.tail] = value;
        return true;
    }

    /**
     * Removes an element from the front
     * of the queue and returns its value.
     */
    pop = (): number | null => {
        const val = this.front();
        this.dequeue();
        return val;
    }

    /**
     * Removes an element from the queue
     * by moving the head pointer to the
     * next element (allowing the previous
     * element to be over-written when this 
     * space is next needed.)
     */
    dequeue = (): boolean => {
        if (this.isEmpty()) return false;
        // If the last element was just popped
        // set head/tail pointers to null.
        // Otherwise move head pointer to next el.
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this._increment(this.head);   
        }
        return true;
    }

    /**
     * Reads the value at the front of the queue
     */
    front = (): number | null => {
        if (this.isEmpty()) return null;
        return this.queue[this.head];
    }

    /**
     * Reads the value at tht rear of the queue
     */
    rear = (): number | null => {
        if (this.isEmpty()) return null;
        return this.queue[this.tail];
    }

    print = (): string => {
        let i = this.head;
        let q: Array<string | number> = ["head->"];
        while (i !== this.tail) {
            q.push(this.queue[i]);
            i = this._increment(i);
        }
        q.push(this.queue[this.tail]);
        return q.join(" ");
    }
}

//
// Testing
//

const q = new CircularQueue(3);

type Test = [(n?: number) => void, number?];

const testSuite: Test[] = [ 
    [q.enqueue, 1], // true
    [q.push, 2], // true
    [q.enqueue, 3], // true
    [q.enqueue, 4], // false
    [q.print], // 1 2 3
    [q.rear], // 3
    [q.isFull], // true
    [q.dequeue], // true
    [q.print], // 2 3
    [q.enqueue, 4], // true
    [q.print], // 2 3 4
    [q.pop], // 2
    [q.print], // 3 4
    [q.pop], // 3
    [q.pop], // 4
    [q.pop], // null
] 

testSuite.forEach(([fn, val]: Test) => {
    typeof val === 'number' 
        ? console.log(fn(val)) 
        : console.log(fn());
})