const axios = require("axios");
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:4001";
const redis = require("../config/redisConnection");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }


  input UserInput {
    username: String!
    email: String!
    password: String!
    role: String!
    phoneNumber: String!
    address: String!
  }


  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(newPost: UserInput!): User
    deleteUser( id:ID!): User
  }
`;

const resolvers = {
  Query: {
    users: async (_) => {
      try {
        const usersCache = await redis.get("users");
        if (usersCache) {
          // await redis.del("users");
          const usersParsed = JSON.parse(usersCache);
          console.log("ada cache");
          return usersParsed;
        } else {
          console.log("ga ada cache");
          const { data: users } = await axios.get(USER_SERVICE_URL + "/users");
          await redis.set("users", JSON.stringify(users.message));
          return users.message;
        }
      } catch (error) {
        console.log("🚀 ~ file: app.js ~ line 88 ~ users: ~ error", error);
        throw error;
      }
    },

    user: async (_, args) => {
      try {
        const usersCache = await redis.get("users/" + args.id);
        if (usersCache) {
          const usersParsed = JSON.parse(usersCache);
          console.log("ada cache");
          return usersParsed;
        } else {
          const { data: user } = await axios.get(
            USER_SERVICE_URL + "/users/" + args.id
          );
          await redis.setex(
            "users/" + args.id,
            300,
            JSON.stringify(user.message)
          );
          return user.message;
        }
      } catch (error) {
        console.log("🚀 ~ file: app.js ~ line 99 ~ user: ~ error", error);
        throw error;
      }
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      try {
        const { data: user } = await axios.post(
          USER_SERVICE_URL + "/users",
          args.newPost
        );
        await redis.del("users");
        return user.message;
      } catch (error) {
        console.log(
          "🚀 ~ file: app.js ~ line 113 ~ createUser: ~ error",
          error
        );
        throw error;
      }
    },
    deleteUser: async (_, args) => {
      try {
        await redis.del("users");
        await redis.del("users/" + args.id);
        const { data: user } = await axios.delete(
          USER_SERVICE_URL + "/users/" + args.id
        );
        return user.message;
      } catch (error) {
        console.log(
          "🚀 ~ file: app.js ~ line 113 ~ deleteUser: ~ error",
          error
        );
        throw error;
      }
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
