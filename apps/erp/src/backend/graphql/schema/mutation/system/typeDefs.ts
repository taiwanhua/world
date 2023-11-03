import { typeDefs as functionTypeDefs } from "./function/typeDefs";
import { typeDefs as menuTypeDefs } from "./menu/typeDefs";
import { typeDefs as relevanceTypeDefs } from "./relevance/typeDefs";
import { typeDefs as roleTypeDefs } from "./role/typeDefs";
import { typeDefs as userTypeDefs } from "./user/typeDefs";

export const typeDefs = [
  ...functionTypeDefs,
  ...menuTypeDefs,
  ...relevanceTypeDefs,
  ...roleTypeDefs,
  ...userTypeDefs,
];
