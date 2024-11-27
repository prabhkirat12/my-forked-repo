#!/bin/bash

# MySQL root credentials
MYSQL_ROOT_PASSWORD="moeroot"

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
until mysqladmin ping -h "moe-mysql-app" -u root -p"${MYSQL_ROOT_PASSWORD}" --silent; do
    echo "MySQL is unavailable - sleeping"
    sleep 2
done

echo "MySQL is up - proceeding with database initialization."

# Check if the required table exists
TABLE_EXISTS=$(mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -D photodb -e "SHOW TABLES LIKE 'bookingshoot';" | grep -c "bookingshoot")

if [ "$TABLE_EXISTS" -eq 0 ]; then
    echo "Table 'bookingshoot' not found. Importing photodb.sql..."
    mysql -u root -p"${MYSQL_ROOT_PASSWORD}" photodb < /docker-entrypoint-initdb.d/photodb.sql
    if [ $? -eq 0 ]; then
        echo "Database import completed successfully."
    else
        echo "Error occurred during database import." >&2
        exit 1
    fi
else
    echo "Table 'bookingshoot' already exists. Skipping import."
fi
