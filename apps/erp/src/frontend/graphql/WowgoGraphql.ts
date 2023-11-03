import type { GraphqlParams } from "@/frontend/graphql/GraphqlClass";
import { GraphqlClass } from "@/frontend/graphql/GraphqlClass";
import { getQueries } from "./query/getQueries";
// import { getMutations } from "./mutation/getMutations";

export type WowgoGraphqlParams = Omit<GraphqlParams, "endpoint">;

class WowgoGraphqlClass extends GraphqlClass {
  constructor({ token }: WowgoGraphqlParams) {
    super({
      endpoint: "/api/graphql",
      token,
    });
  }

  query = getQueries(this);
  // mutation = getMutations(this);
}

export { WowgoGraphqlClass };
