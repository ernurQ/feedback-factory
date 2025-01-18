FROM node:22.11.0-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN yarn build:prod

EXPOSE 8000

CMD ["yarn", "start:prod"]
