FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@11.24.0

COPY package*.json pnpm-lock.taml ./

RUN pnpm install --prod --frozen-lockfile

COPY . .

EXPOSE 4000
ENV NODE_ENV=production

CMD [ "node","dist/index.js" ]