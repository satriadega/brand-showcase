require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4001;
const app = express();
const { connect, getDB } = require("./config/mongoConnection.js");
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});
