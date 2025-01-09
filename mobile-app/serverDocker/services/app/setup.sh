#!/bin/bash

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install it first."
    exit 1
fi

# Run npm install
echo "Running npm install..."
npm install

# Run npx sequelize db:create
echo "Creating database..."
npx sequelize db:create

# Run npx sequelize db:migrate
echo "Running migrations..."
npx sequelize db:migrate

# Run npx sequelize db:seed:all
echo "Seeding database..."
npx sequelize db:seed:all

echo "All tasks completed successfully."
