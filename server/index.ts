import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb://127.0.0.1:27017/Books", {
      dbName: "BookDB",
      retryWrites: true,
      w: "majority",
    })
    .then(() => {
      console.log("connected");
    })
    .catch((e) => console.log("Not connected", e));
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`:rocket:  Server ready at: ${url}`);
}
startServer();