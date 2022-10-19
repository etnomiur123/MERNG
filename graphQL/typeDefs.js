const gql = require("graphql-tag");

module.exports = gql`
  type Post { #Post Interface
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }
  type User { # User Interface
    id: ID!
    userName: String!
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query { # define result types of queries
    getPosts: [Post]
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`;
