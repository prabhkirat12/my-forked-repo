# Use the official Node.js image as the base
FROM node:21

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Ensure scripts have executable permissions
RUN chmod +x /usr/src/app/scripts/init-check.sh || true
RUN chmod +x /usr/src/app/test-db.js || true
RUN chmod +x ./scripts/custom-entrypoint.sh

# Expose the application port
EXPOSE 8005

# Command to start the application
CMD [ "npm", "start" ]
