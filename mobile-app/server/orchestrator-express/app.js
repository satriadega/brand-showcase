const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const axios = require("axios");
const redis = require("./config/redisConnection");
const POSTS_SERVICE_URL = "http://localhost:4002";
const USER_SERVICE_URL = "http://localhost:4001";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.get("/users", async (req, res) => {
  try {
    const usersCache = await redis.get("users");
    if (usersCache) {
      const usersParsed = JSON.parse(usersCache);
      console.log("ada cache");
      res.status(200).json(usersParsed);
    } else {
      const { data } = await axios.get(USER_SERVICE_URL + "/users");
      await redis.set("users", JSON.stringify(data));
      console.log("ga ada cache");
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userCache = await redis.get("users/" + id);
    if (userCache) {
      const userParsed = JSON.parse(userCache);
      console.log("ada cache");
      res.status(200).json(userParsed);
    } else {
      const { data } = await axios.get(USER_SERVICE_URL + "/users/" + id);
      await redis.setex("users/" + id, 300, JSON.stringify(data));
      console.log("ga ada cache");
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    const { data } = await axios.post(USER_SERVICE_URL + "/users", req.body);
    await redis.del("users");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data } = await axios.delete(USER_SERVICE_URL + "/users/" + id);
    await redis.del("users");
    await redis.del("users/" + id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const postsCache = await redis.get("posts");
    if (postsCache) {
      const postsParsed = JSON.parse(postsCache);
      res.status(200).json(postsParsed);
      console.log("ada cache");
    } else {
      console.log("ga ada cache");
      const { data } = await axios.get(POSTS_SERVICE_URL + "/posts");
      await redis.set("posts", JSON.stringify(data));
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  // console.log("jalan");
  try {
    const postsCache = await redis.get("posts/" + id);
    if (postsCache) {
      console.log("ada cache");
      const postsParsed = JSON.parse(postsCache);
      console.log("ada cache");
      res.status(200).json(postsParsed);
    } else {
      console.log("ga ada cache");
      const { data } = await axios.get(POSTS_SERVICE_URL + "/posts/" + id);
      const { data: user } = await axios.get(
        USER_SERVICE_URL + "/users/" + data.UserMongoId
      );
      data.User = user;
      await redis.setex("posts/" + id, 300, JSON.stringify(data));

      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/posts", async (req, res) => {
  console.log(req.body);
  try {
    const { data } = await axios.post(POSTS_SERVICE_URL + "/posts", req.body);
    await redis.del("posts");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  // console.log("jalan");
  try {
    const { data } = await axios.put(
      POSTS_SERVICE_URL + "/posts/" + id,
      req.body
    );
    await redis.del("posts");
    await redis.del("posts/" + id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(POSTS_SERVICE_URL + "/posts/" + id);
    await redis.del("posts");
    await redis.del("posts/" + id);
    res.status(200).json({ message: "success delete post with id: " + id });
  } catch (err) {
    console.log(err);
    // res.send(JSON.stringify(err));
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
