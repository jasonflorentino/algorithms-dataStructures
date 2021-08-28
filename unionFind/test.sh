#! /bin/bash
FILE_NAMES="v01_quickFind v02_quickUnion v03_UnionByRank v04_PathCompression"

for FILE in $FILE_NAMES
  do
    echo "Bash: Running tests with file: $FILE"
    node ./test.js $FILE
done