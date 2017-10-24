import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import resolvers from './resolvers';

const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, 'models'), { recursive: true })
);

export default makeExecutableSchema({ typeDefs, resolvers });
