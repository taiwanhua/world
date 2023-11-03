import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/backend/graphql/**/*.ts",
  documents: "./src/frontend/graphql/**/*.ts",
  generates: {
    "./src/frontend/graphql": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".type.ts",
        baseTypesPath: "~@/backend/graphql/types",
      },
      plugins: ["typescript-operations"],
    },
  },
};

module.exports = config;
