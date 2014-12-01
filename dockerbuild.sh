#!/bin/bash

#set -e
#set -o pipefail

export PATH=$PATH:/usr/local/bin
#rm -rf node_modules && npm cache clean && npm i

echo Cleaning...
rm -rf ./dist

bower install

echo Building app
grunt

rc=$?
if [[ $rc != 0 ]] ; then
    exit $rc
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t joddsson/tictactoe .

rc=$?
if [[ $rc != 0 ]] ; then
    exit $rc
fi

echo "Done"
