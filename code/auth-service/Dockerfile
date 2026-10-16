
# Stage 1: Install dependencies
FROM node:20-alpine AS deps

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


# Stage 2: Build the application
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .


# Stage 3: Production runtime
FROM node:20-alpine AS production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build --chown=node:node /usr/src/app/src ./src

USER node

EXPOSE 4001

CMD ["npm", "start"]
