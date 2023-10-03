require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { postTypeDefs, postResolvers } = require("./schemas/Posts");
const { userTypeDefs, userResolvers } = require("./schemas/Users");
const { startStandaloneServer } = require("@apollo/server/standalone");
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: [postTypeDefs, userTypeDefs],
  resolvers: [postResolvers, userResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: {
    port: PORT,
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
