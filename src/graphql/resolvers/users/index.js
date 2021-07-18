import {GetUserByEmail} from "./query";
import {CreateUser} from "./mutation";

export default {
    Query: {
        GetUserByEmail: async (root, args, context) => GetUserByEmail(args, context, 'QueryUsers')
    },
    Mutation: {
        CreateUser: async (root,args,context) => CreateUser(args, context, 'MutationCreateUser')
    }
}