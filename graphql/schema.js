import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(id: ID!): String
  }
`;

export default typeDefs;
