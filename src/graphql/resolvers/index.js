import { mergeResolvers } from '@graphql-tools/merge';

import basic from './basic';
import users from './users';

const resolvers = [
  basic,
  users
];
export default mergeResolvers(resolvers, {all: true});