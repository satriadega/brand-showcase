require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4002;
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
