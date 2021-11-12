# Sudoku

I tried to make a procedure that solves a sudoku puzzle early on in my programming journey and quickly found that I was way out of my depth. Coming back to it after hearing some ideas about it, I thought, I could definitely try my own implementation now!

## Contents
- I've included 2 games: `game01.js` is really simple to make for easy testing/debugging, and `game02.js` is a real game lifted from the wikipedia page for Sudoku.
- `Sudoku.js` and `Sudoku.test.js` are my frist crack. Felt natural making it OOP style as a class with methods that interact with the board.
- `sudoku.py` is a Python implementation to share with non-programming friends since Python syntax is a little easier on the eyes.
- `console-script.js` is a slightly shortened, function-based version, literally meant for pasting in to the browser console. Again, for those who don't have a runtime or IDE handy.

## Pseudocode
```
Function to solve a sudoku puzzle:
    For each row in the board
        For each spot in that row
            If that spot is empty
                For numbers 1 through 9
                    If that number is a valid choice
                        Set that number in this spot
                        Call Solve function again
                        If Solve returns true
                            Return true
                        Else
                            Set this spot to empty
                After going through all numbers (with no valid choice)
                    Return false
    After making it through all rows
        Return true
```