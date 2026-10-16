
# Stage 1: Install production dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# Stage 2: Production runtime
FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

# Run the application as a non-root user
COPY --from=deps --chown=node:node /app/node_modules ./node_modules

# Copy application source and package metadata
COPY --chown=node:node package*.json ./
COPY --chown=node:node src ./src

USER node

EXPOSE 4002

CMD ["npm", "start"]
