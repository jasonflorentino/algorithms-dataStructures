const { puzzle: puzzle1, solution: solution1 } = require('./game01');
const { puzzle: puzzle2 } = require('./game02');
const { Sudoku } = require('./Sudoku');

// Test 1
const game1 = new Sudoku(puzzle1);
game1.solve();

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const expected = solution1[i][j];
        const received = game1.board[i][j];
        if (expected !== received) {
            console.log(`Failed: Expected ${expected}, Got ${received}`);
        }
    }
}
console.log("Pass");
console.log("Self assert 1:", game1.assertSolved());

// Test 2
const game2 = new Sudoku(puzzle2);
game2.solve();
console.log("Self assert 2:", game2.assertSolved());