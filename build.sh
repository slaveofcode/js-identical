#!/bin/sh

rm -Rf ./build
mkdir build
./node_modules/.bin/tsc --build tsconfig.prod.json
./node_modules/.bin/ef-tspm -c tsconfig.prod.json