/** Class representing a Sudoku game */
class Sudoku {
    constructor(game) {
        this.board = game;
    }

    /** Solves the current board */
    solve = () => {
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++)  {
                if (this.board[y][x] === 0) {
                    for (let i = 1; i <= 9; i++) {
                        if (this.isPossibleNum(y,x,i)) {
                            this.board[y][x] = i;
                            if (this.solve()) {
                                return true;
                            } else {
                                this.board[y][x] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    /** Helper to test if given number is a possible choice */
    isPossibleNum = (y, x, num) => {
        let isValidRow = true;
        let isValidCol = true;
        let isValidBox = true;
        
        for (const val of this.board[y]) {
            if (num === val) isValidRow = false;
        }

        for (const row of this.board) {
            if (num === row[x]) isValidCol = false;
        }

        for (let y2 = 0; y2 < 3; y2++) {
            for (let x2 = 0; x2 < 3; x2++) {
                const relativeY = y - (y % 3) + y2;
                const relativeX = x - (x % 3) + x2;
                const val = this.board[relativeY][relativeX];
                if (num === val) isValidBox = false;
            }
        }

        return isValidRow && isValidCol && isValidBox;
    }

    /** Walks through a complete boards and asserts it is correct */
    assertSolved = () => {
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++)  {
                const val = this.board[y][x];
                this.board[y][x] = 0;
                let possibleNums = [];

                for (let i = 1; i <= 9; i++) {
                    if (this.isPossibleNum(y,x,i)) {
                        possibleNums.push(i);
                    }
                }

                if (possibleNums.length > 1) return false;
                if (possibleNums[0] !== val) return false;
                this.board[y][x] = val;
            }
        }
        return true;
    }

    /** Prints the board with borders around the boxes */
    print = () => {
        const output  = [];
        const horzOut = "-------------------------"
        const horzMid = "|-------+-------+-------|"

        for (let y = 0; y < 9; y++) {
            if (y === 0) output.push(horzOut);
            else if ( y % 3 === 0) output.push(horzMid)

            let line = [];
            for (let x = 0; x < 9; x++) {
                if (x % 3 === 0) line.push("| ");
                line.push(this.board[y][x]);
                line.push(" ");
            }
            line.push("|")
            output.push(line.join(""));
        }

        output.push(horzOut)
        console.log(output.join('\n'))
    }
}

module.exports = {
    Sudoku
}