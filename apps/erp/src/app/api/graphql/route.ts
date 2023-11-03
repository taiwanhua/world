import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "@/backend/graphql/schema/typeDefs";
import { resolvers } from "@/backend/graphql/resolvers/resolvers";

const { handleRequest } = createYoga({
  schema: createSchema({
    // typeDefs: /* GraphQL */ `
    //   type Query {
    //     greetings: String
    //   }
    // `,
    // resolvers: {
    //   Query: {
    //     greetings: () =>
    //       "This is the `greetings` field of the root `Query` type",
    //   },
    // },
    typeDefs,
    resolvers,
  }),
  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
