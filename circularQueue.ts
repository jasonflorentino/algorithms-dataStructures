class MyCircularQueue {
    queue: Array<number>;
    head:  number | null;
    tail:  number | null;
    size:  number;

    constructor(k: number) {
        this.queue = new Array(k);
        this.head  = null; // index of front el
        this.tail  = null; // index of rear el
        this.size  = k;    // len of queue
    }
    
    /** Circularly increment an index */
    _increment(i: number): number { return (i + 1) % this.size; }

    _enQueue(value: number): boolean {
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

    _deQueue(): boolean {
        if (this.isEmpty()) return false;
        // If that was the last element in queue
        // set head/tail pointers to null.
        // Otherwise increment head normally
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this._increment(this.head);   
        }
        return true;
    }

    front(): number {
        if (this.isEmpty()) return -1;
        return this.queue[this.head];
    }

    rear(): number {
        if (this.isEmpty()) return -1;
        return this.queue[this.tail];
    }

    isEmpty(): boolean { return this.tail === null; }
    isFull(): boolean { return this._increment(this.tail) === this.head; }

    pop(): number {
        const val = this.front();
        this._deQueue();
        return val;
    }

    push(val: number): boolean { 
        return this._enQueue(val); 
    }

    print(): void {
        let i = this.head;
        let q = "head-> ";
        while (i !== this.tail) {
            q += this.queue[i] + " ";
            i = this._increment(i);
        }
        q += this.queue[this.tail];
        console.log(q);
    }
}

const q = new MyCircularQueue(3); // null
q._enQueue(1); // true
q._enQueue(2); // true
q._enQueue(3); // true
q._enQueue(4); // false
q.print(); // 1 2 3
q.rear(); // 3
q.isFull(); // true
q._deQueue(); // true
q.print(); // 2 3
q._enQueue(4); // true
q.print(); // 2 3 4
q.pop(); // 2
q.print(); // 3 4