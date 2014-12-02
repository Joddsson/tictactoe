#!/bin/bash
echo "in deploy script"

ssh root@178.62.248.172 '
docker kill tictactoe
docker rm tictactoe
docker pull tictactoe
docker run tictactoe
docker push tictactoe
'
ls

echo "done"	