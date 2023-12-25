#!/bin/sh

docker buildx build -t evildev-front:latest .
if  [ ! -z "$CONTAINER_ID" ] 
then 
	docker stop $CONTAINER_ID
	docker remove $CONTAINER_ID
fi

export CONTAINER_ID="$(docker run -dp 3000:3000 --name evildev-front evildev-front:latest)"
