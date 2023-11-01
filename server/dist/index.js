"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
require("dotenv/config");
const port = process.env.PORT || 3000;
async function startServer() {
    const server = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default
        .connect("mongodb://127.0.0.1:27017/Books", {
        dbName: "BookDB",
        retryWrites: true,
        w: "majority",
    })
        .then(() => {
        console.log("connected");
    })
        .catch((e) => console.log(e));
    await server.start();
    const app = (0, express_1.default)();
    server.applyMiddleware({ app: app, path: "/graphql" });
    app.listen(port, () => {
        console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
}
startServer();
