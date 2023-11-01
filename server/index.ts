import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import "dotenv/config";
const port = process.env.PORT || 3000;

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb://127.0.0.1:27017/books", {
      dbName: "bookDB",
      retryWrites: true,
      w: "majority",
    })
    .then(() => {
      console.log("connected");
    })
    .catch((e) => console.log(e));

  await server.start();

  const app = express();

  server.applyMiddleware({ app: app, path: "/graphql" });

  app.listen(port, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
}

startServer();
