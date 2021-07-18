import { ApolloServer } from "apollo-server-lambda";

import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
  return error;
},
formatResponse: response => {
  return response;
},
context:  ({event,context}) => ({
  headers: event.headers,
  functionName: context.functionName, 
  event,
    context
}),
tracing: true,
playground: true
});

exports.graphql = (event, context, callback) => {
  const handler = server.createHandler({
      cors: {
          origin: "*",
          credentials:true,
          methods:["POST","GET"],
          allowedHeaders: ["Content-Type", "Origin", "Accept"]
      }
  });
  return handler(event, context, callback);
};