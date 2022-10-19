// dependencies
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// files
const { MONGODB } = require("./config");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

// setup the server with structure and corresponding resolvers
const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Connected to database");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
