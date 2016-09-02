#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker stop highfive-client

docker rm highfive-client

docker build -t highfive-client-img --force-rm .

docker create \
    -t -i \
    -p 2368:2368 \
    -v "$DIR":/app \
    --name=highfive-client \
    highfive-client-img

docker start -a -i highfive-client

