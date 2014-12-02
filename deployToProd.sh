#!/bin/bash
echo "in deploy script"

ssh -t -t -o StrictHostKeyChecking=no root@178.62.248.172 '
ls

pwd
'
ls

echo "done"	