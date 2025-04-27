FROM oven/bun

WORKDIR /app

COPY package.json .

COPY bun.lock .

RUN bun install

COPY . .

EXPOSE 4001

CMD ["bun","run","dev"]