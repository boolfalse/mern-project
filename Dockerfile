FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json (frontend and backend)
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies (frontend and backend)
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy source code directories (frontend and backend)
COPY frontend/ ./frontend/
COPY backend/ ./backend/

# Expose ports for both frontend and backend
EXPOSE 3000 5173
