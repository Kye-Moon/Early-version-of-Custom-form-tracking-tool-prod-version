import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "apps/server/schema.graphql",
  documents: ["apps/webui/src/**/*.{ts,tsx}", 'apps/mobile/app/**/*.{ts,tsx}','apps/mobile/lib/**/*.{ts,tsx}','apps/mobile/components/**/*.{ts,tsx}'],
  generates: {
    "packages/gql-types/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
