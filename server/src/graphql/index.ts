import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

export function createApolloServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true, // explicit — blocks simple CSRF (requires apollo-require-preflight header)
  });
}
