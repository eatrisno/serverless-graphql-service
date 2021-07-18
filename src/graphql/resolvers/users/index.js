import {GetUserByEmail} from "./query";
import {RegisterUser, LoginUser} from "./mutation";

export default {
    Query: {
        GetUserByEmail: async (root, args, context) => GetUserByEmail(args, context, 'QueryUsers')
    },
    Mutation: {
        RegisterUser: async (root,args,context) => RegisterUser(args, context, 'MutationCreateUser'),
        LoginUser: async (root, args, context) => LoginUser( args, context, "MutationLoginUser")
    }
}