const PostResolvers = require("./post");
const UserResolvers = require("./user");

// perform operations on each response
module.exports = {
  Query: {
    ...PostResolvers.Query,
    ...UserResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
  },
};
