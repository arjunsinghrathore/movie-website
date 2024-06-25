# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json ./
COPY package-lock.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 to be able to access the application
EXPOSE 3000

# Specify the command to run the application
CMD ["npm", "start"]

