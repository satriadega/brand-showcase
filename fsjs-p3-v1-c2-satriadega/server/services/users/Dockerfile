#  based image yang digunakan
FROM node:lts-hydrogen

WORKDIR /user

ENV NODE_ENV=production
ENV PORT=4001

COPY package.json package-lock.json /user/

RUN npm install nodemon -g
RUN npm install

COPY . .

CMD ["nodemon", "app.js"]