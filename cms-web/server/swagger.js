const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Documentation",
    description: "Auto-generated Swagger API documentation",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000", // Ensure this is the correct URL
      description: "Development Server",
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js", "./routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger JSON generated!");
});
