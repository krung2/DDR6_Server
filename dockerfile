FROM node:12
WORKDIR /usr/src/DDR6

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]