#!/bin/sh



# Wait for MySQL to be ready
# until mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" -h mysql -e "SELECT 1"; do
#   echo "Waiting for MySQL to be ready..."
#   sleep 3
# done

# Check if the 'users' table exists and run migrations if necessary
if ! mysql -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" -h mysql -e "USE ${MYSQL_DATABASE}; SHOW TABLES LIKE 'users';" | grep -q 'users'; then
  echo "No tables found, running migrations..."
  php artisan migrate:fresh --seed
else
  echo "Tables already exist, skipping migrations..."
fi

# Start PHP-FPM and Nginx for production setup
php-fpm -D
nginx -g 'daemon off;'
