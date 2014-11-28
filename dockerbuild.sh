export PATH=$PATH:/usr/local/bin
#!/bin/bash
rm -rf node_modules && npm cache clean && npm i
echo Cleaning...
rm -rf ./dist

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t joddsson/tictactoe .

echo "Done"
