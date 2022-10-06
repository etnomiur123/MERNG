// dependencies
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

// files
const { MONGODB } = require("./config");
const Post = require("./models/Post");
const User = require("./models/User");

// define structure of response
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }
  type User {
    id: ID!
    userName: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
    getUsers: [User]
  }
`;

// perform operations on each response
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

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
