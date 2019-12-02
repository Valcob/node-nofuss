#!/bin/sh

rm -rf build
mkdir build
mkdir build/firmware

cp -r ../espurna/firmware ./build/
status=$?

[ ! -f ./build/firmware/version.json ] && cp ./data/version.json ./build/firmware/

#cp -r ./data ./build/
npm run build
