#!/bin/bash
rm -rf build
mkdir build

cp -r ../../espurna/firmware ./build/
#cp -r ./data ./build/
npm run cmpl
npm start

