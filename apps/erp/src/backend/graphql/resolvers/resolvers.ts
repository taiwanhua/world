import { resolvers as mutationResolvers } from "./mutation/resolvers";
import { resolvers as queryResolvers } from "./query/resolvers";
import { scalarResolvers } from "./scalars/scalars";

export const resolvers = {
  Mutation: mutationResolvers,
  Query: queryResolvers,
  ...scalarResolvers,
};
