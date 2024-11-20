# Stage 1: Build the application
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite application for production
RUN npm run build

# Stage 2: Serve the built app using a simple Node.js server
FROM node:18 AS production

# Set working directory
WORKDIR /app

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Copy build files from the build stage
COPY --from=build /app/build /app

# Expose the desired port
EXPOSE 2032

# Start the app with 'serve'
CMD ["serve", "-s", ".", "-l", "2032"]
