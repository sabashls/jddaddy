// GraphQL setup using Apollo Server and Express

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
const connectDB = require("../lib/db");

async function startGraphQL(app) {
  // Connect Database
  await connectDB();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Attach middleware
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  console.log("✅ GraphQL initialized");
}

module.exports = startGraphQL;
