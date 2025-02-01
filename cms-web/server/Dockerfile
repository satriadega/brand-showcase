# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (adjust if needed)
EXPOSE 3000

# Start the application and run database setup
CMD npx sequelize-cli db:drop && \
    npx sequelize-cli db:create && \
    npx sequelize-cli db:migrate && \
    npx sequelize-cli db:seed:all && \
    npm run dev
