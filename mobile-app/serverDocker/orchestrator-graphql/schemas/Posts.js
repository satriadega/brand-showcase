const axios = require("axios");
const POSTS_SERVICE_URL =
  process.env.POSTS_SERVICE_URL || "http://localhost:4002";
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:4001";
const redis = require("../config/redisConnection");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.

  type Category {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type Tag {
    id: ID
    postId: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Post {
    id: ID
    title: String
    slug: String
    imgUrl: String
    content: String
    authorId: ID
    categoryId: ID
    createdAt: String
    updatedAt: String
    UserMongoId: String
    Category: Category
    Tags: [Tag]
    Author: User
    
  }

  input PostInput {
    title: String!
    imgUrl: String!
    content: String!
    categoryId: ID!
    mongoId: String!
    tags: [String!]
  }


  type Query {
    posts: [Post]
    post(id: ID!): Post
    # user: User
  }

  type Mutation {
    createPost(newPost: PostInput!): Post
    updatePost(newPost: PostInput!, id:ID!): Post
    deletePost( id:ID!): Post
  }
`;

const resolvers = {
  Query: {
    posts: async (_) => {
      try {
        await redis.del("posts");
        console.log("jalan");
        const postsCache = await redis.get("posts");
        if (postsCache) {
          const postsParsed = JSON.parse(postsCache);
          console.log("ada cache");
          return postsParsed;
        } else {
          console.log("ga ada cache");
          const { data: posts } = await axios.get(POSTS_SERVICE_URL + "/posts");
          await redis.set("posts", JSON.stringify(posts.result));
          return posts.result;
        }
      } catch (error) {
        console.log("🚀 ~ file: app.js ~ line 88 ~ products: ~ error", error);
        throw error;
      }
    },

    post: async (_, args) => {
      try {
        await redis.del("posts/" + args.id);
        const postsCache = await redis.get("posts/" + args.id);
        if (postsCache) {
          const postsParsed = JSON.parse(postsCache);
          console.log("ada cache");
          return postsParsed;
        } else {
          const { data: post } = await axios.get(
            POSTS_SERVICE_URL + "/posts/" + args.id
          );
          console.log(post.UserMongoId);
          const { data: user } = await axios.get(
            USER_SERVICE_URL + "/users/" + post.UserMongoId
          );
          // console.log(user);
          post.Author = user.message;
          await redis.setex("posts/" + args.id, 300, JSON.stringify(post));
          return post;
        }
      } catch (error) {
        console.log("🚀 ~ file: app.js ~ line 99 ~ post: ~ error", error);
        throw error;
      }
    },
    // user: async (_) => {
    //   try {
    //     const { data: user } = await axios.get(
    //       USER_SERVICE_URL + "/users/6505855f5f3de4a772e31af5"
    //     );
    //     console.log(user);
    //     return user.message;
    //   } catch (error) {
    //     console.log("🚀 ~ file: app.js ~ line 88 ~ products: ~ error", error);
    //     throw error;
    //   }
    // },
  },

  Mutation: {
    createPost: async (_, args) => {
      try {
        const { data: post } = await axios.post(
          POSTS_SERVICE_URL + "/posts",
          args.newPost
        );
        await redis.del("posts");
        return post;
      } catch (error) {
        console.log(
          "🚀 ~ file: app.js ~ line 113 ~ createPost: ~ error",
          error
        );
        throw error;
      }
    },
    updatePost: async (_, args) => {
      try {
        const { data: post } = await axios.put(
          POSTS_SERVICE_URL + "/posts/" + args.id,
          args.newPost
        );
        await redis.del("posts");
        await redis.del("posts/" + args.id);
        return post;
      } catch (error) {
        console.log(
          "🚀 ~ file: app.js ~ line 113 ~ updatePost: ~ error",
          error
        );
        throw error;
      }
    },
    deletePost: async (_, args) => {
      try {
        await redis.del("posts");
        await redis.del("posts/" + args.id);
        const { data: post } = await axios.delete(
          POSTS_SERVICE_URL + "/posts/" + args.id
        );
        return post;
      } catch (error) {
        console.log(
          "🚀 ~ file: app.js ~ line 113 ~ deletePost: ~ error",
          error
        );
        throw error;
      }
    },
  },
};

module.exports = {
  postTypeDefs: typeDefs,
  postResolvers: resolvers,
};
