const Redis = require("ioredis");
const redis = new Redis({
  port: 18042, // Redis port
  host: "redis-18042.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "dIAc2q2Na2pvybPL0HmXy1eAARsCQvPO",
});

module.exports = redis;
