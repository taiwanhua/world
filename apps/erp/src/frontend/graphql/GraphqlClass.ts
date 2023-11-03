import type { Variables, RequestDocument } from "graphql-request";
import { GraphQLClient } from "graphql-request";

export interface GraphqlParams {
  endpoint: string;
  token: string;
}

export function getToken(token?: string): string {
  if (!token) {
    return "";
  }

  if (token.toLowerCase().startsWith("bearer")) {
    return token;
  }

  return `Bearer ${token}`;
}

class GraphqlClass {
  private client: GraphQLClient;
  private token!: string;

  constructor({ endpoint, token }: GraphqlParams) {
    this.client = new GraphQLClient(endpoint);

    this.setToken(token);
  }

  async request<Response, InputVariables extends Variables>(
    query: RequestDocument,
    variables?: InputVariables,
  ): Promise<Response> {
    let data: Response;
    if (variables) {
      data = await this.client.request<Response>(query, variables);
    } else {
      data = await this.client.request<Response>(query);
    }

    return data;
  }

  getToken(): string {
    return this.token;
  }
  setToken(token: string): void {
    this.token = token;
    this.client.setHeader("authorization", getToken(token));
  }
  setEndpoint(endpoint: string): void {
    this.client.setEndpoint(endpoint);
  }
}

export { GraphqlClass };
