#!/bin/bash

set -e
export PATH=$PATH:/usr/local/bin
#rm -rf node_modules && npm cache clean && npm i

echo Cleaning...
rm -rf ./dist

bower install
npm install

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t joddsson/tictactoe .

echo Accessing acceptance test server
ssh root@178.62.224.49'
echo "Successful ssh"

docker kill tictactoe
echo "After kill"

docker rm tictactoe
echo "After rm"

docker pull joddsson/tictactoe
echo "After pull"

docker run -p 80:8080 -d -e "NODE_ENV=production" --name="tictactoe" joddsson/tictactoe
echo "After run"

exit
'

echo "done"     


rc=$?
if [[ $rc != 0 ]] ; then
    exit $rc
fi

echo "Done"
