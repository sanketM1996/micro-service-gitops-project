# ================================
# Stage 1: Build React application
# ================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better Docker caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Vite environment variable
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build production application
RUN npm run build


# ================================
# Stage 2: Serve with Nginx
# ================================
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy React production build
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]