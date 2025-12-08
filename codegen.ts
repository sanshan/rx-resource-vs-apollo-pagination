import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/graphql/schema/schema.graphql',
  documents: 'src/**/**/*.graphql',
  ignoreNoDocuments: true,
  config: {
    scalars: {
      ID: 'string',
      DateTime: 'string',
    },
    strictScalars: true,
    enumsAsTypes: true,
    preResolveTypes: true,
    avoidOptionals: true,
    maybeValue: 'T | null',
    useTypeImports: true,
    dedupeFragments: true,
    nonOptionalTypename: true,
  },
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript'],
      config: {
        declarationKind: 'interface',
      },
    },
    'src/graphql/apollo-angular/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../types.ts',
        extension: '.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-apollo-angular'],
      config: {
        serviceNameSuffix: 'GQL',
        documentMode: 'documentNode',
        addDocBlocks: false,
      },
    },
  },
};

export default config;
