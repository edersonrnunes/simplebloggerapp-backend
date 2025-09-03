# Use an official Node.js image as the base
FROM node:lts-alpine
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# Install application dependencies
RUN npm install
# Install MongoDB client
RUN npm install mongodb
# Copy the rest of your application code
COPY . .
# Expose the port your Node.js app listens on
EXPOSE 8000
# Command to run your application
CMD ["node", "server.js"]