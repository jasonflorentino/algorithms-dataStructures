"""
Sudoku Solver
"""

# Fn for solving a sudoku puzzle
def solve(board):
    for y in range(9):
        for x in range(9):
            if board[y][x] == 0:
                for n in range(1,10):
                    if isPossible(board, y, x, n):
                        board[y][x] = n
                        if solve(board):
                            return board
                        else:
                            board[y][x] = 0
                return False
    return board

# Helper fn to test if given num is valid
def isPossible(board, y, x, n):
    for y2 in range(9):
        if board[y2][x] == n:
            return False

    for x2 in range(9):
        if board[y][x2] == n:
            return False

    for y2 in range(3):
        for x2 in range(3):
            relativeY = y - (y % 3) + y2
            relativeX = x - (x % 3) + x2
            val = board[relativeY][relativeX]
            if val == n:
                return False

    return True

def printSudokuBoard(board):
    horzOut = "-------------------------"
    horzMid = "|-------+-------+-------|"
    for y in range(9):
        if y == 0: print(horzOut)
        elif y % 3 == 0: print(horzMid)
        line = []
        for x in range(9):
            if x % 3 == 0: line.append("| ")
            line.append(str(board[x][y]))
            line.append(" ")
        line.append("|")
        print("".join(line))
    print(horzOut)

# Test puzzle. 0 = Empty
puzzle = [
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

# Solve the puzzle, print result
solved = solve(puzzle)
printSudokuBoard(solved)