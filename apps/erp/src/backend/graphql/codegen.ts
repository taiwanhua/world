import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/backend/graphql/schema/**/*.ts",
  generates: {
    "./src/backend/graphql/types.ts": {
      plugins: ["typescript"],
      config: {
        scalars: {
          DateTime: "Date",
          JSON: "unknown",
          File: "File",
        },
        enumsAsTypes: true,
      },
    },
  },
};

module.exports = config;
