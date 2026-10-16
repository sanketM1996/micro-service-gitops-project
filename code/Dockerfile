FROM node:20-alpine

ARG SERVICE_DIR
ARG PORT=4000

WORKDIR /app

ENV NODE_ENV=production

COPY ${SERVICE_DIR}/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY --chown=node:node ${SERVICE_DIR}/src ./src

USER node

EXPOSE ${PORT}

CMD ["npm", "start"]
