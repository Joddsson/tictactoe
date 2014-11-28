export PATH=$PATH:/usr/local/bin
#!/bin/bash
echo Cleaning...
rm -rf ./dist

bower install

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t joddsson/tictactoe .

echo "Done"
