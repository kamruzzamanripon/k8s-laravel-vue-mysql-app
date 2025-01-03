#!/bin/bash

# Change to the Laravel app directory
cd /app/api

composer install

DB_HOST=${DB_HOST:-mysql}  # Default to "mysql" as the hostname

echo "Waiting for database to be ready..."
until nc -z -v -w30 $DB_HOST 3306; do
    echo "Waiting for database connection..."
    sleep 1
done

echo "Running migrations and seeders..."
php artisan migrate:refresh --seed

echo "Starting PHP-FPM and Nginx..."
php-fpm -D
nginx -g 'daemon off;'
