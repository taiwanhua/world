import { resolvers as checkResolver } from "./check/resolvers";
import { resolvers as menuResolver } from "./menu/resolvers";
import { resolvers as relevanceResolver } from "./relevance/resolvers";
import { resolvers as roleResolver } from "./role/resolvers";
import { resolvers as userResolver } from "./user/resolvers";

export const resolvers = {
  ...checkResolver,
  ...menuResolver,
  ...relevanceResolver,
  ...roleResolver,
  ...userResolver,
};
