import { typeDefs as enumTypeDefs } from "./enum/typeDefs";
import { typeDefs as interfaceTypeDefs } from "./interface/typeDefs";
import { typeDefs as mutationTypeDefs } from "./mutation/typeDefs";
import { typeDefs as queryTypeDefs } from "./query/typeDefs";
import { typeDefs as scalarsTypeDefs } from "./scalars/typeDefs";
import { typeDefs as typeTypeDefs } from "./type/typeDefs";

/** query root */
const Query = /* GraphQL */ `
  type Query {
    _: String
  }
`;

/** mutation root */
const Mutation = /* GraphQL */ `
  type Mutation {
    _: String
  }
`;

export const typeDefs = [
  Query,
  Mutation,
  ...enumTypeDefs,
  ...interfaceTypeDefs,
  ...scalarsTypeDefs,
  ...typeTypeDefs,
  ...queryTypeDefs,
  ...mutationTypeDefs,
];
