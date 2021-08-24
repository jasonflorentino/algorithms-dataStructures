#! /bin/bash
FILE_NAMES="quickFind quickUnion"

for FILE in $FILE_NAMES
  do
    echo "Bash: Running tests with file: $FILE"
    node ./test.js $FILE
done