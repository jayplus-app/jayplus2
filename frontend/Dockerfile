# Use Node.js image to build the React application
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy other project files and build the project
COPY . .
RUN npm run build

# Use Nginx to serve the build
FROM nginx:alpine


# Copy the build from builder stage to nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
