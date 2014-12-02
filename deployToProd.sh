#!/bin/bash
echo "in deploy script"

ssh -t -t root@178.62.248.172 '
ls

pwd
'
ls

echo "done"
