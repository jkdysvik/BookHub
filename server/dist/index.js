"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
async function startServer() {
    const server = new server_1.ApolloServer({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
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
        .catch((e) => console.log("Not connected", e));
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`:rocket:  Server ready at: ${url}`);
}
startServer();
