// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

// Import local modules
const routes = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const swaggerDocument = require("./swagger-output.json");

// App initialization
const app = express();
const PORT = process.env.PORT || 3000;
const SWAGGER_PORT = 6661;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);
app.use(errorHandler);

// Swagger Documentation Setup
const setupSwaggerDocs = () => {
  const swaggerApp = express();
  swaggerApp.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

  swaggerApp.listen(SWAGGER_PORT, () => {
    console.log(
      `Swagger Docs available at http://localhost:${SWAGGER_PORT}/api-docs`
    );
  });
};

// Start Servers
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// Initialize Services
setupSwaggerDocs();
startServer();
