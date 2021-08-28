#! /bin/bash

FILES="test.js kruskalsMst.js ./tests/index.js ./tests/test01.js ./tests/test02.js"

tsc 
node test.js
for FILE in $FILES
  do
    rm $FILE
  done