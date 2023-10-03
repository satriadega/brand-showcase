#  based image yang digunakan
FROM node:lts-hydrogen

WORKDIR /orchestrator

ENV NODE_ENV=production
ENV PORT=4000
ENV POSTS_SERVICE_URL=http://localhost:4002
ENV USER_SERVICE_URL=http://localhost:4001

COPY package.json package-lock.json /orchestrator/

RUN npm install nodemon -g
RUN npm install

COPY . .

CMD ["nodemon", "app.js"]