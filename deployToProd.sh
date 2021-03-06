#!/bin/bash
echo "in deploy script"
docker push joddsson/tictactoe

ssh root@178.62.225.199 '
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