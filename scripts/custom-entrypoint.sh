#!/bin/bash

echo "Running MySQL custom entrypoint..."

# Start MySQL in the background
/usr/local/bin/docker-entrypoint.sh mysqld &

# Wait for MySQL to be ready
until mysqladmin ping -h "localhost" --silent; do
    echo "Waiting for MySQL to start..."
    sleep 2
done

echo "Executing init-check.sh..."
bash /docker-entrypoint-initdb.d/init-check.sh

# Bring MySQL to the foreground
wait
