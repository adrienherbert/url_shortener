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

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/health 2>/dev/null | grep -q ok || exit 1

CMD ["node", "app.js"]
