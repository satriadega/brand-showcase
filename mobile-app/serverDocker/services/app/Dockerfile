#  based image yang digunakan
FROM node:lts-hydrogen

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4002
ENV DATABASE_URL=process.env.POSTGRE_DB_URL

COPY package.json package-lock.json /app/


RUN npm install nodemon -g
RUN npm install
RUN export DATABASE_URL=postgresql://postgres:1tz2DPC3Ya2ihAiE@db.kawkkynedrcphkmvdxyp.supabase.co:5432/postgres

COPY . .

RUN npx sequelize-cli db:migrate --env=production

CMD ["nodemon", "app.js"]