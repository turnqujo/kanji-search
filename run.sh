#!/bin/bash
while getopts "p" arg; do
    case $arg in
      p) prod='true' ;;
      *) exit 1 ;;
    esac
done

if [ $prod ]
then
  cd client/; npm run-script build; serve -s dist/ &
  cd ../api; go run staticServer.go
else
  cd client/; npm run-script serve &
  cd ../api; go run staticServer.go
fi

