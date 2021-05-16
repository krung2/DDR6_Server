FROM node:12
WORKDIR /usr/src/DDR6

COPY . .

RUN npm i yarn

RUN yarn
RUN yarn build

CMD ["yarn", "start:prod"]