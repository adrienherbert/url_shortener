FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY app.js ./

RUN mkdir -p var

ENV PORT=3000
ENV AUTH_USER=admin
ENV AUTH_PASS=password

EXPOSE 3000

CMD ["node", "app.js"]
