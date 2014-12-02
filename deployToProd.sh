#!/bin/bash
echo "in deploy script"

docker push joddsson/tictactoe

ssh root@178.62.248.172 '
docker kill tictactoe
docker rm tictactoe
docker pull joddsson/tictactoe
docker run -p 80:8080 -d -e "NODE_ENV=production" --name="tictactoe" joddsson/tictactoe
exit
'

echo "done"	