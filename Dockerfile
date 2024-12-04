FROM node:20-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container image
COPY server.js .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
