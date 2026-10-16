
# Stage 1: Install production dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# Stage 2: Production runtime
FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

# Copy production dependencies
COPY --from=deps --chown=node:node /app/node_modules ./node_modules

# Copy application files
COPY --chown=node:node package*.json ./
COPY --chown=node:node src ./src

# Run as a non-root user
USER node

EXPOSE 4000

CMD ["npm", "start"]
