/** 
 * Simpler and separated for easy copy/pasta
 */

// Fn for solving a sudoku puzzle
function solve(board) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++)  {
            if (board[y][x] === 0) {
                for (let n = 1; n <= 9; n++) {
                    if (isPossible(board,y,x,n)) {
                        board[y][x] = n;
                        if (solve(board)) {
                            return board;
                        } else {
                            board[y][x] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return board;
}

// Helper fn to test if given num is valid
function isPossible(board, y, x, num) {
    for (const val of board[y]) {
        if (num === val) return false;
    }

    for (const row of board) {
        if (num === row[x]) return false;
    }

    for (let y2 = 0; y2 < 3; y2++) {
        for (let x2 = 0; x2 < 3; x2++) {
            const relativeY = y - (y % 3) + y2;
            const relativeX = x - (x % 3) + x2;
            const val = board[relativeY][relativeX];
            if (num === val) return false;
        }
    }

    return true;
}

// Util fn to print the board
// with boarders around the boxes
function print(board) {
    const output  = [];
    const horzOut = "-------------------------"
    const horzMid = "|-------+-------+-------|"

    for (let y = 0; y < 9; y++) {
        if (y === 0) output.push(horzOut);
        else if ( y % 3 === 0) output.push(horzMid)

        let line = [];
        for (let x = 0; x < 9; x++) {
            if (x % 3 === 0) line.push("| ");
            line.push(board[y][x]);
            line.push(" ");
        }
        line.push("|")
        output.push(line.join(""));
    }

    output.push(horzOut)
    console.log(output.join('\n'))
}

// Test puzzle. 0 = Empty
const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
]

// Solve the puzzle then print what comes back
print(solve(puzzle));