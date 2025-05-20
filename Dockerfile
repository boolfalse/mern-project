# Use Node.js 22
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend files
COPY backend/ ./

# Expose port 3000
EXPOSE 3000

# Start backend
CMD ["npm", "start"]