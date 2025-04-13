FROM node:23-slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set PORT environment variable
ENV PORT=9000

# Expose the port the app runs on
EXPOSE 9000

# Start the application
CMD ["npm", "start"]
