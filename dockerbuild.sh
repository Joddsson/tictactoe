export PATH=$PATH:/usr/local/bin
#!/bin/bash
npm install -g grunt-cli
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
