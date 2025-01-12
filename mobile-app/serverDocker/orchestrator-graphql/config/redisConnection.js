const Redis = require("ioredis");
const redis = new Redis({
  port: 6665, // Redis Docker port
  host: process.env.NODE_ENV ? "172.17.0.1" : "127.0.0.1", // Localhost
});

module.exports = redis;
