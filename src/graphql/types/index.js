import { mergeTypeDefs } from '@graphql-tools/merge';

import basic from './basic';
import users from './users';

const types = [
    basic,
    users
];

export default mergeTypeDefs(types);