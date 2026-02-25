// GraphQL setup using Apollo Server and Express

import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema.js";
import resolvers from "./resolver.js";
import connectDB from "../lib/db.js";

export default async function  startGraphQL(app) {
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

